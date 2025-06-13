<script setup lang="ts">
	import { DateTime, Interval } from 'luxon';

	interface eventBase {
		id: number;
		title: string;
		startDT: string;
		endDT: string;
		color: string;
	}

	interface eventWithDateTime extends eventBase {
		start: DateTime<boolean>;
		end: DateTime<boolean>;
		interval: Interval;
	}

	interface point {
		time: DateTime<true>;
		type: 'start' | 'end';
		event: eventBase;
	}

	interface eventsWithColumn extends eventWithDateTime {
		column: number;
	}

	const { data } = await useFetch('/api/events/today');

	const scheduleData = computed(() => {
		const events = data.value.map((event: eventBase): eventWithDateTime => {
			const start = DateTime.fromISO(event.startDT);
			const end = DateTime.fromISO(event.endDT);
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
			.flatMap((event: eventWithDateTime): point[] => {
				const { start, end } = event.interval;
				if (!start || !end) return [];
				return [
					{ time: start, type: 'start', event },
					{ time: end, type: 'end', event },
				];
			})
			// sort based on time or type
			.sort(
				({ time: timeA, type }: point, { time: timeB }: point): number =>
					timeA.valueOf() - timeB.valueOf() || (type === 'end' ? -1 : 1)
			)
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
		let lowestStartDT: DateTime = DateTime.local().endOf('day');
		let highestEndDT: DateTime = DateTime.local().startOf('day');

		// attach column onto event
		const eventsWithColumns = events.map(
			({ id, ...event }: eventWithDateTime): eventsWithColumn => {
				const { start: s, end: e } = event;

				const column = assigned.get(id);
				if (column > maxColumnWidth) maxColumnWidth = column;
				if (s < lowestStartDT) lowestStartDT = s;
				if (e > highestEndDT) highestEndDT = e;

				return {
					id,
					...event,
					column,
				};
			}
		);

		// get the hour of the lowest start
		const startingHour = parseInt(lowestStartDT.toFormat('H')) - 1;
		// get the difference between the lowest start and highest end
		const totalDiff = Interval.fromDateTimes(lowestStartDT, highestEndDT);
		// get the total difference in hours
		let totalHours = Math.ceil(totalDiff.length('hours')) + 1 || 0;
		// edge case - prevent odd scaling due to
		//		for highest end not ending on the hour
		// 		whole total hours
		if (parseInt(highestEndDT.toFormat('m')) !== 0 && totalHours % 1 === 0) {
			totalHours += 1;
		}
		// how many possible periods are in hour
		const totalTime = totalHours * 60;
		const totalColumnWidth = maxColumnWidth * 2 + 2;

		return {
			totalTime,
			totalHours,
			startingHour,
			totalColumnWidth,
			eventsWithColumns,
		};
	});

	const {
		totalTime = 0,
		totalHours = 0,
		startingHour = 0,
		totalColumnWidth = 0,
		eventsWithColumns = [],
	} = scheduleData.value;

	function getEventStyle({ start, interval, column, color }: eventsWithColumn) {
		const [hours, minutes] = start
			.toFormat('H:m')
			.split(':')
			.map((key) => parseInt(key));
		const totalMinutes = hours * 60 + minutes;
		const hourShift = totalMinutes / 60 - startingHour;
		// use totals and hourShift to cross multi to get starting row grid
		const rowStart = (totalTime * hourShift) / totalHours + 1;
		const span = interval.length('hours') * 60;

		return {
			backgroundColor: color,
			gridColumnStart: column * 2,
			gridRow: `${rowStart} / span ${span}`,
		};
	}
</script>

<template>
	<div class="grid h-full w-full grid-cols-1">
		<div class="col-start-1 row-start-1">
			<div
				class="grid h-full"
				:style="{
					gridTemplateRows: `repeat(${totalTime}, minmax(0, .25fr))`,
				}"
			>
				<div
					v-for="(hour, index) in totalHours"
					:key="hour"
					class="flex place-items-center"
					:class="index > 0 ? 'border-t' : ''"
					:style="{
						gridRow: `span 60`,
					}"
				>
					<div class="self-start pt-1 pl-2">
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
					class="col-span-2 border text-white"
					:style="getEventStyle(event)"
				>
					<!-- TODO: Make this look better -->
					<div class="truncate font-semibold">{{ event.title }}</div>
					<!-- <div class="truncate text-xs">
						{{ event.start.toFormat('h:mma') }} -
						{{ event.end.toFormat('h:mma') }}
					</div> -->
				</div>
			</div>
		</div>
	</div>
</template>
