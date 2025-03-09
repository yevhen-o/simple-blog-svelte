<script lang="ts">
	import classNames from 'classnames';

	export let hasSpace = false;
</script>

<div
	class={classNames('invalid-text', {
		'invalid-text--has-space': hasSpace
	})}
>
	<slot />
</div>

<style lang="scss">
	.invalid-text {
		font-size: 12px;
		font-weight: 400;
		color: var(--color-red);
		padding-bottom: var(--spacer-sm);

		&--has-space {
			padding: var(--spacer-xs) var(--spacer-sm);
		}
	}
</style>
