<script>
	/** @type {import('./$types').PageData} */
	export let data;

	const { userId, id, title, body } = data.post;
</script>

<h1>{title}</h1>
<p>{body}</p>
<p><small>Created by Id : {userId}</small></p>
