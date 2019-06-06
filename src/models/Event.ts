import {
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
	Entity,
	TableInheritance
} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'entityType' } })
export class Event {
	@PrimaryGeneratedColumn('uuid')
	uuid: string;

	@Column()
	action: string;

	@Column()
	description: string;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
