import type { Knex as KnexType } from 'knex';
import Knex from 'knex';
import { attachPaginate } from 'knex-paginate';

// export interface Calendar {
// 	id: number;
// 	name: string;
// 	color: string;
// }

// export interface Event {
// 	id: number;
// 	title: string;
// 	startDT: string;
// 	endDT: string;
// 	calendarId: number;
// }

// export interface Task {
// 	id: number;
// 	title: string;
// 	priority: number;
// 	datetime: string;
// }

// declare module 'knex/types/tables' {
// 	interface Tables {
// 		calendar: Calendar;
// 		event: Event;
// 		task: Task;
// 	}
// }

const config: KnexType.Config = {
	client: 'sqlite3',
	connection: {
		filename: './server/database.sqlite3',
	},
	// use this to turn all of the datetimes into luxon objects
	// connection: {
	// 	options: {
	// 	  mapBinding: (value) => {
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
