<script lang="ts">
	import { z } from 'zod';
	import { tick } from 'svelte';
	import { createForm } from 'felte';
	import { goto } from '$app/navigation';
	import { validator } from '@felte/validator-zod';

	import { authStore } from '@src/stores/authStore';
	import Button from '@src/components/Button.svelte';
	import InputField from '@src/components/form/InputField.svelte';
	import { getUrl, IDENTIFIERS, titleToSlug } from '@src/utils';
	import { isSlugInUse, postNewBlog } from '@src/services/httpClient';
	import { PostValidationSchema, type PostInterface } from '@src/types/PostInterface';
	import FileUploader from '@src/components/form/FileUploader.svelte';

	let isSubmitting = false;
	$: ({ user } = $authStore);

	let initialValues = {
		title: '',
		content: '',
		tags: ''
	};
	let selectedImage: File | null = null;

	const schema = PostValidationSchema.omit({
		tags: true,
		author_id: true,
		created_at: true,
		author: true
	}).extend({
		tags: z.string()
	});

	let hasCustomSlug = false;
	let slugIsUsed = false;

	$: title = $data.title;
	$: slug = $data.slug;

	const validateSlug = async () => {
		const isInUse = await isSlugInUse(slug);
		if (isInUse) {
			setErrors('slug', 'This slug already in use');
			touchedFields = { ...touchedFields, slug: true };
		}
		slugIsUsed = isInUse;
	};

	const createSlug = async () => {
		if (hasCustomSlug || !title) return;
		setData('slug', titleToSlug(title));
		await tick();
		validateSlug();
	};

	let touchedFields: Partial<Record<keyof PostInterface, boolean>> = {};

	const { form, errors, data, setData, reset, isDirty, setErrors } = createForm({
		extend: validator({ schema }),
		validateSchema: schema,
		onChange: true,
		onInput: true,
		initialValues: initialValues,
		onSubmit: async (
			values: Omit<PostInterface, 'id' | 'tags' | 'created_at' | 'author' | 'image_url'> & {
				tags: string;
			}
		) => {
			try {
				isSubmitting = true;
				await postNewBlog({
					...values,
					tags: values.tags.split(' '),
					image: selectedImage,
					author_id: user!.id
				});
				goto(getUrl(IDENTIFIERS.BLOG));
			} catch (error) {
				if (error instanceof Error) {
					alert(error.message);
				}
			} finally {
				isSubmitting = false;
			}
		}
	});

	const handleBlur = (e: FocusEvent) => {
		if (!(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) return;

		touchedFields = {
			...touchedFields,
			[e.target.name]: true
		};
	};

	const setAllFieldsTouched = () => {
		touchedFields = Object.keys(initialValues).reduce((acc, key) => ({ ...acc, [key]: true }), {});
	};

	const onImageChange = (file: File | null) => {
		selectedImage = file;
	};
</script>

<form use:form class="add-post-form">
	<FileUploader {onImageChange} />
	<InputField
		placeholder="Title"
		name="title"
		bind:value={$data.title}
		on:blur={createSlug}
		on:blur={handleBlur}
		isTouched={touchedFields.title}
		error={$errors?.title?.[0]}
	/>

	<InputField
		placeholder="Slug"
		name="slug"
		bind:value={$data.slug}
		on:input={validateSlug}
		on:blur={validateSlug}
		on:blur={handleBlur}
		isTouched={touchedFields.slug}
		error={slugIsUsed ? 'This slug already in use' : ''}
	/>
	<InputField
		placeholder="Content"
		rows={5}
		name="content"
		bind:value={$data.content}
		on:blur={handleBlur}
		isTouched={touchedFields.content}
		error={$errors?.content?.[0]}
	/>
	<InputField
		placeholder="Tags separated by space"
		name="tags"
		bind:value={$data.tags}
		on:blur={handleBlur}
		isTouched={touchedFields.tags}
		error={$errors?.tags?.[0]}
	/>
	<br />
	<br />
	<Button
		isPrimary
		type="submit"
		class="post-form__button"
		disabled={slugIsUsed}
		on:click={setAllFieldsTouched}
	>
		{isSubmitting ? 'Submitting' : 'Submit'}
	</Button>
	{#if isDirty && JSON.stringify($data) !== JSON.stringify(initialValues)}
		<Button type="button" on:click={reset}>Reset</Button>
	{/if}
</form>

<style lang="scss">
	.add-post-form {
		display: flex;
		flex-direction: column;
		gap: var(--spacer-df);
	}
</style>
