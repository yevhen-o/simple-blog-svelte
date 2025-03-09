import { getBlogPosts } from '@src/services/httpClient';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const blogs = await getBlogPosts();

	return { blogs };
};
