<script>
	import Post from '../../components/post/Post.svelte';
	/** @type {import('./$types').PageData} */
	export let data;
	// console.log(data.posts);
	const posts = data.posts;
</script>

{#each posts as post (post.id)}
	<Post {...post} />
	<!-- <div>
		<h3>{post.title}</h3>
		<img src={post.thumbnailUrl} alt={post.title + post.id} />
		<p>Album Id - {post.albumId}</p>
		<a href="/posts/{post.id}">Read more...</a>
	</div> -->
{:else}
	<h2>-- LOADING --</h2>
{/each}
