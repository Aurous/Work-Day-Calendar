<script setup lang="ts">
	// const props = defineProps<{
	//  columns: string[];
	// 	items: [];
	// }>();

	const items = [
		{
			id: 1,
			name: 'Google Calendar',
			color: 'blue',
		},
		{
			id: 2,
			name: 'Teams Calendar',
			color: 'green',
		},
		{
			id: 3,
			name: 'Yahoo Calendar',
			color: 'yellow',
		},
		{
			id: 3,
			name: 'Proton Calendar',
			color: 'red',
		},
	];

	const keys = ['id', 'name', 'color'];

	function headerSort(key) {
		const header = key
			.split(' ')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
		return {
			accessorKey: key,
			header,
		};
	}

	const columns = keys.map(headerSort);

	// const columns: TableColumn<any>[] = [
	// 	{
	// 		accessorKey: 'id',
	// 		header: 'Id',
	// 	},
	// 	{
	// 		accessorKey: 'date',
	// 		header: 'Date',
	// 	},
	// 	{
	// 		accessorKey: 'status',
	// 		header: 'Status',
	// 	},
	// 	{
	// 		accessorKey: 'email',
	// 		header: ({ column }) => {
	// 			const isSorted = column.getIsSorted();

	// 			return h(UButton, {
	// 				color: 'neutral',
	// 				variant: 'ghost',
	// 				label: 'Email',
	// 				icon: isSorted
	// 					? isSorted === 'asc'
	// 						? 'i-lucide-arrow-up-narrow-wide'
	// 						: 'i-lucide-arrow-down-wide-narrow'
	// 					: 'i-lucide-arrow-up-down',
	// 				class: '-mx-2.5',
	// 				onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
	// 			});
	// 		},
	// 	},
	// 	{
	// 		accessorKey: 'amount',
	// 		header: 'Amount',
	// 	},
	// ];

	const sorting = ref([
		{
			id: 'email',
			desc: false,
		},
	]);
</script>

<template>
	<UTable
		v-model:sorting="sorting"
		:data="items"
		:columns="columns"
		class="flex-1"
	/>
</template>
