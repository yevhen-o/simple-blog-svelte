<script lang="ts">
	import { Close } from 'carbon-icons-svelte';
	import Button from './Button.svelte';
	import Portal from './Portal.svelte';

	export let onClose: () => void;
	export let title: string;
	export let hasCloseButton: boolean = true;
	export let actions: { title: string; onClick: () => void }[] = [];
</script>

<Portal>
	<div role="dialog" tabindex="0" class="overlay" on:keydown on:keyup on:click={onClose}></div>
	<div class="modal__wrapper">
		<div class={'modal__container'}>
			<div class="">
				<div class="modal__header">
					<h3 class="modal__title">{title}</h3>
					{#if hasCloseButton}
						<Button isFlat on:click={onClose} class="modal__close" data-modal-hide="default-modal">
							<Close size={20} />
						</Button>
					{/if}
				</div>
				<div class="modal__content">
					<slot />
				</div>
				{#if actions}
					<div
						class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"
					>
						{#each actions as { title, ...rest }}
							<Button key={title} {...rest}>
								{title}
							</Button>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
</Portal>

<style lang="scss">
	.overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.modal {
		&__wrapper {
			position: fixed;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
		}
		&__container {
			position: relative;
			background-color: var(--primary-background);
			max-width: 900px;
			max-height: 90vh;
			border-radius: var(--border-radius-lg);
			box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
			padding: var(--spacer-df);
		}
		&__header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1px solid var(--primary-border);
		}
		&__title {
			margin: 0;
		}

		&__content {
			position: relative;
		}
	}
</style>
