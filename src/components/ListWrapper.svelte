<script lang="ts">
	import classNames from 'classnames';
	export let className = '';
</script>

<div class={classNames('list__wrapper', className)}><slot /></div>

<style>
	.list__wrapper {
		display: flex;
		flex-direction: column;
		gap: var(--spacer-df);
	}
</style>
