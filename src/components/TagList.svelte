<script lang="ts">
	import Tag from './Tag.svelte';
	export let tags: string[];
</script>

<div class="tags-list__wrapper">
	<strong>List of tags:</strong>
	{#each tags as tag (tag)}
		<Tag>{tag}</Tag>
	{/each}
</div>

<style lang="scss">
	.tags-list__wrapper {
		display: flex;
		align-items: center;
		gap: var(--spacer-sm);
		:global {
			& > h5 {
				margin: 0;
			}
		}
	}
</style>
