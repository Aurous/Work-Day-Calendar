export default defineEventHandler(async (event) => {
	try {
		return event.context.db('calendar').select(['id', 'name', 'color']);
	} catch (error) {
		console.log(error);

		throw createError({
			statusCode: 404,
			message: 'Not Found.',
		});
	}
});
