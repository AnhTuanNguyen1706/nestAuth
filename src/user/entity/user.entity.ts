import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../roles/entity/roles.entity';

export enum OAuthProvider {
  GOOGLE = 'google',
  FACEBOOK = 'facebook',
  GITHUB = 'github',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  avatar: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true, select: false })
  passwordHash: string;

  @Column({
    type: 'enum',
    enum: OAuthProvider,
    nullable: true,
  })
  provider: OAuthProvider | null;

  @Index()
  @Column({ nullable: true })
  providerId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToMany(() => Role, (role) => role.users, { eager: true })
  @JoinTable({ name: 'users_roles' })
  roles: Role[];
}
