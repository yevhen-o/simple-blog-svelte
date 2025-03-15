<script lang="ts">
	const currentYear = new Date().getFullYear();
</script>

<footer class="footer">
	<div class="footer__content">
		<p class="footer__copyright">
			&copy; {currentYear} My Blog. All rights reserved.
		</p>
		<p class="footer__text">Made with ❤️ by Yevhen.</p>
	</div>
</footer>

<style lang="scss">
	.footer {
		background-color: var(--color-gray-25);
		padding: var(--spacer-sm);
		text-align: center;
		margin-top: var(--spacer-default);

		&__content {
			max-width: 1200px;
			margin: 0 auto;
		}

		&__copyright {
			font-size: 0.8rem;
			color: var(--color-gray-500);
		}

		&__text {
			font-size: 0.8rem;
			color: var(--color-gray-500);
		}
	}
</style>
