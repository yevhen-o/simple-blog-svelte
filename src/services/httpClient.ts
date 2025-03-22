import { ZodSchema } from 'zod';

import {
	type UserInterface,
	UserValidationSchema,
	UserListValidationSchema
} from '../types/UserInterface';
import supabase from './supabase';
import type { PostInterface } from '@src/types/PostInterface';
import type { PostAuthorCreateInterface } from '@src/types/AuthorInterface';

// use env by default
const baseUrl = ''; //"http://localhost:3000/api";

export type AdditionalRequestOption<T> = {
	successMessage?: string;
	deriveSuccessMessage?: (response: T) => string;
	errorMessage?: string;
	deriveErrorMessage?: (error: unknown) => string;
};

export type RequestConfig<T> = {
	method?: 'PATCH' | 'POST' | 'GET' | 'PUT' | 'DELETE';
	headers?: Record<string, string>;
	body?: string;
	signal?: AbortSignal;
	additionalOptions?: AdditionalRequestOption<T>;
};

const httpClient = async <T>(
	url: string,
	validationSchema?: ZodSchema<T>,
	options?: RequestConfig<T>
) => {
	const response = await fetch(`${baseUrl}${url}`, {
		method: options?.method || 'GET',
		...(options?.headers ? { headers: options.headers } : {}),
		...(options?.body ? { body: options.body } : {}),
		...(options?.signal ? { signal: options.signal } : {})
	});
	// If additional options display success/error toasts/ set error pages etc
	const data = await response.json();
	if (validationSchema) {
		const result = validationSchema.safeParse(data);
		if (!result.success) {
			console.log(result);
			//console.error("Validation error:", result.error);
			//use some logger to quickly fix such cases :)
			//throw new Error("Invalid response schema");
		}
	}
	return data as T;
};

export const getBlogPosts = async () => {
	const { data } = await supabase
		.from('blog-posts')
		.select(
			`
        slug,
        title,
        author_id,
        image_url,
        tags,
        author:author_id (
          first_name,
          last_name
        )
      `
		)
		.order('created_at', { ascending: false });
	return data;
};

export const getBlogBySlug = async (slug: string) => {
	const { data } = await supabase
		.from('blog-posts')
		.select(
			`
      *,
      author:author_id (
        first_name,
        last_name
      )
      `
		)
		.eq('slug', slug)
		.single();
	return data as PostInterface;
};

export const hasAuthorProfile = async (author_id: string): Promise<boolean> => {
	const { data, error } = await supabase
		.from('blog-authors')
		.select('id')
		.eq('author_id', author_id)
		.maybeSingle();

	if (error) {
		return false;
	}

	return !!data;
};

export const isSlugInUse = async (slug: string): Promise<boolean> => {
	const { data, error } = await supabase
		.from('blog-posts')
		.select('id')
		.eq('slug', slug)
		.maybeSingle();

	if (error) {
		return false;
	}

	return !!data;
};

export const postNewBlog = async (
	data: Omit<PostInterface, 'id' | 'created_at' | 'author'> & {
		image?: File | null;
	}
) => {
	if (data.image) {
		const imageUrl = await uploadImage(data.image);
		if (imageUrl) {
			data.image_url = imageUrl;
		}
	}
	delete data.image;

	const { data: result } = await supabase.from('blog-posts').insert([data]).select();
	return result;
};

export const uploadImage = async (file: File): Promise<string | null> => {
	const fileName = `${Date.now()}-${file.name}`;
	const { error } = await supabase.storage.from('blog-images').upload(fileName, file);

	if (error) {
		console.error('Error uploading image:', error);
		return null;
	}

	return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/blog-images/${fileName}`;
};

export const createAuthorProfile = async (
	data: PostAuthorCreateInterface & {
		image?: File | null;
		author_id: string;
	}
) => {
	if (data.image) {
		const imageUrl = await uploadImage(data.image);
		if (imageUrl) {
			data.image_url = imageUrl;
		}
	}
	delete data.image;

	const { data: result } = await supabase.from('blog-authors').insert([data]).select();
	return result;
};

// User routes can be in their own file httpClient also goes to it own file in this case

export const getUsers = async () => {
	return await httpClient<UserInterface[]>(
		'https://jsonplaceholder.typicode.com/users',
		UserListValidationSchema
	);
};

export const getUserById = async (id: number) => {
	return await httpClient<UserInterface>(
		`https://jsonplaceholder.typicode.com/users/${id}`,
		UserValidationSchema
	);
};

export const postNewUser = async (data: Partial<UserInterface>) => {
	return await httpClient('http://localhost:3000/api/users', UserValidationSchema, {
		method: 'POST',
		body: JSON.stringify(data)
	});
};

export const updateUserById = async (data: UserInterface) => {
	return await httpClient(`http://localhost:3000/api/users/${data.id}`, UserValidationSchema, {
		method: 'PATCH',
		body: JSON.stringify(data)
	});
};
