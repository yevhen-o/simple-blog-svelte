<script lang="ts">
	import { getUrl, IDENTIFIERS } from '@src/utils';
	import { page } from '$app/state';
	import UserMenu from '@src/features/authentication/UserMenu.svelte';

	const items = [
		{ link: getUrl(IDENTIFIERS.HOME), title: 'Home' },
		{ link: getUrl(IDENTIFIERS.BLOG), title: 'Blog' },
		{ link: getUrl(IDENTIFIERS.USERS), title: 'Users' },
		{
			link: getUrl(IDENTIFIERS.BLOG_ADD),
			title: 'Add new post',
			className: 'primary'
		}
	];
</script>

<div class="top-navigation__wrapper">
	<nav>
		{#each items as { link, title, className }}
			<a href={link} class="{className} {page.route.id === link ? 'active' : ''}">
				{title}
			</a>
		{/each}
		<div style="margin-left: auto">
			<UserMenu />
		</div>
	</nav>
</div>

<style>
	.top-navigation__wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--spacer-sm);
		background-color: var(--color-gray-25);
		margin-bottom: var(--spacer-default);

		& > nav {
			display: flex;
			gap: var(--spacer-sm);
			max-width: 1200px;
			flex-grow: 2;
			justify-content: space-between;
		}

		& > nav a {
			padding: var(--spacer-sm) var(--spacer-gn);
			text-decoration: none;

			&.active {
				background-color: var(--color-gray-50);
			}

			&.primary:not(.active) {
				background-color: var(--color-primary);
				color: var(--color-gray-0);
			}
		}
	}
</style>
