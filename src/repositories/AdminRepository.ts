import { EntityRepository, Repository } from 'typeorm';

import { Admin } from '../models/Admin';

@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin> {
	findByEmail(email: string): Promise<Admin | undefined> {
		return this.findOne({ email });
	}
}
