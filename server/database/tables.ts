export interface Calendar {
	id: number;
	name: string;
	color: string;
}

export interface Event {
	id: number;
	title: string;
	startDT: string;
	endDT: string;
	calendarId: number;
}

export interface Task {
	id: number;
	title: string;
	priority: number;
	datetime: string;
}
