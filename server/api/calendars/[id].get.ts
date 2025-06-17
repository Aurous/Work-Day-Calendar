export default defineEventHandler(async (event) => {
	try {
		return event.context
			.knex('calendar')
			.where('id', getRouterParam(event, 'id'))
			.first('*');
	} catch (error) {
		throw createError({
			statusCode: 404,
			message: 'Not Found.',
		});
	}
});
