import type { Knex as KnexType } from 'knex';
import Knex from 'knex';

export default defineNitroPlugin((nitro) => {
	nitro.hooks.hook('request', async (event) => {
		const config: KnexType.Config = {
			client: 'sqlite3',
			connection: {
				filename: './server/plugins/database/data.db',
			},
			// use this to turn all of the datetimes into luxon objects
			// connection: {
			// 	options: {
			// 	  mapBinding: (value) => {
			useNullAsDefault: true,
		};
		event.context.db = Knex(config);
	});
	nitro.hooks.hook('afterResponse', async (event) =>
		event.context.db.destroy()
	);
});
