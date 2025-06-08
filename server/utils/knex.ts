import type { Knex as KnexType } from 'knex';
import Knex from 'knex';

const config: KnexType.Config = {
	client: 'sqlite3',
	connection: {
		filename: './server/database/data.db',
	},
	// use this to turn all of the datetimes into luxon objects
	// connection: {
	// 	options: {
	// 	  mapBinding: (value) => {
	useNullAsDefault: true,
};

export function getKnex() {
	console.log('getKnex');
	return Knex(config);
}
