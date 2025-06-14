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
		const points = data.value
			.map((event: eventBase): eventWithDateTime => {
				const start = DateTime.fromISO(event.startDT, {
					zone: DateTime.local().zoneName,
				});
				const end = DateTime.fromISO(event.endDT, {
					zone: DateTime.local().zoneName,
				});
				return {
					...event,
					start,
					end,
					interval: Interval.fromDateTimes(start, end),
				};
			})
			.flatMap((event) => [
				{ time: event.start, type: 'start' as const, event },
				{ time: event.end, type: 'end' as const, event },
			])
			.sort(
				({ time: timeA, type }, { time: timeB }) =>
					timeA.valueOf() - timeB.valueOf() || (type === 'end' ? -1 : 1)
			);

		const used = new Set<number>();
		const active = new Map<number, number>();

		let maxColumnWidth = 1;
		let lowestStartDT = DateTime.local().endOf('day');
		let highestEndDT = DateTime.local().startOf('day');

		const eventsWithColumns: eventsWithColumn[] = [];

		for (const point of points) {
			const id = point.event.id;
			// TODO: get the total number of column to span events
			if (point.type === 'start') {
				// Assign next free column
				let column = 1;
				while (used.has(column)) column++;
				used.add(column);
				active.set(id, column);

				// Track bounds
				if (point.time < lowestStartDT) lowestStartDT = point.time;
				if (point.event.end > highestEndDT) highestEndDT = point.event.end;
				if (column > maxColumnWidth) maxColumnWidth = column;

				// Store event with column
				eventsWithColumns.push({
					...point.event,
					column,
				});
			} else {
				const column = active.get(id);
				used.delete(column);
				active.delete(id);
			}
		}

		// Get the total difference in hours
		const totalDiff = Interval.fromDateTimes(lowestStartDT, highestEndDT);
		let totalHours = Math.ceil(totalDiff.length('hours')) + 1;
		// edge case - prevent odd scaling due to
		//		for highest end not ending on the hour
		// 		whole total hours
		if (highestEndDT.minute !== 0 && totalHours % 1 === 0) {
			totalHours += 1;
		}

		return {
			totalTime: totalHours * 60,
			totalHours,
			startingHour: parseInt(lowestStartDT.toFormat('H')) - 1,
			totalColumnWidth: maxColumnWidth * 2 + 2,
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
		// TODO: add a setting to span the events across the whole area
		return {
			backgroundColor: color,
			gridRow: `${rowStart} / span ${span}`,
			gridColumn: `${column * 2} / span ${2}`,
			fontSize: span < 30 ? 'var(--text-sm)' : 'var(--text-md)',
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
					class="flex justify-between rounded-sm border p-2 text-white"
					:style="getEventStyle(event)"
				>
					<!-- TODO: Make this look better -->
					<div class="truncate">{{ event.title }}</div>
					<div>
						{{ event.start.toFormat('h:mma') }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
