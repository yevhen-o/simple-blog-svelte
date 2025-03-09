<script lang="ts">
	export let className: string = '';
	export let isPrimary: boolean = false;

	import classNames from 'classnames';
</script>

<div class={classNames('tag', className, { 'tag--primary': isPrimary })}>
	<slot />
</div>

<style>
	.tag {
		display: inline-block;
		border: 1px solid var(--color-gray-25);
		border-radius: var(--border-radius-sm);
		padding: var(--spacer-xs) var(--spacer-sm);
	}
</style>
