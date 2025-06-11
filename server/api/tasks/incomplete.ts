import type { Knex } from 'knex';

export default defineEventHandler(async (event) => {
	try {
		return event.context
			.knex('task')
			.select('*')
			.orderBy([
				{ column: 'priority', order: 'desc' },
				{ column: 'datetime', order: 'asc' },
			])
			.where((qb: Knex.QueryBuilder) => {
				qb.where('isCompleted', 1);
			})
			.limit(6);
	} catch (error) {
		throw createError({
			statusCode: 404,
			message: 'Not Found.',
		});
	}
});
