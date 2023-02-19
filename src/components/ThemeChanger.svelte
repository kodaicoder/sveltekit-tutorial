<script>
	import { invalidateAll } from '$app/navigation';
  	import { applyAction, deserialize } from '$app/forms';
	import Icon from '@iconify/svelte';

	const lightTheme = 'emerald';
	const darkTheme = 'luxury';

	const setTheme=async (event)=>{
		const el = event.currentTarget
		let currenTheme;
		(el.checked) ? currenTheme=lightTheme : currenTheme=darkTheme;
		const expires = new Date();
    	expires.setTime(expires.getTime() + (365 * 24 * 60 * 60 * 1000));
    	document.cookie = `theme=${currenTheme};expires=${expires.toUTCString()};path=/`;
		//el.closest('form').submit();
	}

</script>

<div class="form-control">
		<label class="label cursor-pointer">
			<span class="label-text">
				<Icon icon="ph:sun-duotone" width="20" height="20" inline={true} class="mx-3" />
			</span>
				<a href="#">
					<input type="checkbox" class="toggle" value={darkTheme}  on:change={setTheme}/>
				</a>
			<span class="label-text">
				<Icon icon="ph:moon-duotone" width="20" height="20" inline={true} class="mx-3" />
			</span>
		</label>
</div>
