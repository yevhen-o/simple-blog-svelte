<script lang="ts">
	import classNames from 'classnames';
	import Button from './Button.svelte';
	import { Checkbox, CheckboxChecked } from '@src/components/Icons';
	import OutsideClick from './OutsideClick.svelte';
	export let className = '';
	export let hasCheckbox: boolean = false;

	type Options = {
		label: string;
		value: string;
		onClick: () => void;
		disabled?: boolean;
		checked?: boolean;
	}[];
	export let options: Options = [];

	let isOpen = false;

	const handleToggleOpen = () => {
		isOpen = !isOpen;
	};
</script>

<div class="dropdown__wrapper">
	<Button
		on:click={isOpen ? () => {} : handleToggleOpen}
		class={classNames('drop-down-menu-button', className)}
		{...$$restProps}
	>
		<slot />
	</Button>
	{#if isOpen}
		<OutsideClick onOutsideClick={handleToggleOpen}>
			<div class={classNames('dropdown__menu', className)}>
				{#each options as { label, value, onClick, disabled, checked }, index (`${label}__${value}__${index}`)}
					<button on:click={onClick} {disabled}>
						{#if hasCheckbox}
							{#if checked}
								<CheckboxChecked />
							{:else}
								<Checkbox />
							{/if}
						{/if}
						{label}
					</button>
				{/each}
			</div>
		</OutsideClick>
	{/if}
</div>

<style lang="scss">
	.dropdown {
		&__wrapper {
			position: relative;
		}

		&__menu {
			position: absolute;
			right: 2px;
			top: 100%;
			background-color: var(--border-style);
			color: var(--primary-text-color);

			border: var(--border-style);
			display: grid;
			max-height: 330px;
			z-index: 2;
			overflow: auto;

			& > * {
				all: unset;
				padding: var(--spacer-xs) var(--spacer-sm);
				white-space: nowrap;
				cursor: pointer;
				display: flex;
				align-items: center;
				gap: var(--spacer-sm);

				&:hover {
					background-color: rgba(128, 128, 128, 0.2) !important;
				}

				&:disabled {
					opacity: 0.5;
					cursor: not-allowed;
				}
			}
		}
	}
</style>
