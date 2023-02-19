<script>
	import { registerSchema, zodValidator } from '$lib/zod/validator.js';
	import { applyAction, enhance } from '$app/forms';
	import FloatInput from '$components/FloatInput.svelte';
	import CheckboxWithLabel from '$components/CheckboxWithLabel.svelte';

	let fieldErrors = {};
	let isSubmitted = false;

	const formChanged = async (event) => {
		////! On form input event
		////! client side validation
		//? parse `FormData` object to JSON object
		const formData = await new FormData(event.target.form);
		const formObj = Object.fromEntries(await formData.entries());

		//? zod validate on form input event.
		fieldErrors = await zodValidator(formObj, registerSchema);
	};

	const formSubmit = async ({ form, data, cancel }) => {
		////! Before form submitted event
		////! client side validation
		isSubmitted = true;

		//? parse `FormData` object to JSON object
		const formObj = Object.fromEntries(data);

		//? zod validate before form submitted event
		fieldErrors = await zodValidator(formObj, registerSchema);
		if (!!fieldErrors) {
			cancel();
		}

		////! After form submitted
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					///after success
					break;
				case 'error':
					await applyAction(result);
					break;
				default:
					break;
			}
			update();
		};
	};
</script>

<div class="flex flex-col items-center">
	<h2 class="m-2">Register</h2>

	<div class="form-control w-full max-w-xs m-2">
		<form method="POST" on:input={formChanged} use:enhance={formSubmit}>
			<FloatInput
				name="name"
				type="text"
				labelText="Name"
				errorMessage={!!fieldErrors ? fieldErrors.name : ''}
				{isSubmitted}
			/>
			<FloatInput
				name="email"
				type="text"
				labelText="Email"
				errorMessage={!!fieldErrors ? fieldErrors.email : ''}
				{isSubmitted}
			/>
			<FloatInput
				name="password"
				type="password"
				labelText="Password"
				errorMessage={!!fieldErrors ? fieldErrors.password : ''}
				{isSubmitted}
			/>
			<FloatInput
				name="passwordConfirm"
				type="password"
				labelText="Confirm Password"
				errorMessage={!!fieldErrors ? fieldErrors.passwordConfirm : ''}
				{isSubmitted}
			/>
			<div class="my-3">
				<CheckboxWithLabel
					name="terms"
					labelText={'I accept the'}
					errorMessage={!!fieldErrors ? fieldErrors.terms : ''}
					{isSubmitted}
				>
					<a href="/termsAndCondition" class="underline font-bold">terms and conditions</a>
				</CheckboxWithLabel>
			</div>

			<div class="p-4">
				<button class="btn btn-primary w-full">Register</button>
			</div>
		</form>
	</div>
</div>
