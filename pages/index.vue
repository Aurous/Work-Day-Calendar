<script setup lang="ts">
	const connection = ref(false);

	onMounted(() => {
		connection.value = useSocket().connected;
	});
</script>

<template>
	<p>Socket {{ connection ? 'Ready' : 'Starting...' }}</p>
</template>
