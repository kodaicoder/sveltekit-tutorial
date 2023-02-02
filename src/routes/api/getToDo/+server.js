import { error } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';
import * as _todos from '$lib/server/_todos.js';

/** @type {import('../$types').RequestHandler} */
export async function GET({ cookies }) {
	const userid = cookies.get('userid');
	try {
		const userToDos = (await _todos.getTodos(userid)) ?? [];
		return json(userToDos);
	} catch ({ message }) {
		throw error(500, message);
	}
}
