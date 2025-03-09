<script>
	import '../styles/global.scss';
	import Navigation from '@src/components/Navigation.svelte';
</script>

<svelte:head>
	<title>Simple blog with ssr on sveltekit</title>
</svelte:head>
<main>
	<Navigation />
	<div class="content__wrapper"><slot /></div>
</main>
