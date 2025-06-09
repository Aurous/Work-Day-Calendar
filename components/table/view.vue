<script setup lang="ts">
	const { api, headers } = defineProps<{
		headers: object[];
		api: string;
	}>();

	const isMounted = ref(false);
	const columns = ref(
		headers.map(({ header, accessorKey, sortable }) => {
			return {
				accessorKey,
				header: ({ column }) => {
					const isSorted = column.getIsSorted();

					if (!sortable) return header;

					let icon = 'i-lucide-arrow-up-down';
					const asc = 'i-lucide-arrow-up-narrow-wide';
					const desc = 'i-lucide-arrow-down-wide-narrow';
					if (isSorted === 'asc') icon = asc;
					else if (isSorted === 'desc') icon = desc;

					return h(resolveComponent('UButton'), {
						color: 'neutral',
						variant: 'ghost',
						label: header,
						icon,
						class: '-mx-2.5',
						onClick: () => {
							column.toggleSorting(column.getIsSorted() === 'asc');
						},
					});
				},
			};
		})
	);
	const query = ref({
		currentPage: 1,
		perPage: 5,
		order: 'asc',
		orderBy: 'id',
	});
	const sorting = ref([
		{
			id: 'id',
			desc: false,
		},
	]);

	const { data, error, execute } = await useFetch(() => `/api/${api}`, {
		query: query.value,
		immediate: true,
		onResponse({ request, response, options }) {
			// Process the response data
			console.log('token', response._data);
		},
	});

	watch(
		query,
		() => {
			console.log('asdf');
			execute();
		},
		{ deep: true }
	);

	watch(sorting, ([{ id = 'id', desc = false }]) => {
		console.log(id, desc);
		console.log(desc ? 'desc' : 'asc');
		query.value.orderBy = id;
		query.value.order = desc ? 'desc' : 'asc';
		// if (val.length > 0) {
		// 	query.value.orderBy = val[0].id;
		// 	query.value.order = val[0].desc ? 'desc' : 'asc';
		// }
	});
</script>

<template>
	<div class="w-full space-y-4 pb-4">
		<UTable
			ref="table"
			v-model:pagination="query"
			v-model:sorting="sorting"
			:data="data?.data"
			:columns="columns"
			class="flex-1"
		/>
		<UPagination
			v-model:page="query.currentPage"
			:total="data?.pagination.total"
			:items-per-page="query.perPage"
			show-first
			show-last
			class="justify-end"
		/>
	</div>
</template>
