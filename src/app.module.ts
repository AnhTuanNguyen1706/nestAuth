import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import {TypeOrmModule, TypeOrmModuleOptions} from "@nestjs/typeorm";
import {ConfigModule, ConfigService} from "@nestjs/config";
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),AuthModule, UserModule,  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService): Promise<TypeOrmModuleOptions> => ({
      type: 'mysql',
      host: config.get<string>('DB_HOST'),
      port: +(config.get<string>('DB_PORT') ?? '3306'),
      username: config.get<string>('DB_USERNAME'),
      password: config.get<string>('DB_PASSWORD'),
      database: config.get<string>('DB_NAME'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      extra: {
        ssl: false,
      },
    }),
  }), RolesModule, PermissionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
