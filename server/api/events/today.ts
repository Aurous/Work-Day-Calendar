import type { Knex } from 'knex';

export default defineEventHandler(async (event) => {
	try {
		return event.context
			.knex('event')
			.select('*')
			.where((qb: Knex.QueryBuilder) => {
				qb.whereRaw("date(startDT) = date('now')");
			});
	} catch (error) {
		throw createError({
			statusCode: 404,
			message: 'Not Found.',
		});
	}
});
