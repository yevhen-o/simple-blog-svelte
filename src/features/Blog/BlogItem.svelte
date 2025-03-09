<script lang="ts">
	import type { PostInterface } from '@src/types/PostInterface';
	import { getUrl, IDENTIFIERS, Link } from '@src/utils';
	export let item: Pick<PostInterface, 'title' | 'author' | 'id'>;
</script>

<div class="blog-item__wrapper">
	<Link
		href={getUrl(IDENTIFIERS.BLOG_VIEW, {
			slug: item.id
		})}
	>
		<h2>{item.title}</h2>
		<small>Author: {item.author}</small>
	</Link>
</div>

<style lang="scss">
	.blog-item__wrapper {
		:global {
			& > a {
				display: block;
				text-decoration: none;
				border: 1px solid var(--color-gray-25);
				border-radius: var(--border-radius-sm);
				padding: var(--spacer-df);
				color: var(--color-primary);
			}
		}

		h2 {
			margin: 0;
		}

		small {
			color: var(--color-gray-75);
		}
	}
</style>
