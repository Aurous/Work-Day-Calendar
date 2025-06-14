export default defineEventHandler(async (event) => {
	try {
		return event.context
			.knex('event')
			.select('*')
			.whereRaw("date(startDT, 'localtime') = date('now',  'localtime')");
	} catch (error) {
		throw createError({
			statusCode: 404,
			message: 'Not Found.',
		});
	}
});
