<script lang="ts">
	import classNames from 'classnames';

	let className = '';
	export { className as class };
	export let isFlat = false;
	export let isPrimary = false;
	export let disabled = false;
	export let ariaLabel = '';
	export let id = '';
</script>

<button
	{...$$restProps}
	{id}
	on:click
	{disabled}
	aria-label={ariaLabel}
	class={classNames(
		'button',
		{ 'button--primary': isPrimary },
		{ 'button--flat': isFlat },
		className
	)}
>
	<slot />
</button>

<style lang="scss">
	.button {
		border: none;
		outline: none;
		display: inline-flex;
		justify-content: space-around;
		align-items: center;
		cursor: pointer;

		padding: 0.5rem 1rem;
		font-size: 1rem;
		border-radius: var(--border-radius-lg);
		font-weight: 700;
		color: var(--color-gray-0);
		background: linear-gradient(110.46deg, #9ba1a6 12.27%, #68696b 93.92%);

		&:hover {
			background: linear-gradient(110.46deg, #6f7172 12.27%, #454546 93.92%);
		}

		&:disabled {
			cursor: not-allowed;
		}

		&--primary {
			background: linear-gradient(110.46deg, #70c3ff 12.27%, #4b65ff 93.92%);

			&:hover {
				background: linear-gradient(110.46deg, #64baf7 12.27%, #3d58f4 93.92%);
			}
		}

		&--flat {
			background: transparent;
			color: var(--color-gray-100);
			font-weight: normal;

			&:hover {
				background: linear-gradient(110.46deg, #d9e2e8 12.27%, #c2c3c8 93.92%);
			}
		}
	}
</style>
