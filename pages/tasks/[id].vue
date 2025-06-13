<script setup lang="ts">
	const { params } = useRoute();
	const { id } = params;
	const { data } = useFetch(`/api/tasks/${id}`);
</script>

<template>
	<div>{{ data }}</div>
</template>
