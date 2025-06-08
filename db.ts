import type { Knex as KnexType } from 'knex';
import Knex from 'knex';

const config: KnexType.Config = {
	client: 'sqlite3',
	connection: {
		filename: 'data.db',
	},
	useNullAsDefault: true,
};

const db = Knex(config);

await db.schema
	.createTable('calendar', (table) => {
		table.increments('id').primary();
		table.string('name');
		table.string('color');
	})
	.createTable('task', (table) => {
		table.increments('id').primary();
		table.string('title');
		table.integer('priority');
		table.datetime('datetime');
	})
	.createTable('event', (table) => {
		table.increments('id').primary();
		table.string('title');
		table.datetime('startDT');
		table.datetime('endDT');
		table.integer('calendarId').unsigned().references('calendar.id');
	});
