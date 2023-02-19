/** @type {import('./$types').PageServerLoad} */
export async function load() {
	return {};
}

/** @type {import('./$types').Actions} */
export const actions = {
	setTheme: async ({request}) => {
		const formData = Object.fromEntries(await request.formData());
		console.log('actions hit! ', formData);
	}
};
