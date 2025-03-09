<script lang="ts">
	import { Link } from '@src/utils';
	import classNames from 'classnames';
	import { ArrowLeft } from './Icons/index';

	export let className = '';

	function goBack() {
		history.back();
	}
</script>

<div class={classNames('bb-heading__wrapper', className)}>
	<Link title="Go back" on:click={goBack} href="#">
		<ArrowLeft size={24} />
	</Link>
	<h1><slot /></h1>
</div>

<style lang="scss">
	.bb-heading__wrapper {
		display: flex;
		align-items: center;
		gap: var(--spacer-df);
		:global {
			& > a {
				color: var(--color-gray-75);

				:hover {
					transition: all 0.3s;
					transform: translate(-4px, 0);
				}
			}
		}
	}
</style>
