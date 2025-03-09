import { getUserById } from '@src/services/httpClient';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const user = await getUserById(params.userId as string);

	return { user };
};
