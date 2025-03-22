<script>
	import BackButtonHeading from '@src/components/BackButtonHeading.svelte';
	import AddEditPostForm from '@src/features/Blog/AddEditPostForm.svelte';
	import { authStore } from '@src/stores/authStore';
	import UserMenu from '@src/features/authentication/UserMenu.svelte';
	import CreateAuthorProfile from '@src/features/Blog/CreateAuthorProfile.svelte';
	export const ssr = false;

	$: ({ user, isAuthor } = $authStore);
</script>

<div>
	<BackButtonHeading>{isAuthor ? 'Add new post' : 'Create author profile'}</BackButtonHeading>

	{#if user}
		{#if isAuthor}
			<AddEditPostForm />
		{:else}
			<CreateAuthorProfile />
		{/if}
	{:else}
		<p>Sorry add posts can only be done by logged in users</p>
		<p>Please log in.</p>
		<UserMenu />
	{/if}
</div>
