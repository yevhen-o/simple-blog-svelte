import { getBlogBySlug } from '@src/services/httpClient';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const blog = await getBlogBySlug(params.slug as string);

	return { blog };
};
