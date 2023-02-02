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
	.transform((val) => val.title)
	.refine(
		async (title) => {
			const { data } = await axios.get('/api/getToDo/');
			if (data.length > 0) {
				if (data.find((todo) => todo.title === title)) {
					return false;
				}
			}
			return true;
		},
		{
			message: 'Title for todo must be unique.',
			path: ['title']
		}
	);
