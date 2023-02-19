<script>
	import Icon from '@iconify/svelte';
	export let name;
	export let type;
	export let labelText;
	export let value = '';
	export let errorMessage = '';
	export let isSubmitted = false;

	let isTouched = false;

	//made input listen on form reset event
	const resetAction = (node) => {
		const resetTouched = () => (isTouched = false);
		node.form?.addEventListener('reset', resetTouched);
		return {
			destroy() {
				node.form?.removeEventListener('reset', resetTouched);
			}
		};
	};
	//made type dynamical and avoid svelte error
	const typeAction = (node) => {
		node.type = type;
	};
</script>

<div class="form-floating my-5">
	<input
		{name}
		placeholder=" "
		use:typeAction
		use:resetAction
		class="input input-bordered w-full {!!errorMessage &&
			(isTouched || isSubmitted) &&
			'input-error'}"
		on:input={() => (isTouched = true)}
		bind:value
	/>
	<label for={name} class="label"> {labelText} </label>
	{#if !!errorMessage && (isTouched || isSubmitted)}
		<div class="flex items-center absolute py-1 px-2 whitespace-nowrap text-error">
			<Icon class="mx-2" icon="material-symbols:warning-rounded" />
			<span>{errorMessage}</span>
		</div>
	{/if}
</div>
