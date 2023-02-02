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
