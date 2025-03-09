<script lang="ts">
	import ListWrapper from '@src/components/ListWrapper.svelte';
	import BlogItem from '@src/features/Blog/BlogItem.svelte';
	import type { FirebasePostInterface } from '@src/types/PostInterface';

	export let data: { blogs: FirebasePostInterface };
</script>

<h1>List of articles</h1>
<ListWrapper>
	{#each Object.values(data.blogs) as value (value.id)}
		<BlogItem item={value} />
	{/each}
</ListWrapper>
