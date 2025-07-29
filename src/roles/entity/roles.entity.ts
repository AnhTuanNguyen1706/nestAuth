import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permission } from '../../permissions/entity/permissions.entity';
import { User } from '../../user/entity/user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Permission, { cascade: true })
  @JoinTable({
    name: 'roles_permissions',
    joinColumn: { name: 'rolesId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permissionsId', referencedColumnName: 'id' },
  })
  permissions: Permission[];

  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
