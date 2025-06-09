<script setup lang="ts">
	const { api, headers } = defineProps<{
		headers: object[];
		api: string;
	}>();

	const query = ref({
		currentPage: 1,
		perPage: 10,
		order: 'asc',
		orderBy: 'id',
	});
	const sorting = ref([
		{
			id: 'id',
			desc: false,
		},
	]);

	const getSortIcon = (isSorted) =>
		isSorted
			? isSorted === 'asc'
				? 'i-lucide-arrow-up-narrow-wide'
				: 'i-lucide-arrow-down-wide-narrow'
			: 'i-lucide-arrow-up-down';
	const createSortableHeader =
		(header) =>
		({ column }) => {
			const isSorted = column.getIsSorted();

			return h(resolveComponent('UButton'), {
				color: 'neutral',
				variant: 'ghost',
				label: header,
				icon: getSortIcon(column.getIsSorted()),
				class: '-mx-2.5',
				onClick: () =>
					(sorting.value[0] = {
						id: column.id,
						desc: column.getIsSorted() === 'asc',
					}),
			});
		};
	const addSortableHeader = ({ header, accessorKey, sortable }) => ({
		accessorKey,
		header: sortable ? createSortableHeader(header) : header,
	});
	const columns = ref(headers.map(addSortableHeader));

	// api call for table
	const { data, error, pending, execute } = await useFetch(
		() => `/api/${api}`,
		{
			query: computed(() => query.value),
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
	watch(
		sorting,
		([{ id, desc }]) => {
			query.value = {
				...query.value,
				order: desc ? 'desc' : 'asc',
				orderBy: id,
			};
		},
		{ deep: true }
	);
	// prevent data from becoming null when fetching updates
	watch(
		data,
		(newData, oldData, callback) => {
			if (newData === null) data.value = oldData;
		},
		{ deep: true }
	);
</script>

<template>
	<div class="flex h-full flex-col justify-center pt-2 pr-5 pl-5">
		<div class="mb-4 flex justify-center">
			<UInput
				v-model="query.q"
				placeholder="Search..."
				class="w-full max-w-md"
			/>
		</div>
		<UTable
			ref="table"
			v-model:pagination="query"
			v-model:sorting="sorting"
			:data="data?.data"
			:columns="columns"
			:loading="pending"
			class="flex-1"
		/>
		<UPagination
			v-model:page="query.currentPage"
			:total="data?.pagination.total"
			:items-per-page="query.perPage"
			show-first
			show-last
			class="mt-2"
		/>
	</div>
	<!-- 
		TODO: ensure that spacing does not change on table and pagination
		probably need to use flex, but grid might work better
	-->
	<!-- 
		TODO: ensure that the spacing on the columns stays the same
	-->
	<!-- 
		TODO: add perPage component
		might use dropdown?
		slider? => probably not 
	-->
</template>
