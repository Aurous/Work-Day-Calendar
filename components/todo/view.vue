<script setup lang="ts">
	const items = ref([
		{
			label: 'incomplete',
			icon: 'i-lucide-circle-alert',
			value: 'incomplete',
			slot: 'incomplete' as const,
		},
		{
			label: 'pending',
			icon: 'i-lucide-alarm-clock',
			value: 'pending',
			slot: 'pending' as const,
		},
		{
			label: 'overdue',
			icon: 'i-lucide-triangle-alert',
			value: 'overdue',
			slot: 'overdue' as const,
		},
	]);

	const activeTab = ref('incomplete');
	const progress = ref(0);
	let animation: NodeJS.Timer;

	onMounted(() => {
		animation = setInterval(() => {
			progress.value += 2; // 200ms * 50 = 10 seconds
			if (progress.value >= 100) {
				progress.value = 0;
				const currentIndex = items.value.findIndex(
					({ value }) => value === activeTab.value
				);
				const nextIndex = (currentIndex + 1) % items.value.length;
				activeTab.value = items.value[nextIndex].label;
			}
		}, 200);
	});

	onBeforeUnmount(() => {
		clearInterval(animation);
	});
</script>

<template>
	<div class="w-full">
		<UTabs
			v-model="activeTab"
			:items="items"
			variant="link"
			:ui="{ trigger: 'grow' }"
			class="gap-1"
		/>
		<UProgress v-model="progress" />
		<div>
			<TodoList v-if="activeTab === 'incomplete'" api="incomplete" />
			<TodoList v-else-if="activeTab === 'pending'" api="pending" />
			<TodoList v-else-if="activeTab === 'overdue'" api="overdue" />
		</div>
	</div>
</template>
