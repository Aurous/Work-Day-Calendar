export default defineEventHandler(async (event) => {
	try {
		const query = getQuery(event);

		return event.context.knex('calendar').select('*').paginate(query);
	} catch (error) {
		console.log(error);

		throw createError({
			statusCode: 404,
			message: 'Not Found.',
		});
	}
});
