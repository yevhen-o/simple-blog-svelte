<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let ref: HTMLDivElement | null = null;
	let portal: HTMLDivElement | null = null;

	export let targetId: string | undefined = undefined;

	onMount(() => {
		portal = document.createElement('div');
		portal.className = 'portal';

		const target = targetId ? document.querySelector<HTMLElement>(`#${targetId}`) : null;

		if (target) {
			target.appendChild(portal);
		} else {
			document.body.appendChild(portal);
		}

		if (ref) {
			portal.appendChild(ref);
		}
	});

	onDestroy(() => {
		if (portal) {
			const target = targetId ? document.querySelector<HTMLElement>(`#${targetId}`) : null;
			if (target && target.contains(portal)) {
				target.removeChild(portal);
			} else if (document.body.contains(portal)) {
				document.body.removeChild(portal);
			}
		}
	});
</script>

<div class="portal-clone">
	<div bind:this={ref}>
		<slot />
	</div>
</div>

<style>
	.portal-clone {
		display: none;
	}
</style>
