<script setup lang="ts">
	import { DateTime, Interval } from 'luxon';

    // const { $socket } = use
	// $socket.on("update", (data) => {
	//     console.log("Got update:", data);
	// });

	interface event {
		id: number;
		title: string;
		startDT: string;
		endDT: string;
		color: string;
	};

    interface eventsWithColumns extends event {
        id: number;
		title: string;
		startDT: string;
		endDT: string;
		color: string;
		start: DateTime;
		end: DateTime;
		column: number;
    }

    // this will change to a fetch
	const eventsFetched = [
		{
			id: 1,
			title: 'Meeting with Team',
			startDT: '2025-06-03T09:30:00',
			endDT: '2025-06-03T10:30:00',
			color: 'blue',
		},
		{
			id: 2,
			title: 'Lunch Break',
			startDT: '2025-06-03T12:00:00',
			endDT: '2025-06-03T13:00:00',
			color: 'blue',
		},
		{
			id: 3,
			title: 'Design Review',
			startDT: '2025-06-03T15:15:00',
			endDT: '2025-06-03T16:00:00',
			color: 'blue',
		},
		{
			id: 4,
			title: 'Test',
			startDT: '2025-06-03T10:30:00',
			endDT: '2025-06-03T13:30:00',
			color: 'blue',
		},
		{
			id: 5,
			title: 'Test',
			startDT: '2025-06-03T10:30:00',
			endDT: '2025-06-03T11:30:00',
			color: 'red',
		},
		{
			id: 6,
			title: 'Test',
			startDT: '2025-06-03T15:30:00',
			endDT: '2025-06-03T16:30:00',
			color: 'green',
		},
		{
			id: 7,
			title: 'Test',
			startDT: '2025-06-03T12:30:00',
			endDT: '2025-06-03T16:30:00',
			color: 'yellow',
		},
		{
			id: 8,
			title: 'Test',
			startDT: '2025-06-03T12:30:00',
			endDT: '2025-06-03T13:30:00',
			color: 'black',
		},
		{
			id: 9,
			title: 'Test',
			startDT: '2025-06-03T13:00:00',
			endDT: '2025-06-03T13:30:00',
			color: 'blue',
		},
		{
			id: 10,
			title: 'Test',
			startDT: '2025-06-03T13:30:00',
			endDT: '2025-06-03T15:00:00',
			color: 'blue',
		},
		{
			id: 11,
			title: 'Test',
			startDT: '2025-06-03T14:00:00',
			endDT: '2025-06-03T15:30:00',
			color: 'blue',
		},
	];

    // inject luxon into events
	const events = eventsFetched.map((event) => {
		const { startDT, endDT } = event;

		const start = DateTime.fromISO(startDT, {
			zone: DateTime.local().zoneName,
		});
		const end = DateTime.fromISO(endDT, { zone: DateTime.local().zoneName });
		const interval = Interval.fromDateTimes(start, end);

		return {
			...event,
			start,
			end,
			interval,
		};
	});

	const { assigned } = events
		// map events into array of start and end times
		.flatMap((event) => {
			const { start, end } = event.interval;
			return [
				{ time: start, type: 'start', event },
				{ time: end, type: 'end', event },
			];
		})
		// sort based on time or type
		.sort((a, b) => a.time - b.time || (a.type === 'end' ? -1 : 1))
		// calculate which times overlap
		.reduce(
			(state, { type, event: { id } }) => {
				const { assigned, used, active } = state;

				if (type === 'start') {
					let column = 1;
					while (used.has(column)) column++;
					assigned.set(id, column);
					active.set(id, column);
					used.add(column);
				} else {
					used.delete(active.get(id));
					active.delete(id);
				}

				return state;
			},
			{
				assigned: new Map(),
				used: new Set(),
				active: new Map(),
			}
		);

	// Add column info to events
	let maxColumnWidth = 1;

	// attach column onto event
	const eventsWithColumns = events.map(({ id, ...event }) => {
		const column = assigned.get(id);
		if (column > maxColumnWidth) maxColumnWidth = column;

		return {
			id,
			...event,
			column,
		};
	});

	// TODO: move these to environment/settings
	const startingHour = 8;
	const totalHours = 11;
	const splitPeriod = 4;
	const totalTime = totalHours * splitPeriod;
	const totalColumnWidth = maxColumnWidth * 2 + 2;

	if (import.meta.client) {
		const { $socket } = useNuxtApp();
		console.log($socket);
		$socket.on('update', (data) => {
			console.log('Got update:', data);
		});
	}

	function getEventStyle(
		event: event,
		totalTime: number,
		startingHour: number,
		totalHours: number,
		splitPeriod: number
	) {
		const { start, end, column, color } = event;

		const [hours, minutes] = start.toFormat('H:m').split(':');
		const startHour =
			(totalTime *
				((parseInt(hours) * 60 + parseInt(minutes)) / 60 - startingHour)) /
				totalHours +
			1;
		const duration =
			(end.diff(start, ['hour']).toObject().hours || 1) * splitPeriod;

		return {
			backgroundColor: color,
			gridColumnStart: column * 2,
			gridRow: `${startHour} / span ${duration}`,
		};
	}
</script>

<template>
	<div class="grid h-full grid-cols-1">
		<div class="col-start-1 row-start-1">
			<div
				class="grid h-full"
				:style="{
					gridTemplateRows: `repeat(${totalTime}, minmax(0, .25fr))`,
				}"
			>
				<div
					v-for="hour in totalHours"
					:key="hour"
					class="flex place-items-center border-t"
					:style="{
						gridRow: `span ${splitPeriod}`,
					}"
				>
					<div class="self-start">
						{{
							DateTime.fromFormat(
								`${String(startingHour + (hour - 1)).padStart(2, '0')}:00`,
								'T'
							).toFormat('t')
						}}
					</div>
				</div>
			</div>
		</div>
		<div class="col-start-1 row-start-1">
			<div
				class="grid h-full"
				:style="{
					gridTemplateRows: `repeat(${totalTime}, minmax(0, .25fr))`,
					gridTemplateColumns: `repeat(${totalColumnWidth}, minmax(0, 1fr))`,
				}"
			>
				<div
					v-for="event in eventsWithColumns"
					:key="event.id"
					class="col-span-2 border text-sm text-white"
					:style="
						getEventStyle(
							event,
							totalTime,
							startingHour,
							totalHours,
							splitPeriod
						)
					"
				>
					<div class="truncate font-semibold">{{ event.title }}</div>
					<div class="truncate text-xs">
						{{ event.start.toFormat('h:mma') }} -
						{{ event.end.toFormat('h:mma') }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
