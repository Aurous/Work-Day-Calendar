export default defineEventHandler(async (event) => {
	try {
		const { id } = event.context.params;
		return event.context.knex('task').where('id', id).first('*');
	} catch (error) {
		throw createError({
			statusCode: 404,
			message: 'Not Found.',
		});
	}
});
