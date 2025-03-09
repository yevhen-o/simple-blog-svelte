<script lang="ts">
	import Button from '@src/components/Button.svelte';
	import DropDown from '@src/components/DropDown.svelte';
	import { user } from '@src/stores/authStore';
	import { logout } from '@src/services/firebase/auth';
	import AuthModal from './AuthModal.svelte';

	const options = [
		{
			label: 'Log out',
			value: 'logout',
			onClick: logout
		}
	];

	let isAuthModalShown = false;

	const setHasAuthModalShown = (v: boolean) => {
		isAuthModalShown = v;
	};
</script>

<div style="margin-left: auto">
	{#if $user}
		<DropDown {options} class="user-menu">
			{$user.email}
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
