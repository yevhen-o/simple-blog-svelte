<script lang="ts">
	import Label from './Label.svelte';
	import InvalidText from './InvalidText.svelte';
	import Button from '../Button.svelte';
	import { Close } from '@src/components/Icons';

	export let id = 'ccs-' + Math.random().toString(36).replace(/\./g, '');
	export let error: string | null | undefined = null;
	export let isTouched: boolean | undefined = false;
	export let label: string | undefined = undefined;
	export let accept: string | undefined = 'image/*';
	export let onImageChange: (file: File | null) => void;

	let previewUrl: string | null = null;
	let fileInputRef: HTMLInputElement;

	const handleFileChange = (event: Event) => {
		if (!(event.target instanceof HTMLInputElement && event.target.files)) return;
		const file = event.target.files?.[0];
		if (file) {
			onImageChange(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				previewUrl = reader.result as string;
			};
			reader.readAsDataURL(file);
		} else {
			previewUrl = null;
			onImageChange(null);
		}
	};

	const handleClear = () => {
		previewUrl = null;
		onImageChange(null);
		if (fileInputRef) {
			fileInputRef.value = '';
		}
	};
</script>

<div class="input-field">
	{#if label}
		<Label for={id}>{label}</Label>
	{/if}
	<input
		type="file"
		{accept}
		{id}
		bind:this={fileInputRef}
		on:blur
		on:input
		on:change={handleFileChange}
		{...$$restProps}
	/>
	{#if previewUrl}
		<div>
			<div class="input-field__preview">
				<img src={previewUrl} alt="Preview" />
				<Button isFlat on:click={handleClear} class="input-field__clear">
					<Close />
				</Button>
			</div>
		</div>
	{/if}
	{#if error && isTouched}<InvalidText>{error}</InvalidText>{/if}
</div>

<style lang="scss">
	.input-field {
		display: flex;
		flex-direction: column;

		input {
			all: unset;
			width: 100%;
			padding: 0.9rem 1.25rem;
			border: 1px solid var(--color-gray-25);
			border-radius: var(--border-radius-df);
			background: var(--color-gray-0);
			color: var(--color-gray-100);
			box-sizing: border-box;
		}
		&__preview {
			position: relative;
			display: inline-block;
			img {
				max-width: 200px;
				max-height: 200px;
			}
		}
	}
	:global {
		.input-field {
			&__clear {
				position: absolute;
				top: 0;
				right: 0;
				padding: var(--spacer-sm) !important;
				cursor: pointer;
			}
		}
	}
</style>
