<script>
	export let id;
	export let albumId;
	export let title;
	export let thumbnailUrl;
</script>

<div>
	<h3>{title}</h3>
	<img src={thumbnailUrl} alt={title + id} />
	<p>Album Id - {albumId}</p>
	<a href="/posts/{id}">Read more...</a>
</div>
