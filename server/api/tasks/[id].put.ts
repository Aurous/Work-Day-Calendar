import { z } from 'zod';

const userSchema = z.object({
	title: z.string(),
	isCompleted: z.number(),
	priority: z.number(),
	datetime: z.string(),
});

export default defineEventHandler(async (event) => {
	try {
		const id = getRouterParam(event, 'id');
		const body = await readBody(event);
		const validatedData = userSchema.parse(body);

		const existing = await event.context.knex('task').where({ id }).first();
		if (!existing) {
			throw createError({
				statusCode: 404,
				statusMessage: 'Task not found',
			});
		}

		// Compare existing with validatedData
		const hasChanges = Object.entries(validatedData).some(
			([key, value]) => existing[key] !== value
		);

		let model = existing;

		if (hasChanges) {
			// Perform update
			[model] = await event.context
				.knex('task')
				.where({ id })
				.update(validatedData, '*');

			const socket = getIO();
			socket.emit('task-update', model);
		}

		return model;
	} catch (error) {
		return sendError(
			event,
			createError({
				statusCode: 500,
				statusMessage: 'Internal Server Error',
				data: error instanceof Error ? error.message : String(error),
			})
		);
	}
});
