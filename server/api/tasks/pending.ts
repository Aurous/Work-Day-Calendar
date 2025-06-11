import type { Knex } from 'knex';

export default defineEventHandler(async (event) => {
	try {
		return event.context
			.knex('task')
			.select('*')
			.where((qb: Knex.QueryBuilder) => {
				qb.where('isCompleted', 1).whereRaw("datetime('now') <= datetime");
			})
			.orderBy([
				{ column: 'datetime', order: 'asc' },
				{ column: 'priority', order: 'desc' },
			])
			.limit(6);
	} catch (error) {
		throw createError({
			statusCode: 404,
			message: 'Not Found.',
		});
	}
});
