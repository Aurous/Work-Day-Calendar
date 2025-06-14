import { z } from 'zod';

const userSchema = z.object({
	title: z.string(),
	priority: z.number(),
	datetime: z.string(),
});

export default defineEventHandler(async (event) => {
	try {
		const id = getRouterParam(event, 'id');
		const body = await readBody(event);
		const validatedData = userSchema.parse(body);

		let model = await event.context.knex('task').where({ id }).first();
		if (!model) {
			throw createError({
				statusCode: 404,
				statusMessage: 'Task not found',
			});
		}

		// Compare existing with validatedData
		const hasChanges = Object.entries(validatedData).some(
			([key, value]) => model[key] !== value
		);
		if (hasChanges) {
			// Perform update
			[model] = await event.context
				.knex('task')
				.where({ id })
				.update(validatedData, '*');

			getSocket().emit('task');
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
