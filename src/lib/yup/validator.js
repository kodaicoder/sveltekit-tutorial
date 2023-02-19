import * as y from 'yup';

export const registerSchema = y.object({
	name: y
		.string()
		.trim()
		.required('Name is required.')
		.max(64, 'Name must be at most 64 characters.'),
	email: y
		.string()
		.trim()
		.email('Email must be valid format.')
		.required('Email is required.')
		.max(64, 'Email must be at most 64 characters.'),
	password: y
		.string()
		.trim()
		.required('Password is required.')
		.min(6, 'Password must be at least 6 characters.')
		.max(32, 'Password must be at most 32 characters'),
	passwordConfirm: y
		.string()
		.trim()
		.required('Confirm password is required.')
		.min(6, 'Confirm password must be at least 6 characters.')
		.max(32, 'Confirm password must be at most 32 characters')
		.oneOf([''], 'Confirm password is required.')
		.oneOf([y.ref('password')], 'Passwords must match'),

	terms: y.boolean().oneOf([true], 'You must accept the terms and conditions.')
});

export const yupValidator= async (formObj,schema) => {
	try {
		await schema.validate(formObj, { abortEarly: false });
	} catch (err) {
		const fieldErrors = err.inner.reduce(
			(res, value) => ({
				[value.path]: value.message,
				...res
			}),
			{}
		);
		return fieldErrors;
	}
};
