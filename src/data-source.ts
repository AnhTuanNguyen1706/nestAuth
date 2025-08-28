import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './user/entity/user.entity';
import { Role } from './roles/entity/roles.entity';
import { Permission } from './permissions/entity/permissions.entity';

dotenv.config();

export default new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 3306),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'auth_example',
  synchronize: false,
  entities: [User, Role, Permission],
  migrations: ['src/migrations/*.ts'],
});
