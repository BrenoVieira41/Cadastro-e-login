import { AfterLoad, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { subHours } from 'date-fns';

export enum Gender {
  M = 'M',
  F = 'F',
  ND = 'ND'
}

@Entity({ name: 'users' })
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  phone: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true })
  bornDate: Date;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @AfterLoad()
  afterLoad() { //Used to remove time difference from the database
    this.createdAt = !this.createdAt ? undefined : subHours(this.createdAt, 3);
    this.updatedAt = !this.updatedAt ? undefined : subHours(this.updatedAt, 3);
  }
}
