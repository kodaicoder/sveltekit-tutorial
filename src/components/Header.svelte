<header>
	<nav>
		<h1>SvelteKit Walkthrough</h1>
		<ul>
			<li><a href="/">Home</a></li>
			<li><a href="/about">About</a></li>
			<li><a href="/posts">Posts</a></li>
			<li><a href="/todos">Todos</a></li>
			<li><a href="/contact">Contact</a></li>
		</ul>
	</nav>
</header>

<style>
	header {
		position: sticky;
		top: 0;
		background-color: #2b2f34;
		overflow: hidden;
	}

	nav {
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100vw;
	}
	h1 {
		color: whitesmoke;
	}
	ul {
		display: inline-flex;
		list-style: none;
	}

	a {
		font-size: 1.3rem;
		margin: 0 10px;
		color: whitesmoke;
		text-decoration: none;
	}
</style>
