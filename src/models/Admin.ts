import bcrypt from 'bcrypt';
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	BeforeInsert,
	Index,
	OneToMany
} from 'typeorm';

import { AdminEvent } from './AdminEvent';

const saltRounds = 10;

@Entity()
export class Admin {
	@PrimaryGeneratedColumn('uuid')
	uuid: string;

	@Column()
	firstName: string;

	@Column()
	lastName: string;

	@Index({ unique: true })
	@Column()
	email: string;

	@Column()
	password: string;

	@Column()
	isSuperUser: boolean;

	@Column({ nullable: true })
	lastActiveAt: Date;

	@Column({ nullable: true })
	deletedAt: Date;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;

	@BeforeInsert()
	async hashPassword(): Promise<void> {
		this.password = await bcrypt.hash(this.password, saltRounds);
	}

	@OneToMany(type => AdminEvent, log => log.entity)
	logs: AdminEvent[];
}
