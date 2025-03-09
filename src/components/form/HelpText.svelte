<script lang="ts">
	import classNames from 'classnames';

	export let helperText: string | null | undefined = undefined;
	export let counterText: string | null | undefined = undefined;
	export let invalidText: string | null | undefined = undefined;
	export let isTouched: boolean | null | undefined = undefined;
	export let hasSpace = false;
</script>

{#if (helperText || counterText) && (!invalidText || !isTouched)}
	<div
		class={classNames('custom-helper-text', {
			'custom-helper-text--has-space': hasSpace
		})}
	>
		<span
			class={classNames('custom-helper-text__counter', {
				'custom-helper-text__text--hidden': helperText
			})}
		>
			{helperText}
		</span>
		{#if counterText}
			<span
				class={classNames('custom-helper-text__counter', {
					'custom-helper-text__counter--left': !helperText,
					'custom-helper-text__counter--hidden': helperText
				})}>{counterText}</span
			>
		{/if}
	</div>
{/if}

<style lang="scss">
	.custom-helper-text {
		color: var(--color--text-05);
		font-size: 12px;

		&--has-space {
			padding: var(--spacer-xs) var(--spacer-sm);
		}

		&__counter {
			float: right;
			padding-top: 2px;
		}

		&__text {
			&--hidden {
				display: none;
			}
		}

		:global(.custom-helper-text__cancel) {
			float: left;
			margin-bottom: -3px;
			color: var(--color--focus);
		}
	}
</style>
