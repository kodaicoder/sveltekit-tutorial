<script>
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
</script>

<Header />

<main>
	<slot />
</main>

<Footer />

<style>
	main {
		margin: 0 4rem 3rem 4rem;
	}
</style>
