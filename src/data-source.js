'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const typeorm_1 = require('typeorm');
const dotenv = require('dotenv');
const user_entity_1 = require('./user/entity/user.entity');
const roles_entity_1 = require('./roles/entity/roles.entity');
const permissions_entity_1 = require('./permissions/entity/permissions.entity');
dotenv.config();
exports.default = new typeorm_1.DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 3306),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'auth_example',
  synchronize: false,
  entities: [
    user_entity_1.User,
    roles_entity_1.Role,
    permissions_entity_1.Permission,
  ],
  migrations: ['src/migrations/*.ts'],
});
//# sourceMappingURL=data-source.js.map
