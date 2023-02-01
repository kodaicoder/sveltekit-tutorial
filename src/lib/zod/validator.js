import { z } from 'zod';

export const todoSchema = z.object({
	title: z
		.string({ required_error: 'Title is required.' })
		.min(1, { message: 'Title is required.' })
		.max(200)
		.trim()
});
