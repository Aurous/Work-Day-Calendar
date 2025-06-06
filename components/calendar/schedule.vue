<script setup lang="ts">
	import { DateTime } from 'luxon';

	type event = {
		id: number;
		title: string;
		startDT: string;
		endDT: string;
		color: string;
		start: DateTime;
		end: DateTime;
		column: number;
	};

	defineProps<{
		totalTime: number;
		totalHours: number;
		splitPeriod: number;
		startingHour: number;
		totalColumnWidth: number;
		eventsWithColumns: [event];
	}>();

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
