<script lang="ts">
	import Label from './Label.svelte';
	import InvalidText from './InvalidText.svelte';

	export let id = 'ccs-' + Math.random().toString(36).replace(/\./g, '');
	export let name: string;
	export let value: string;
	export let error: string | null | undefined = null;
	export let isTouched: boolean | undefined = false;
	export let label: string | undefined = undefined;

	export let rows: number = 1;
</script>

<div class="input_field">
	{#if label}
		<Label for={id}>{label}</Label>
	{/if}
	{#if rows === 1}
		<input {id} {name} bind:value on:blur on:input on:change {...$$restProps} />
	{:else}
		<textarea {rows} {id} {name} bind:value on:blur on:input on:change {...$$restProps}></textarea>
	{/if}
	{#if error && isTouched}<InvalidText>{error}</InvalidText>{/if}
</div>

<style lang="scss">
	.input_field {
		display: flex;
		flex-direction: column;

		input,
		textarea {
			all: unset;
			width: 100%;
			padding: 0.9rem 1.25rem;
			border: 1px solid var(--color-gray-25);
			border-radius: var(--border-radius-df);
			background: var(--color-gray-0);
			color: var(--color-gray-100);
			box-sizing: border-box;
		}
	}
</style>
