import type { Knex as KnexType } from 'knex';
import Knex from 'knex';

export default defineNitroPlugin((nitro) => {
	nitro.hooks.hook('request', async (event) => {
		const config: KnexType.Config = {
			client: 'sqlite3',
			connection: {
				filename: '~/data.db',
			},
			useNullAsDefault: true,
		};
		event.context.db = Knex(config);
	});
	nitro.hooks.hook('afterResponse', async (event) =>
		event.context.db.destroy()
	);
});
