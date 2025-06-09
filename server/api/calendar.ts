export default defineEventHandler(async (event) => {
	try {
		const { orderBy = 'id', order = 'asc', ...pagination } = getQuery(event);

		console.log({ orderBy, order, ...pagination });

		return event.context
			.knex('calendar')
			.select('*')
			.orderBy(orderBy, order)
			.paginate({
				...pagination,
				isLengthAware: true,
			});
	} catch (error) {
		throw createError({
			statusCode: 404,
			message: 'Not Found.',
		});
	}
});
