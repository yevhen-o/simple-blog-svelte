<script>
	import '../styles/global.scss';
	import Navigation from '@src/components/Navigation.svelte';
</script>

<main>
	<Navigation />
	<div class="content__wrapper"><slot /></div>
</main>
