<script>
	import BackButtonHeading from '@src/components/BackButtonHeading.svelte';
	import AddEditPostForm from '@src/features/Blog/AddEditPostForm.svelte';
	import { user } from '@src/stores/authStore';
	import UserMenu from '@src/features/authentication/UserMenu.svelte';
	export const ssr = false;
</script>

<div>
	<BackButtonHeading>Add new post</BackButtonHeading>

	{#if $user}
		<AddEditPostForm />
	{:else}
		<p>Sorry add posts can only be done by logged in users</p>
		<p>Please log in.</p>
		<UserMenu />
	{/if}
</div>
