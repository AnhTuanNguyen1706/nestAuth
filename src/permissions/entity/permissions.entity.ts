import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../roles/entity/roles.entity';

@Entity('Permissions')
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
