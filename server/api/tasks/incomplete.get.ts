import type { Knex } from 'knex';

export default defineEventHandler(async (event) => {
	try {
		return event.context
			.knex('task')
			.select('*')
			.where((qb: Knex.QueryBuilder) => {
				qb.where('isCompleted', 0);
			})
			.orderBy([
				{ column: 'priority', order: 'desc' },
				{ column: 'datetime', order: 'asc' },
			])
			.limit(6);
	} catch (error) {
		throw createError({
			statusCode: 404,
			message: 'Not Found.',
		});
	}
});
