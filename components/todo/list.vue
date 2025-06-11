<script setup lang="ts">
	import { DateTime, type DurationUnit } from 'luxon';

	interface Task {
		id: number;
		title: string;
		priority: number;
		date: string;
		dueDate: DateTime;
	}

	const priorityBorderColors = [
		'border-white',
		'border-[#5a91b5]',
		'border-[#4cc96f]',
		'border-[#c99908]',
		'border-[#be4c2c]',
		'border-[#b9192e]',
	];

	const { data } = await useFetch('/api/tasks/incomplete');
	const tasks = ref(
		data.value.map((task) => {
			console.log(task);
			return {
				...task,
				dueDate: DateTime.fromFormat(task.datetime, 'yyyy-MM-dd HH:mm:ss'),
			};
		})
	);

	function timeToRead(date: DateTime): string {
		const now = DateTime.now();
		const isFuture = date > now;

		const units: DurationUnit[] = [
			'years',
			'months',
			'days',
			'hours',
			'minutes',
		];
		const diff = isFuture ? date.diff(now, units) : now.diff(date, units);

		for (let index = 0; index < units.length; index++) {
			const unit = units[index];
			const amount = Math.floor(diff.get(unit));
			if (amount > 0) {
				return `${isFuture ? 'Due in' : 'Overdue'} ${amount} ${unit.slice(0, -1)}${amount > 1 ? 's' : ''}`;
			}
		}

		return 'Seconds ago';
	}
</script>

<template>
	<div class="p-2">
		<!-- 
			TODO: add a switcher component to swap between different tasks
			IDEA:
					[incomplete] [soonest due] [incomplete + overdue]
					switch between each view every X seconds
		-->
		<template v-if="tasks && tasks.length > 0">
			<UCard
				v-for="{ id, title, dueDate, priority } in tasks"
				:key="id"
				:variant="'outline'"
				class="m-2"
				:ui="{
					root: `border ${priorityBorderColors[priority]}`,
				}"
			>
				<template #default>
					<div class="flex place-content-between gap-5">
						<div>
							{{ title }}
						</div>
						<div>
							{{ timeToRead(dueDate) }}
						</div>
					</div>
				</template>
			</UCard>
		</template>
		<div v-else class="mt-6 text-center">Nothing to do yet.</div>
	</div>
</template>
