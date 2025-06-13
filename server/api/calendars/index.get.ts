import type { Knex } from 'knex';

export default defineEventHandler(async (event) => {
	try {
		const { orderBy = 'id', order = 'asc', q, ...pagination } = getQuery(event);

		return event.context
			.knex('calendar')
			.select('*')
			.orderBy(orderBy, order)
			.where((qb: Knex.QueryBuilder) => {
				if (q) {
					const search = `%${q}%`;
					qb.where('name', 'like', search)
						.orWhere('id', 'like', search)
						.orWhere('color', 'like', search);
				}
			})
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
