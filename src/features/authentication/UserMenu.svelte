<script lang="ts">
	import Button from '@src/components/Button.svelte';
	import DropDown from '@src/components/DropDown.svelte';
	import { authActions, authStore } from '@src/stores/authStore';
	import AuthModal from './AuthModal.svelte';

	const options = [
		{
			label: 'Log out',
			value: 'logout',
			onClick: authActions.logOut
		}
	];

	let isAuthModalShown = false;

	const setHasAuthModalShown = (v: boolean) => {
		isAuthModalShown = v;
	};

	$: ({ user } = $authStore);
</script>

<div style="margin-left: auto;">
	{#if user}
		<DropDown {options} class="user-menu">
			{user.email}
		</DropDown>
	{:else}
		<div>
			<Button on:click={() => setHasAuthModalShown(true)}>Login</Button>
		</div>
	{/if}
	{#if isAuthModalShown}
		<AuthModal onClose={() => setHasAuthModalShown(false)} />
	{/if}
</div>
