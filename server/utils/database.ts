import type { Knex as KnexType } from 'knex';
import Knex from 'knex';

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

export function getKnex() {
	console.log('next');
	return Knex(config);
}
