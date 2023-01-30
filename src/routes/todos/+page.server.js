import * as db from '$lib/server/db.js';
import crypto from 'crypto';

/** @type {import('./$types').PageServerLoad} */
export async function load({ cookies }) {
	const id = cookies.get('userid');
	if (!id) {
		cookies.set('userid', crypto.randomUUID(), { path: '/' });
	}
	const response = await db.getTodos(id);
	console.log(response);
	return {
		todos: response
	};
}

export const actions = {
	create: async ({ cookies, request }) => {
		const data = await request.formData();
		await db.createTodo(cookies.get('userid'), data.get('description'));
	},

	delete: async ({ request }) => {
		const data = await request.formData();
		await db.deleteTodo(data.get('id'));
	}
};
