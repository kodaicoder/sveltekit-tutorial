import { writable } from 'svelte/store';

const formDataObj = () => {
	const { subscribe, set, update } = writable({});

	const updateFormData = (formObj) => {
		update(() => {
			return { ...formObj };
		});
	};

	const resetFormData = () => {
		update(() => {
			return {};
		});
	};

	return { subscribe, set, update, updateFormData, resetFormData };
};

export const formStore = formDataObj();
