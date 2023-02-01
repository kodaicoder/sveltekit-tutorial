import * as _todos from '$lib/server/_todos.js';
import { fail } from '@sveltejs/kit';
import crypto from 'crypto';
import * as validator from '$lib/zod/validator.js';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	const id = cookies.get('userid');
	if (!id) {
		cookies.set('userid', crypto.randomUUID(), { path: '/' });
	}
	try {
		const response = (await _todos.getTodos(id)) ?? [];
		return {
			todos: response
		};
	} catch (error) {
		return fail(500, {
			todos: [],
			internalErrors: error.message
		});
	}
}

/** @type {import('./$types').Actions} */
export const actions = {
	create: async ({ cookies, request }) => {
		console.log('SERVER SIDE HIT!!');
		const data = await request.formData();
		const formData = Object.fromEntries(data);

		//!server side validation
		// try {
		// 	validator.todoSchema.parse(formData);
		// } catch (err) {
		// 	const { fieldErrors: errors } = err.flatten();
		// 	return fail(500, {
		// 		errors
		// 	});
		// }

		const userid = cookies.get('userid');
		const title = data.get('title');
		// let userToDos = [];
		// try {
		// 	userToDos = (await _todos.getTodos(userid)) ?? [];
		// } catch (error) {
		// 	return fail(500, {
		// 		title,
		// 		internalErrors: error.message
		// 	});
		// }

		// if (userToDos.length > 0) {
		// 	if (userToDos.find((todo) => todo.title === title)) {
		// 		return fail(422, {
		// 			title,
		// 			errors: { title: ['Title for todo must be unique.'] }
		// 		});
		// 	}
		// }

		//!POST data
		try {
			const response = await _todos.createTodo(userid, title);
			return {
				success: true,
				todo: response
			};
		} catch (error) {
			return fail(500, {
				data: '',
				internalErrors: error.message
			});
		}
	},

	delete: async ({ request }) => {
		const data = await request.formData();
		try {
			const response = await _todos.deleteTodo(Number(data.get('id')));
			return {
				success: true,
				todo: response
			};
		} catch (error) {
			return fail(500, {
				data: data.get('title'),
				isDelete: true,
				internalErrors: error.message
			});
		}
	}
};
