import axios from 'axios';
import { z } from 'zod';

export const todoSchema = z
	.object({
		title: z
			.string({ required_error: 'Title is required.' })
			.min(1, { message: 'Title is required.' })
			.max(200)
			.trim()
	})
	.superRefine(async (val, ctx) => {
		try {
			const { data } = await axios.get('/api/getToDo/');
			if (data.length > 0) {
				if (data.find((todo) => todo.title === val.title)) {
					ctx.addIssue({
						code: z.ZodIssueCode.custom,
						message: 'Title for todo must be unique. 😡',
						path: ['title']
					});
					return false;
				}
			}
			return true;
		} catch ({ response }) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				fatal: true,
				message: 'Error-' + response.status + ' : ' + response.data.message,
				path: ['title']
			});
			return false;
		}
	});

export const registerSchema = z.object({
	name: z
		.string({ required_error: 'Name is required.' })
		.min(1, { message: 'Name is required.' })
		.max(64, { message: 'Name must be at most 64 characters' })
		.trim(),
	email: z
		.string({ required_error: 'Email is required.' })
		.min(1, { message: 'Email is required.' })
		.max(64, { message: 'Email must be at most 64 characters' })
		.email(),
	password: z
		.string({ required_error: 'Password is required.' })
		.min(6, { message: 'Password must be at least 6 characters.' })
		.max(32, { message: 'Password must be at most 32 characters.' })
		.trim(),
	passwordConfirm: z
		.string({ required_error: 'Confirm password is required.' })
		.min(6, { message: 'Confirm password must be at least 6 characters.' })
		.max(32, { message: 'Confirm password must be at most 32 characters.' })
		.trim(),
	terms: z.enum(['on'], { required_error: 'You must accept the terms and conditions.' })
});
