<script>
	import { themeStore } from '$lib/stores/themeStore';
	import Icon from '@iconify/svelte/dist/OfflineIcon.svelte';

	export let lightTheme = 'light';
	export let darkTheme = 'dark';
	let currentTheme = $themeStore ;
	$: isDarkTheme = currentTheme === darkTheme;

	const setTheme = (ev) =>{
		(ev.currentTarget.checked) ?currentTheme = darkTheme :currentTheme = lightTheme;
		const expirationDate = new Date();
		expirationDate.setDate(expirationDate.getDate() + 365);
		document.cookie = `theme=${currentTheme}; expires=${expirationDate.toUTCString()}; path=/`;
		document.documentElement.setAttribute('data-theme',currentTheme)
	}
</script>

<div class="form-control">
		<label class="label cursor-pointer">
			<span class="label-text">
				<Icon icon="ph:sun-duotone" width="20" height="20" inline={true} class="mx-3" />
			</span>
				<input type="checkbox" class="toggle" checked={isDarkTheme} on:change={setTheme}/>
			<span class="label-text">
				<Icon icon="ph:moon-duotone" width="20" height="20" inline={true} class="mx-3" />
			</span>
		</label>
</div>
