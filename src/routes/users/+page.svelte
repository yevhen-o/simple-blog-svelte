<script>
	import ListWrapper from '@src/components/ListWrapper.svelte';
	import { getUrl, Link, IDENTIFIERS } from '@src/utils';
	export let data;
	$: users = data.users;
</script>

<h1>List of users</h1>
<Link href={getUrl(IDENTIFIERS.USER_ADD)}>Add new user</Link>
<br />
<br />
<ListWrapper>
	{#each users as user}
		<Link href={getUrl(IDENTIFIERS.USER_VIEW, { userId: user.id })} key={user.id}>
			{JSON.stringify(user)}
		</Link>
	{/each}
</ListWrapper>
