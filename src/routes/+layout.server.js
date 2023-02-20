/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies }) {
    return {
        theme: cookies.get('theme')
    };
}