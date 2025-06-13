export default defineEventHandler(async (event) => {
	try {
		// const body = await readBody(event);
		return event.context
			.knex('task')
			.where('id', getRouterParam(event, 'id'))
			.first('*');
	} catch (error) {
		throw createError({
			statusCode: 404,
			message: 'Not Found.',
		});
	}
});
