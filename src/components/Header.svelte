<script>
	import ThemeChanger from './ThemeChanger.svelte';
	import Icon from '@iconify/svelte';
	import { page } from '$app/stores';
</script>

<header class="sticky top-0 z-20">
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
					<li><a class={$page.url.pathname === '/' ? 'active' : ''} href="/">Home</a></li>
					<li>
						<a class={$page.url.pathname === '/posts' ? 'active' : ''} href="/posts">Posts</a>
					</li>
					<li>
						<a class={$page.url.pathname === '/todos' ? 'active' : ''} href="/todos">Todos</a>
					</li>

					<li>
						<a class={$page.url.pathname === '/inputForm' ? 'active' : ''} href="/inputForm"
							>Input Form</a
						>
					</li>

					<li tabindex="0">
						<p
							class={$page.url.pathname === '/registerZod' ||
							$page.url.pathname === '/registerYup' ||
							$page.url.pathname === '/registerFelte' ||
							$page.url.pathname === '/registerYupStore'
								? 'active'
								: ''}
						>
							Register Form
							<Icon icon="material-symbols:arrow-back-ios-new-rounded" rotate={3} />
						</p>
						<ul class="p-2  bg-base-200 ">
							<li>
								<a class={$page.url.pathname === '/registerZod' ? 'active' : ''} href="/registerZod"
									>Register with Zod</a
								>
							</li>
							<li>
								<a class={$page.url.pathname === '/registerYup' ? 'active' : ''} href="/registerYup"
									>Register with Yup</a
								>
							</li>
							<li>
								<a
									class={$page.url.pathname === '/registerYupStore' ? 'active' : ''}
									href="/registerYupStore">Register with Yup and Store</a
								>
							</li>
							<li>
								<a
									class={$page.url.pathname === '/registerFelte' ? 'active' : ''}
									href="/registerFelte">Register with Felte</a
								>
							</li>
						</ul>
					</li>

					<li tabindex="1">
						<p
							class={$page.url.pathname === '/about' || $page.url.pathname === '/contact'
								? 'active'
								: ''}
						>
							More
							<Icon icon="material-symbols:arrow-back-ios-rounded" rotate={2} />
						</p>
						<ul class="p-2 bg-base-200">
							<li>
								<a class={$page.url.pathname === '/about' ? 'active' : ''} href="/about">About</a>
							</li>
							<li>
								<a class={$page.url.pathname === '/contact' ? 'active' : ''} href="/contact"
									>Contact</a
								>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<a
				class="link link-hover normal-case text-xl font-semibold mx-10 hover:no-underline whitespace-nowrap"
				href="/">SvelteKit Walkthrough</a
			>
		</div>
		<div class="navbar-center hidden md:flex">
			<ul class="menu menu-horizontal px-1 text-lg">
				<li><a class={$page.url.pathname === '/' ? 'active' : ''} href="/">Home</a></li>
				<li><a class={$page.url.pathname === '/posts' ? 'active' : ''} href="/posts">Posts</a></li>
				<li><a class={$page.url.pathname === '/todos' ? 'active' : ''} href="/todos">Todos</a></li>
				<li>
					<a class={$page.url.pathname === '/inputForm' ? 'active' : ''} href="/inputForm"
						>Input Form</a
					>
				</li>

				<li tabindex="0">
					<p
						class={$page.url.pathname === '/registerZod' ||
						$page.url.pathname === '/registerYup' ||
						$page.url.pathname === '/registerFelte' ||
						$page.url.pathname === '/registerYupStore'
							? 'active'
							: ''}
					>
						Register Form
						<Icon icon="material-symbols:arrow-back-ios-new-rounded" rotate={3} />
					</p>
					<ul class="p-2  bg-base-200 ">
						<li>
							<a class={$page.url.pathname === '/registerZod' ? 'active' : ''} href="/registerZod"
								>Register with Zod</a
							>
						</li>
						<li>
							<a class={$page.url.pathname === '/registerYup' ? 'active' : ''} href="/registerYup"
								>Register with Yup</a
							>
						</li>
						<li>
							<a
								class={$page.url.pathname === '/registerYupStore' ? 'active' : ''}
								href="/registerYupStore">Register with Yup and Store</a
							>
						</li>

						<li>
							<a
								class={$page.url.pathname === '/registerFelte' ? 'active' : ''}
								href="/registerFelte">Register with Felte</a
							>
						</li>
					</ul>
				</li>
				<li tabindex="1">
					<p
						class={$page.url.pathname === '/about' || $page.url.pathname === '/contact'
							? 'active'
							: ''}
					>
						More
						<Icon icon="material-symbols:arrow-back-ios-new-rounded" rotate={3} />
					</p>
					<ul class="p-2  bg-base-200 ">
						<li>
							<a class={$page.url.pathname === '/about' ? 'active' : ''} href="/about">About</a>
						</li>
						<li>
							<a class={$page.url.pathname === '/contact' ? 'active' : ''} href="/contact"
								>Contact</a
							>
						</li>
					</ul>
				</li>
			</ul>
		</div>
		<div class="navbar-end flex">
			<ThemeChanger />
		</div>
	</div>
</header>
