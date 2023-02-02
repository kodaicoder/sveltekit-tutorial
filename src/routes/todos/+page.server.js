import * as _todos from '$lib/server/_todos.js';
import { fail, redirect } from '@sveltejs/kit';
import crypto from 'crypto';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	const userid = cookies.get('userid');
	if (!userid) {
		cookies.set('userid', crypto.randomUUID(), {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			secure: false,
			maxAge: 60 * 60 * 24 * 30
		});
	}
	try {
		const response = (await _todos.getTodos(userid)) ?? [];
		return {
			userid: userid,
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
		const userid = cookies.get('userid');
		const title = data.get('title');

		//!server side validation
		// try {
		// 	validator.todoSchema.parse(formData);
		// } catch (err) {
		// 	const { fieldErrors: errors } = err.flatten();
		// 	return fail(500, {
		// 		errors
		// 	});
		// }

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

			//? use this to redirect after successful submited
			//throw redirect(303, '/');

			//? use this return success type
			return {
				success: true,
				todo: response
			};
		} catch (error) {
			//? don't sure that will have better way to throw redirect on try..catch block
			if (error.status) {
				if (error.status >= 300 && error.status < 400) {
					throw redirect(error.status, error.location);
				}
			}

			throw fail(500, {
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
			throw fail(500, {
				data: data.get('title'),
				isDelete: true,
				internalErrors: error.message
			});
		}
	}
};
