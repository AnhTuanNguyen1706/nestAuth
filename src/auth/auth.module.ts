import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FacebookStrategy } from './strategy/facebook.strategy';
import { GoogleStrategy } from './strategy/google.strategy';
import { GithubStrategy } from './strategy/github.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from '../roles/entity/roles.entity';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: config.get('JWT_EXPIRES_IN') },
      }),
    }),
    TypeOrmModule.forFeature([Role]),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    FacebookStrategy,
    GoogleStrategy,
    GithubStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
