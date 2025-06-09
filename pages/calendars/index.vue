<script setup lang="ts">
	const headers = [
		{
			accessorKey: 'id',
			header: 'Id',
			sortable: true,
		},
		{
			accessorKey: 'name',
			header: 'Name',
			sortable: true,
		},
		{
			accessorKey: 'color',
			header: 'Color',
			sortable: false,
		},
	];
</script>

<template>
	<div>
		<div class="h-1/8 border-b p-6 text-5xl">Calendar</div>
		<div class="h-7/8 p-5">
			<TableView :headers="headers" api="calendar" />
		</div>
	</div>
</template>
