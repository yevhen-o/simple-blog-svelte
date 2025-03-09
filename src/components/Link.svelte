<script lang="ts">
	export let href: string;
</script>

<a {href} {...$$restProps} on:mouseup on:mousedown on:click><slot /></a>
