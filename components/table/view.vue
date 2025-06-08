<script setup lang="ts">
	const UButton = resolveComponent('UButton');
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

	function headerSort({ column, sortable }) {
		const label = column
			.split(' ')
			.map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
			.join(' ');
		return {
			accessorKey: column,
			header: ({ column }) => {
				const isSorted = column.getIsSorted();

				if (!sortable) return label;

				let icon = 'i-lucide-arrow-up-down';
				if (isSorted === 'asc') {
					icon = 'i-lucide-arrow-up-narrow-wide';
				} else if (isSorted === 'desc') {
					icon = 'i-lucide-arrow-down-wide-narrow';
				}

				return h(UButton, {
					color: 'neutral',
					variant: 'ghost',
					label: label,
					icon,
					class: '-mx-2.5',
					onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
				});
			},
		};
	}

	const columns = [
		{ column: 'id', sortable: true, default: 'asc' },
		{ column: 'name', sortable: true },
		{ column: 'color', sortable: false },
	].map(headerSort);

	const sorting = ref([
		{
			id: 'id',
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
