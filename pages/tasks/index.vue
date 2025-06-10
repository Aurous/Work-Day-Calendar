<script setup lang="ts">
	const headers = [
		{
			accessorKey: 'id',
			header: 'Id',
			sortable: true,
		},
		{
			accessorKey: 'title',
			header: 'Title',
			sortable: true,
		},
		{
			accessorKey: 'isCompleted',
			header: 'Completed',
			sortable: true,
		},
		{
			accessorKey: 'priority',
			header: 'Priority',
			sortable: true,
		},
		{
			accessorKey: 'datetime',
			header: 'Due Date',
			sortable: true,
		},
	];
</script>

<template>
	<div>
		<div class="h-1/8 border-b p-6 text-5xl">Tasks</div>
		<div class="h-7/8">
			<div class="h-full w-full">
				<TableView :headers="headers" api="task" />
			</div>
		</div>
	</div>
</template>
