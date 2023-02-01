<script>
	import * as validator from '$lib/zod/validator.js';
	import { enhance } from '$app/forms';
	import { fail } from '@sveltejs/kit';
	/** @type {import('./$types').PageData} */
	export let data;
	/** @type {import('./$types').ActionData} */
	export let form;

	let formErrors = {};
	$: todosList = data.todos;

	const onCreateSubmit = async ({ form, data, action, cancel }) => {
		////! Before form submitted
		//? `form` is the `<form>` element
		//console.log('form', form);
		//? `data` is its `FormData` object
		//console.log('data', data);
		//? `action` is the URL to which the form is posted
		//console.log('action', action);

		//? parse `FormData` object to JSON object
		const formData = Object.fromEntries(data);

		////! client side validation
		//? clear errors
		formErrors = {};

		//? zod validate
		try {
			validator.todoSchema.parse(formData);
		} catch (err) {
			cancel();
			const { fieldErrors: errors } = err.flatten();
			formErrors = { ...formErrors, ...errors };
		}

		if (!!todosList) {
			if (todosList.find((todo) => todo.title === formData.title)) {
				cancel();
				const errors = { title: ['Title for todo must be unique.'] };
				formErrors = { ...formErrors, ...errors };
			}
		}

		//? `cancel()` will prevent the submission
		//cancel();

		////! After form submitted
		return async ({ result, update }) => {
			console.log('result', result);
			if (result.status === 200) {
				update();
			}
		};
	};
</script>

<h1>todos</h1>
<!-- use:enhance -->
<form method="POST" action="?/create" use:enhance={onCreateSubmit}>
	<label>
		add a todo:
		<input name="title" />
	</label>
	{#if form?.errors?.title}
		<label class="error">{form?.errors?.title[0]}</label>
	{/if}
	{#if formErrors.title}
		<label class="error">{formErrors.title}</label>
	{/if}
</form>

<ul>
	{#each data.todos as todo (todo.id)}
		<li class="todo">
			<!-- use:enhance -->
			<form method="POST" action="?/delete" use:enhance>
				<input type="hidden" name="id" value={todo.id} />
				<button aria-label="Mark as complete">✔</button>
				{todo.title}
			</form>
		</li>
	{/each}
</ul>

<style>
	button,
	input {
		font-family: inherit;
		font-size: inherit;
	}

	input {
		display: block;
		margin: 0.5em 0;
	}

	ul:has(form) {
		list-style: none;
		padding: 0;
	}
	.error {
		color: red;
	}
</style>
