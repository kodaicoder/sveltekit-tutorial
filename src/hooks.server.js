//import { themeStore } from '$lib/stores/themeStore';
/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
	// let theme = null;
	// const newTheme = window.localStorage.getItem('theme');
	let currentTheme = event.cookies.get('theme');
	if(!currentTheme){
		event.cookies.set('theme','luxury',
			{
				path:'/',
				httpOnly:false,
				maxAge: 60*60*24*365
			}
		);
		currentTheme = 'luxury';
	}
	const response = await resolve(event,{
		transformPageChunk:({html})=> html.replace('data-theme=""',`data-theme="${currentTheme}"`),
	});
	return response;
}
