import type { Knex as KnexType } from 'knex';
import Knex from 'knex';
import { attachPaginate } from 'knex-paginate';

const config: KnexType.Config = {
	client: 'better-sqlite3',
	connection: {
		filename: './server/database.sqlite3',
		options: {},
	},
	useNullAsDefault: true,
};

let knex: KnexType | null = null;

export function getKnex() {
	// if existing
	if (knex) return knex;
	// create knex instance
	knex = Knex(config);
	// knex does not exist
	if (!knex) throw new Error('Database not initialized!');
	// add pagination plugin
	attachPaginate();
	return knex;
}
