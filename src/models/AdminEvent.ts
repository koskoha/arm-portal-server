import { ChildEntity, JoinTable, ManyToOne } from 'typeorm';

import { Admin } from './Admin';
import { Event } from './Event';

@ChildEntity()
export class AdminEvent extends Event {
	@ManyToOne(type => Admin, admin => admin.logs)
	@JoinTable()
	entity: Admin;
}
