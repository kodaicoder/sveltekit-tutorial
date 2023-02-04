<script>
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';
	import { theme } from '$lib/stores/themeStore';
	import Icon from '@iconify/svelte';
	import { page } from '$app/stores';
	$: currentPage = $page.route.id;
	$: isLightTheme = $theme === 'emerald';

	//require for themeChange
	onMount(() => {
		themeChange(false);
	});
</script>

<header class="sticky top-0">
	<div class="navbar bg-base-200 drop-shadow-lg mb-4">
		<div>
			<div class="dropdown">
				<label tabindex="0" class="btn btn-ghost md:hidden">
					<Icon icon="ion:menu" width="30" height="30" />
				</label>
				<ul
					tabindex="0"
					class="menu menu-compact dropdown-content  p-2 shadow  bg-base-200 rounded-box w-52"
				>
					<li><a class={currentPage == '/' ? 'active' : ''} href="/">Home</a></li>
					<li><a class={currentPage == '/posts' ? 'active' : ''} href="/posts">Posts</a></li>
					<li><a class={currentPage == '/todos' ? 'active' : ''} href="/todos">Todos</a></li>
					<li tabindex="0">
						<p class={currentPage == '/about' || currentPage == '/contact' ? 'active' : ''}>
							More
							<Icon icon="material-symbols:arrow-back-ios-rounded" rotate={2} />
						</p>
						<ul class="p-2 bg-base-200">
							<li><a class={currentPage == '/about' ? 'active' : ''} href="/about">About</a></li>
							<li>
								<a class={currentPage == '/contact' ? 'active' : ''} href="/contact">Contact</a>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<a
				class="link link-hover normal-case text-2xl font-semibold mx-10 hover:no-underline"
				href="/">SvelteKit Walkthrough</a
			>
		</div>
		<div class="navbar-center hidden md:flex">
			<ul class="menu menu-horizontal px-1 text-lg">
				<li><a class={currentPage == '/' ? 'active' : ''} href="/">Home</a></li>
				<li><a class={currentPage == '/posts' ? 'active' : ''} href="/posts">Posts</a></li>
				<li><a class={currentPage == '/todos' ? 'active' : ''} href="/todos">Todos</a></li>
				<li tabindex="0">
					<p class={currentPage == '/about' || currentPage == '/contact' ? 'active' : ''}>
						More
						<Icon icon="material-symbols:arrow-back-ios-new-rounded" rotate={3} />
					</p>
					<ul class="p-2  bg-base-200 ">
						<li><a class={currentPage == '/about' ? 'active' : ''} href="/about">About</a></li>
						<li>
							<a class={currentPage == '/contact' ? 'active' : ''} href="/contact">Contact</a>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<div class="navbar-end flex">
			<Icon icon="ph:sun-duotone" width="20" height="20" inline={true} class="mx-3" />
			<input
				type="checkbox"
				class="toggle"
				data-toggle-theme="emerald,luxury"
				data-act-class="ACTIVECLASS"
				checked={!isLightTheme}
			/>
			<Icon icon="ph:moon-duotone" width="20" height="20" inline={true} class="mx-3" />
		</div>
	</div>
</header>
