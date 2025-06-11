<script setup lang="ts">
	const headers = [
		{
			accessorKey: 'id',
			header: 'Id',
			sortable: true,
			size: 10,
		},
		{
			accessorKey: 'title',
			header: 'Title',
			sortable: true,
			size: 10,
		},
		{
			accessorKey: 'isCompleted',
			header: 'Completed',
			sortable: true,
			size: 10,
		},
		{
			accessorKey: 'priority',
			header: 'Priority',
			sortable: true,
			size: 10,
		},
		{
			accessorKey: 'datetime',
			header: 'Due Date',
			sortable: true,
			size: 10,
		},
	];
</script>

<template>
	<div class="h-dvh">
		<div class="h-1/8 border-b p-6 text-5xl">Tasks</div>
		<div class="h-7/8">
			<div class="h-full w-full p-6">
				<TableView :headers="headers" api="task" />
			</div>
		</div>
	</div>
</template>
