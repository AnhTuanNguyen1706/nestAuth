import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1680000000000 implements MigrationInterface {
  name = 'init1680000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create roles table
    await queryRunner.query(`
      CREATE TABLE roles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE
      )
    `);

    // Create permissions table
    await queryRunner.query(`
      CREATE TABLE permissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE
      )
    `);

    // Create many-to-many relationship table: roles_permissions
    await queryRunner.query(`
      CREATE TABLE roles_permissions_permissions (
        "rolesId" INT NOT NULL,
        "permissionsId" INT NOT NULL,
        PRIMARY KEY ("rolesId", "permissionsId"),
        CONSTRAINT "FK_roles_permissions_rolesId" FOREIGN KEY ("rolesId") REFERENCES roles(id) ON DELETE CASCADE,
        CONSTRAINT "FK_roles_permissions_permissionsId" FOREIGN KEY ("permissionsId") REFERENCES permissions(id) ON DELETE CASCADE
      )
    `);

    // Create many-to-many relationship table: users_roles (if user table exists)
    await queryRunner.query(`
      CREATE TABLE users_roles_roles (
        "userId" INT NOT NULL,
        "roleId" INT NOT NULL,
        PRIMARY KEY ("userId", "roleId"),
        CONSTRAINT "FK_users_roles_userId" FOREIGN KEY ("userId") REFERENCES users(id) ON DELETE CASCADE,
        CONSTRAINT "FK_users_roles_roleId" FOREIGN KEY ("roleId") REFERENCES roles(id) ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS users_roles_roles`);
    await queryRunner.query(
      `DROP TABLE IF EXISTS roles_permissions_permissions`,
    );
    await queryRunner.query(`DROP TABLE IF EXISTS permissions`);
    await queryRunner.query(`DROP TABLE IF EXISTS roles`);
  }
}
