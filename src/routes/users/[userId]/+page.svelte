<script lang="ts">
	import BackButtonHeading from '@src/components/BackButtonHeading.svelte';
	export let data;
	$: user = data.user;
</script>

<BackButtonHeading>View user, to check cache revalidation</BackButtonHeading>
<code>{JSON.stringify(user, null, 2)}</code>;
