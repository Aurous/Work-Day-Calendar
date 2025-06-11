<script setup lang="ts">
	const { api, headers } = defineProps<{
		headers: object[];
		api: string;
	}>();

	const dropdown = ref([10, 25, 50]);
	const perPage = ref(10);
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
	const addSortableHeader = ({ header, accessorKey, sortable, width }) => ({
		accessorKey,
		header: sortable ? createSortableHeader(header) : header,
		meta: {
			class: {
				td: `w-${width} whitespace-normal`,
			},
		},
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
		(newData) => {
			console.log(newData);
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
	watch(perPage, (newData) => {
		query.value = {
			...query.value,
			perPage: newData,
			currentPage: 1,
		};
	});

	const onSelect = (row: TableRow<Payment>) =>
		navigateTo(`/${api}/${row.getValue('id')}`);
</script>

<template>
	<div class="grid h-full grid-cols-3 grid-rows-13">
		<UInput
			v-model="query.q"
			placeholder="Search..."
			class="col-start-1 row-start-1"
		/>
		<UButton
			icon="i-lucide-square-plus"
			size="lg"
			:label="`Create new ${api}`"
			class="col-start-3 row-start-1 self-start justify-self-end"
		/>
		<UTable
			ref="table"
			v-model:pagination="query"
			v-model:sorting="sorting"
			:data="data?.data"
			:columns="columns"
			:loading="pending"
			class="col-span-3 col-start-1 row-span-11 row-start-2"
			sticky
			@select="onSelect"
		/>
		<UPagination
			v-model:page="query.currentPage"
			:total="data?.pagination.total"
			:items-per-page="query.perPage"
			show-first
			show-last
			class="col-start-1 row-start-13 self-end"
		/>
		<div class="col-start-3 row-start-13 self-end justify-self-end">
			<label for="perPage" class="pr-10">Per page:</label>
			<USelect id="perPage" v-model="perPage" :items="dropdown" class="" />
		</div>
	</div>
	<!-- 
		TODO: ensure that the spacing on the columns stays the same
	-->
</template>
