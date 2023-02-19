<script>
	import Icon from '@iconify/svelte';
	export let name;
	export let errorMessage = '';
	export let labelText = '';
	export let isSubmitted = false;
	let isTouched = false;
	let value = false;

	//made input listen on form reset event
	const resetAction = (node) => {
		const resetTouched = () => {
			isTouched = false;
			value = false;
		};
		node.form?.addEventListener('reset', resetTouched);
		return {
			destroy() {
				node.form?.removeEventListener('reset', resetTouched);
			}
		};
	};
</script>

<div class="label justify-center">
	<input {name} type="hidden" {value} />
	<input
		type="checkbox"
		class="checkbox mx-3"
		use:resetAction
		on:click={() => {
			value = !value;
			isTouched = true;
		}}
	/>
	<span class="label-text">{labelText} <slot /></span>
</div>

{#if !!errorMessage && (isTouched || isSubmitted)}
	<div class="flex items-center absolute px-2 whitespace-nowrap text-error">
		<Icon class="mx-2" icon="material-symbols:warning-rounded" />
		<span>{errorMessage}</span>
	</div>
{/if}
