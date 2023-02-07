<script>
	import Icon from '@iconify/svelte';
	import { string } from 'zod';
	export let name;
	export let type;
	export let labelText;
	export let errorMessage;
	export let isSubmited = false;
	let isTouched = false;
</script>

<div class="form-floating my-5">
	<input
		{name}
		placeholder=" "
		{type}
		class="input input-bordered w-full {!!errorMessage &&
			(isTouched || isSubmited) &&
			'input-error'}"
		on:blur={() => (isTouched = true)}
	/>
	<label for={name} class="label"> {labelText} </label>
	{#if !!errorMessage && (isTouched || isSubmited)}
		<div class="flex items-center absolute py-1 px-2 whitespace-nowrap text-error">
			<Icon class="mx-2" icon="material-symbols:warning-rounded" />
			<span>{errorMessage[0]}</span>
		</div>
	{/if}
</div>
