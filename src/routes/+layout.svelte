<script>
	import '../app.css';
	import Header from '$components/Header.svelte';
	import Footer from '$components/Footer.svelte';
	import { navigating } from '$app/stores';
	import { loader } from '$lib/stores/loadStateStore';
	import Loader from '$components/loader/Loader.svelte';
	$: loader.navigateLoader(!!$navigating);

	
</script>

<Header />

<main>
	<button class="btn btn-primary" on:click={() => loader.manualLoader(true, "I'm loading")}
		>Set Loading</button
	>
	<button class="btn btn-secondary" on:click={() => loader.manualLoader(false)}>Stop Loading</button
	>
	<slot />
	<Loader />
</main>

<Footer />

<style>
	main {
		margin: 0 4rem 3rem 4rem;
	}
</style>

