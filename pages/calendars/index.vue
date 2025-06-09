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
	<div class="w-full">
		<div class="h-1/6 border-b p-5 text-5xl">Calendar</div>
		<div class="5/6 p-5">
			<TableView :headers="headers" api="calendar" />
		</div>
	</div>
</template>
