<script>
	import Icon from '@iconify/svelte';
	import FloatInput from '$components/FloatInput.svelte';
	import filter from 'lodash/filter';
	import { createForm } from 'felte';
	import { validateSchema } from '@felte/validator-yup';
	import { registerSchema } from '$lib/yup/validator.js';
	import { applyAction, enhance } from '$app/forms';

	let isSubmitted = false;
	let termsTouched = false;

	$: console.log($errors);

	////! client side validation
	const { form, errors } = createForm({
		validate: validateSchema(registerSchema),
		onSuccess(resp, ctx) {
			ctx.reset();
		}
	});
</script>

<div class="flex flex-col items-center">
	<h2 class="m-2">Register</h2>

	<div class="form-control w-full max-w-xs m-2">
		<form method="POST" use:form on:submit|preventDefault={() => (isSubmitted = true)}>
			<FloatInput
				name="name"
				type="text"
				labelText="Name"
				errorMessage={$errors.name}
				{isSubmitted}
			/>
			<FloatInput
				name="email"
				type="text"
				labelText="Email"
				errorMessage={$errors.email}
				{isSubmitted}
			/>
			<FloatInput
				name="password"
				type="password"
				labelText="Password"
				errorMessage={$errors.password}
				{isSubmitted}
			/>
			<FloatInput
				name="passwordConfirm"
				type="password"
				labelText="Confirm Password"
				errorMessage={$errors.passwordConfirm}
				{isSubmitted}
			/>
			<div class="my-3">
				<label class="label cursor-pointer justify-center">
					<input
						name="terms"
						type="checkbox"
						class="checkbox mx-3"
						on:click={() => (termsTouched = true)}
					/>
					<span class="label-text">I accept the terms and conditions</span>
				</label>
			</div>
			{#if $errors.terms && (termsTouched || isSubmitted)}
				<div class="flex items-center px-2 whitespace-nowrap text-error">
					<Icon class="mx-2" icon="material-symbols:warning-rounded" />
					<span>{$errors.terms}</span>
				</div>
			{/if}

			<div class="p-4">
				<button type="submit" class="btn btn-primary w-full">Register</button>
			</div>
		</form>
	</div>
</div>
