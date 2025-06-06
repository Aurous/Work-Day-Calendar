<script setup lang="ts">
	import { DateTime } from 'luxon';

	const date = ref(DateTime.now());
</script>

<template>
	<div class="grid h-dvh w-full grid-cols-2 gap-2">
		<div class="h-fill">
			<div class="h-1/6 border-b">
				<div class="grid grid-cols-3 place-items-end gap-1">
					<div class="h-fill w-fill row-span-2 self-center text-8xl">
						{{ date.toFormat('dd') }}
					</div>
					<div
						class="h-fill w-fill col-span-2 place-self-start self-end-safe text-5xl"
					>
						{{ date.toFormat('cccc') }}
					</div>
					<div class="h-fill w-fill place-self-start text-xl">
						{{ date.toFormat('LLLL yyyy') }}
					</div>
				</div>
			</div>
			<div class="h-5/6">TODO: add to do here</div>
		</div>
		<div class="grid h-full grid-cols-1">
			<CalendarSchedule />
		</div>
	</div>
</template>
