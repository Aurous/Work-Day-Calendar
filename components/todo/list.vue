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

	const tasks: Task[] = [
		{
			id: 1,
			title: 'Prepare Quarterly Budget Report',
			priority: 5,
			date: '2025-08-15',
		},
		{
			id: 2,
			title: 'Client Presentation: New Marketing Strategy',
			priority: 4,
			date: '2025-09-10',
		},
		{
			id: 3,
			title: 'Team Meeting: Project Roadmap Review',
			priority: 3,
			date: '2025-10-05',
		},
		{
			id: 4,
			title: 'Update Website Content',
			priority: 2,
			date: '2025-11-20',
		},
		{
			id: 5,
			title: 'Organize Office Supplies',
			priority: 1,
			date: '2025-12-01',
		},
		{
			id: 6,
			title: 'Schedule Annual Performance Reviews',
			priority: 0,
			date: '2026-01-15',
		},
	]

		.map((task) => ({
			...task,
			dueDate: DateTime.fromISO(task.date),
		}))
		.sort(
			({ priority: priorityA }, { priority: priorityB }): number =>
				priorityB - priorityA
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
		<template v-if="tasks && tasks.length > 0">
			<UCard
				v-for="{ id, title, dueDate, priority } in tasks"
				:key="id"
				:variant="'outline'"
				class="m-2"
				:ui="{
					header: 'bg-transparent',
					root: `border ${priorityBorderColors[priority]}`,
					footer: `border-t ${priorityBorderColors[priority]}`,
				}"
			>
				<template #default>
					<div>
						{{ title }}
						<br />
						{{ timeToRead(dueDate) }}
					</div>
				</template>
			</UCard>
		</template>
		<div v-else class="mt-6 text-center">Nothing to do yet.</div>
	</div>
</template>
