import type { Knex } from 'knex';

export default defineEventHandler(async (event) => {
	try {
		const {
			orderBy = 'id',
			order = 'asc',
			q,
			isCompleted,
			...pagination
		} = getQuery(event);

		return event.context
			.knex('task')
			.select('*')
			.orderBy(orderBy, order)
			.where((qb: Knex.QueryBuilder) => {
				if (q) {
					const search = `%${q}%`;
					qb.where('title', 'like', search)
						.orWhere('id', 'like', search)
						.orWhere('isCompleted', 'like', search)
						.orWhere('priority', 'like', search)
						.orWhere('datetime', 'like', search);
				}
				if (isCompleted) qb.where('isCompleted', isCompleted);
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
