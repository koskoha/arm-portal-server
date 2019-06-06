import { getCustomRepository } from 'typeorm';

import { AdminRepository } from '../repositories/AdminRepository';

export interface Repositories {
	admins: AdminRepository;
}

export type Context = Readonly<{
	repos: Readonly<Repositories>;
}>;

export const createContext = (): Readonly<Context> => ({
	repos: {
		admins: getCustomRepository(AdminRepository)
	}
});
