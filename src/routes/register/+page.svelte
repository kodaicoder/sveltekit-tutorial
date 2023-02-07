<script>
	import Icon from '@iconify/svelte';
	import { registerSchema } from '$lib/zod/validator.js';
	import { applyAction, enhance } from '$app/forms';
	import FormFloat from '$components/FloatForm.svelte';

	let fieldErrors = {};
	let isSubmited = false;
	let termsTouched = false;

	const formChanged = async (event) => {
		////! On form input event
		////! client side validation
		//? parse `FormData` object to JSON object
		const formData = await new FormData(event.target.form);
		const formObj = Object.fromEntries(await formData.entries());

		//? zod validate on form input event.
		////? clear fieldErrors
		fieldErrors = {};
		const isValid = await registerSchema.safeParseAsync(formObj);
		if (!isValid.success) {
			const { fieldErrors: errors } = isValid.error.flatten();
			fieldErrors = { ...errors, ...fieldErrors };
		}
	};

	const formSubmit = async ({ form, data, cancel }) => {
		////! Before form submitted event
		////! client side validation
		isSubmited = true;

		//? parse `FormData` object to JSON object
		const formObj = Object.fromEntries(data);

		//? zod validate before form submitted event
		////? clear fieldErrors
		fieldErrors = {};
		const isValid = await registerSchema.safeParseAsync(formObj);
		if (!isValid.success) {
			cancel();
			const { fieldErrors: errors } = isValid.error.flatten();
			fieldErrors = { ...errors, ...fieldErrors };
			return;
		}

		////! After form submitted
		return async ({ result, update }) => {
			console.log('result', result);
			if (result.type === 'success') {
				form.reset();
			}
			if (result.type === 'error') {
				await applyAction(result);
			}
			update();
		};
	};
</script>

<div class="flex flex-col items-center">
	<h2 class="m-2">Register</h2>

	<div class="form-control w-full max-w-xs m-2">
		<form method="POST" on:input={formChanged} use:enhance={formSubmit}>
			<FormFloat
				name="name"
				type="text"
				labelText="Name"
				errorMessage={fieldErrors.name || ''}
				{isSubmited}
			/>
			<FormFloat
				name="email"
				type="text"
				labelText="Email"
				errorMessage={fieldErrors.email || ''}
				{isSubmited}
			/>
			<FormFloat
				name="password"
				type="password"
				labelText="Password"
				errorMessage={fieldErrors.password || ''}
				{isSubmited}
			/>
			<FormFloat
				name="passwordConfirm"
				type="password"
				labelText="Confirm Password"
				errorMessage={fieldErrors.passwordConfirm || ''}
				{isSubmited}
			/>

			<label class="label cursor-pointer justify-center">
				<input
					name="terms"
					type="checkbox"
					class="checkbox mx-3"
					on:blur={() => (termsTouched = true)}
				/>
				<span class="label-text">I accept the terms and conditions</span>
			</label>
			{#if fieldErrors.terms && (termsTouched || isSubmited)}
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
