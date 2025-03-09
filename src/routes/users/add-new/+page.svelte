<script>
	import BackButtonHeading from '@src/components/BackButtonHeading.svelte';
	import { postNewUser } from '@src/services/httpClient';
	import { getUrl, IDENTIFIERS } from '@src/utils';
	import { goto } from '$app/navigation';

	const submitFunction = async () => {
		await postNewUser({ name: 'Joan', email: 'joan@joan.com' });
		goto(getUrl(IDENTIFIERS.USERS));
	};
</script>

<div>
	<BackButtonHeading>Simulate add new user, to check cache revalidation</BackButtonHeading>

	<button on:click={submitFunction} type="submit">
		{'Submit'}
	</button>
</div>
