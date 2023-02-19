<script>
	import { yupValidator, registerSchema } from '$lib/yup/validator.js';
	import { applyAction, enhance } from '$app/forms';
	import FloatInput from '$components/FloatInput.svelte';
	import CheckboxWithLabel from '$components/CheckboxWithLabel.svelte';

	let fieldErrors = {};
	let isSubmitted = false;

	let snapValue = {};
	/** @type {import('./$types').Snapshot<string>} */
	export const snapshot = {
		capture: () => snapValue,
		restore: (value) => (snapValue = value)
	};

	const formChanged = async (event) => {
		////! On form input event client side validation
		//? parse `FormData` element to `FormData` object
		const formData = await new FormData(event.target.form);
		const formObj = Object.fromEntries(await formData.entries());

		//? yup validate on form input event.
		fieldErrors = await yupValidator(formObj, registerSchema);
	};

	const formSubmit = async ({ form, data, cancel }) => {
		////! Before form submitting event client side validation
		isSubmitted = true;

		//? parse `FormData` element to `FormData` object
		const formObj = Object.fromEntries(data);

		//? yup validate before form submit event
		fieldErrors = await yupValidator(formObj, registerSchema);
		if (!!fieldErrors) {
			cancel();
		}

		////! After form submitted
		return async ({ result, update }) => {
			isSubmitted = false;
			if (result.type === 'success') {
				form.reset();
				snapValue = {};
				const allField = form.querySelectorAll('input, select, textarea');
				allField.forEach((field) => {
					field.dispatchEvent(new Event('reset'));
				});
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
			<FloatInput
				name="name"
				type="text"
				labelText="Name"
				errorMessage={!!fieldErrors ? fieldErrors.name : ''}
				{isSubmitted}
				bind:value={snapValue.name}
			/>
			<FloatInput
				name="email"
				type="text"
				labelText="Email"
				errorMessage={!!fieldErrors ? fieldErrors.email : ''}
				{isSubmitted}
				bind:value={snapValue.email}
			/>
			<FloatInput
				name="password"
				type="password"
				labelText="Password"
				errorMessage={!!fieldErrors ? fieldErrors.password : ''}
				{isSubmitted}
				bind:value={snapValue.password}
			/>
			<FloatInput
				name="passwordConfirm"
				type="password"
				labelText="Confirm Password"
				errorMessage={!!fieldErrors ? fieldErrors.passwordConfirm : ''}
				{isSubmitted}
				bind:value={snapValue.passwordConfirm}
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
