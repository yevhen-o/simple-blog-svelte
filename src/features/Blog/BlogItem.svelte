<script lang="ts">
	import TagList from '@src/components/TagList.svelte';
	import type { PostInterface } from '@src/types/PostInterface';
	import { getUrl, IDENTIFIERS, Link } from '@src/utils';
	export let item: Pick<PostInterface, 'title' | 'author' | 'slug' | 'image_url' | 'tags'>;
</script>

<div class="blog-item__wrapper">
	<Link
		href={getUrl(IDENTIFIERS.BLOG_VIEW, {
			slug: item.slug
		})}
	>
		{#if item.image_url}
			<div class="blog-item__image-wrapper">
				<img src={item.image_url} alt={item.title} />
			</div>
		{/if}
		<div class="blog-item__content-wrapper">
			<h2>{item.title}</h2>
			{' '}
			<div class="blog-item__bottom-line">
				<TagList tags={item.tags} />
				<small>
					Author: {item.author.first_name}
					{item.author.last_name}
				</small>
			</div>
		</div>
	</Link>
</div>

<style lang="scss">
	.blog-item {
		&__wrapper {
			:global {
				& > a {
					display: flex;
					gap: var(--spacer-df);
					align-items: center;
					text-decoration: none;
					border: 1px solid var(--color-gray-25);
					border-radius: var(--border-radius-sm);
					padding: var(--spacer-df);
					color: var(--color-primary);
					box-shadow: var(--nice-shadow);

					&:hover {
						box-shadow: var(--nice-shadow-hover);
					}
				}

				h2 {
					margin: 0;
				}

				small {
					margin-left: auto;
					color: var(--color-gray-75);
				}
			}
		}
		&__image-wrapper {
			position: relative;
			height: 70px;
			width: 124px;
			overflow: hidden;

			img {
				object-fit: cover;
				width: 100%;
				height: 100%;
			}
		}

		&__content-wrapper {
			flex-grow: 1;
		}

		&__bottom-line {
			display: flex;
			flex-grow: 1;
			justify-content: space-between;
			align-items: flex-end;
			color: var(--primary-text-color);
		}
	}
</style>
