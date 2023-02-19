import { useLocalStorage } from 'svelte/store';
/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	// let theme = null;
	// const newTheme = window.localStorage.getItem('theme');

	// if (newTheme) {
	// 	console.log(name);
	// }
	console.log('hook hit')

	const response = await resolve(event);
	return response;
}
