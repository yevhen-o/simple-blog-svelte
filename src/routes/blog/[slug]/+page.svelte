<script>
	import BlogArticle from '@src/features/Blog/BlogArticle.svelte';

	export let data;

	$: blog = data.blog;
</script>

<BlogArticle article={blog} />
