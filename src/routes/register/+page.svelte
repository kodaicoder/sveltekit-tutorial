<script>
	import Icon from '@iconify/svelte';
	import { registerSchema } from '$lib/zod/validator.js';
	import { applyAction, enhance } from '$app/forms';
	import FormFloat from '$components/FloatForm.svelte';
	// /** @type {import('./$types').PageData} */
	// export let data;

	let fieldErrors = {};

	const formSubmit = async ({ data, cancel }) => {
		//? parse `FormData` object to JSON object
		const formData = Object.fromEntries(data);
		console.log(formData);

		//? zod validate
		////? clear fieldErrors
		fieldErrors = {};
		const isValid = await registerSchema.safeParseAsync(formData);

		if (!isValid.success) {
			cancel();
			const { fieldErrors: errors } = isValid.error.flatten();
			fieldErrors = { ...errors, ...fieldErrors };
			console.log(fieldErrors);
		} else {
			console.log('SUCCESS!!');
		}
		cancel();
	};
</script>

<div class="flex flex-col items-center">
	<h2 class="m-2">Register</h2>

	<div class="form-control w-full max-w-xs m-2">
		<form method="POST" use:enhance={formSubmit}>
			<FormFloat name="name" type="text" labelText="Name" errorMessage={fieldErrors.name || ''} />
			<FormFloat
				name="email"
				type="text"
				labelText="Email"
				errorMessage={fieldErrors.email || ''}
			/>
			<FormFloat
				name="password"
				type="password"
				labelText="Password"
				errorMessage={fieldErrors.password || ''}
			/>
			<FormFloat
				name="passwordConfirm"
				type="password"
				labelText="Confirm Password"
				errorMessage={fieldErrors.passwordConfirm || ''}
			/>

			<label class="label cursor-pointer justify-center">
				<input name="terms" type="checkbox" class="checkbox mx-3" />
				<span class="label-text">I accept the terms and conditions</span>
			</label>
			{#if fieldErrors.terms}
				<div class="flex items-center px-2 whitespace-nowrap text-error">
					<Icon class="mx-2" icon="material-symbols:warning-rounded" />
					<span>{fieldErrors.terms}</span>
				</div>
			{/if}

			<div class="p-4">
				<button class="btn btn-primary w-full">Register</button>
			</div>
		</form>
	</div>
</div>
