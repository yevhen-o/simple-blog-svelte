import { getUsers } from '@src/services/httpClient';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const users = await getUsers();

	return { users };
};
