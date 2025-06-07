<script setup lang="ts">
	import { DateTime, type DurationUnit } from 'luxon';

	interface Task {
		id: number;
		title: string;
		priority: number;
		date: string;
		dueDate: DateTime;
	}

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

	const priorityColors = [
		'border-white', // white
		'border-[#5a91b5]', // blue
		'border-[#4cc96f]', // green
		'border-[#869e57]', // yellow
		'border-[#a36655]', // orange
		'border-[#8f3a46]', // red
	];

	function timeSince(date: DateTime): string {
		const now = DateTime.now();
		const isFuture = date > now;
		const select: DurationUnit[] = ['year', 'month', 'day', 'hour'];
		const diff = isFuture ? date.diff(now, select) : now.diff(date, select);
		const readable = diff.toHuman({
			listStyle: 'long',
			unitDisplay: 'long',
		});
		return isFuture ? `Due in ${readable}` : 'Past due!';
	}
</script>

<template>
	<div class="grid grid-cols-2 p-6">
		<template v-if="tasks && tasks.length > 0">
			<UCard
				v-for="{ id, title, dueDate, priority } in tasks"
				:key="id"
				variant="outline"
				class="m-2"
				:ui="{
					root: `border ${priorityColors[priority]}`,
					footer: `border-t ${priorityColors[priority]}`,
				}"
			>
				<template #header>
					{{ title }}
				</template>

				<template #footer>
					<div>{{ timeSince(dueDate) }}</div>
				</template>
			</UCard>
		</template>
		<div v-else class="mt-6 text-center">Nothing to do yet.</div>
	</div>
</template>
