<script setup lang="ts">
	const { api, headers } = defineProps<{
		headers: object[];
		api: string;
	}>();

	const getSortIcon = (isSorted) =>
		isSorted
			? isSorted === 'asc'
				? 'i-lucide-arrow-up-narrow-wide'
				: 'i-lucide-arrow-down-wide-narrow'
			: 'i-lucide-arrow-up-down';
	const createSortableHeader =
		(header) =>
		({ column }) =>
			h(resolveComponent('UButton'), {
				color: 'neutral',
				variant: 'ghost',
				label: header,
				icon: getSortIcon(column.getIsSorted()),
				class: '-mx-2.5',
				onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
			});
	const addSortableHeader = ({ header, accessorKey, sortable }) => ({
		accessorKey,
		header: sortable ? createSortableHeader(header) : header,
	});
	const columns = ref(headers.map(addSortableHeader));

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
	// api call for table
	const { data, error, pending, execute } = await useFetch(
		() => `/api/${api}`,
		{
			query: query.value,
			immediate: true,
		}
	);
	// run the data execute when the query has changed
	watch(
		query,
		() => {
			execute();
		},
		{ deep: true }
	);
	// make sure to update the query when changing the sort
	watch(sorting, ([{ id = 'id', desc = false }]) => {
		query.value.orderBy = id;
		query.value.order = desc ? 'desc' : 'asc';
	});
	// prevent data from becoming null when fetching updates
	watch(
		data,
		(newData, oldData, callback) => {
			if (newData === null) data.value = oldData;
		},
		{ deep: true }
	);
</script>

<!-- 
	TODO: figure out a better way for sorting
	PROBLEM: slight show of data sorting by table for api returns data
	might be able to use query over sort ref
 -->
<template>
	<div class="grid h-full grid-rows-2">
		<UTable
			ref="table"
			v-model:pagination="query"
			v-model:sorting="sorting"
			:data="data?.data"
			:columns="columns"
			:loading="pending"
		/>
		<UPagination
			v-model:page="query.currentPage"
			:total="data?.pagination.total"
			:items-per-page="query.perPage"
			show-first
			show-last
		/>
	</div>
	<!-- 
		TODO: ensure that spacing does not change on table and pagination
		probably need to use flex, but grid might work better
	-->
	<!-- 
		TODO: add perPage component
		might use dropdown?
		slider? => probably not 
	-->
</template>
