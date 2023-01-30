<script>
	import { page } from '$app/stores';
	/** @type {import('./$types').LayoutData} */
	export let data;

	///newPosts is list of posts that not include current post
	const newPosts = data.posts.filter((post) => post.id != $page.params.slug);
</script>

<div class="layout">
	<main>
		<slot />
	</main>

	<aside>
		<h2>More posts</h2>
		<ul>
			{#each newPosts as post (post.id)}
				<li>
					<a href="/posts/{post.id}">{post.title}</a>
				</li>
			{/each}
		</ul>
	</aside>
</div>

<style>
	@media (min-width: 640px) {
		.layout {
			display: grid;
			gap: 2em;
			grid-template-columns: 1fr 16em;
		}
	}
</style>
