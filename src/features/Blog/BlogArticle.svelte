<script lang="ts">
	import BackButtonHeading from '@src/components/BackButtonHeading.svelte';
	import TagList from '@src/components/TagList.svelte';
	import type { PostInterface } from '@src/types/PostInterface';

	import { countCommas as countCommasFn, countDots as countDotsFn } from '@src/utils';
	export let article: PostInterface;
	const { title, content, author, tags, countCommas, countDots, image_url } = article;
</script>

<div class="blog-article__wrapper">
	<BackButtonHeading>{title}</BackButtonHeading>
	<article>{content}</article>
	<div class="blog-article__details-wrapper">
		{#if image_url}<img src={image_url} alt={title} />
		{/if}
		<div>
			<div class="blog-article__author">
				<small>Author: </small>
				{author.first_name}
				{author.last_name}
			</div>
			<TagList {tags} />
			<div class="blog-article__details">
				<h5>Details</h5>
				<div>
					Count of commas:{' '}
					{typeof countCommas !== 'undefined' && countCommas !== null
						? countCommas
						: countCommasFn(content)}
				</div>
				<div>
					Count of dots:{' '}
					{typeof countDots !== 'undefined' && countDots !== null
						? countDots
						: countDotsFn(content)}
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.blog-article {
		&__wrapper {
			display: flex;
			flex-direction: column;
			gap: var(--spacer-df);
		}

		&__author {
			color: var(--color-gray-75);
		}
		&__details-wrapper {
			display: flex;
			gap: var(--spacer-df);
			img {
				max-height: 150px;
			}
		}
	}
</style>
