<script lang="ts">
	import { createForm } from 'felte';
	import { validator } from '@felte/validator-zod';

	import { authActions, authStore } from '@src/stores/authStore';
	import Button from '@src/components/Button.svelte';
	import InputField from '@src/components/form/InputField.svelte';
	import { createAuthorProfile } from '@src/services/httpClient';
	import FileUploader from '@src/components/form/FileUploader.svelte';
	import {
		PostAuthorCreateSchema,
		type PostAuthorCreateInterface
	} from '@src/types/AuthorInterface';

	let isSubmitting = false;
	$: ({ user } = $authStore);

	let initialValues = {
		first_name: '',
		last_name: '',
		short_bio: ''
	};
	let selectedImage: File | null = null;

	const schema = PostAuthorCreateSchema;

	let touchedFields: Partial<Record<keyof PostAuthorCreateInterface, boolean>> = {};

	const { form, errors, data, reset, isDirty } = createForm({
		extend: validator({ schema }),
		validateSchema: schema,
		onChange: true,
		onInput: true,
		initialValues: initialValues,
		onSubmit: async (data: PostAuthorCreateInterface) => {
			try {
				await createAuthorProfile({
					...data,
					image: selectedImage,
					author_id: user!.id
				});
				authActions.checkIsAuthor(user!.id);
			} catch (error) {
				if (error instanceof Error) {
					alert(error.message);
				}
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
		placeholder="First name"
		name="first_name"
		bind:value={$data.first_name}
		on:blur={handleBlur}
		isTouched={touchedFields.first_name}
		error={$errors?.first_name?.[0]}
	/>

	<InputField
		placeholder="Last name"
		name="last_name"
		bind:value={$data.last_name}
		on:blur={handleBlur}
		isTouched={touchedFields.last_name}
		error={$errors?.last_name?.[0]}
	/>
	<InputField
		placeholder="Short bio"
		rows={5}
		name="short_bio"
		bind:value={$data.short_bio}
		on:blur={handleBlur}
		isTouched={touchedFields.short_bio}
		error={$errors?.short_bio?.[0]}
	/>

	<br />
	<br />
	<Button isPrimary type="submit" class="post-form__button" on:click={setAllFieldsTouched}>
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
