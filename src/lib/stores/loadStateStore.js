import { writable } from 'svelte/store';

const loadState = () => {
	const { subscribe, set, update } = writable({
		//?set default value of state
		status: 'IDLE', // IDLE, LOADING, NAVIGATING
		message: ''
	});

	const navigateLoader = (isNavigating) => {
		update(() => {
			return {
				status: isNavigating ? 'NAVIGATING' : 'IDLE',
				message: ''
			};
		});
	};

	const manualLoader = (isLoading, message = '') => {
		update(() => {
			return {
				status: isLoading ? 'LOADING' : 'IDLE',
				message: isLoading ? message : ''
			};
		});
	};

	return { subscribe, set, update, navigateLoader, manualLoader };
};

export const loader = loadState();
