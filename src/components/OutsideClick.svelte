<script lang="ts">
	let className = '';
	export let isActive = true;
	export { className as class };

	export let onOutsideClick: (event: MouseEvent) => void = () => {};

	$: classes = ['outside-click', className].join(' ');

	let componentRef: HTMLDivElement;

	const clickHandler = (e: MouseEvent) => {
		if (isActive && componentRef && !componentRef.contains(e.target as Node)) {
			setTimeout(() => onOutsideClick(e), 1);
		}
	};
</script>

<svelte:window on:mouseup={clickHandler} />

<div class={classes} bind:this={componentRef}>
	<slot />
</div>
