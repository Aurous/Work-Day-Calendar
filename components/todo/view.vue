<script setup lang="ts">
	const items = ref([
		{
			label: 'incomplete',
			icon: 'i-lucide-circle-alert',
			value: 'incomplete',
		},
		{
			label: 'pending',
			icon: 'i-lucide-alarm-clock',
			value: 'pending',
		},
		{
			label: 'overdue',
			icon: 'i-lucide-triangle-alert',
			value: 'overdue',
		},
	]);

	const activeTab = ref('overdue');
	const progress = ref(0);
	let animation: NodeJS.Timer;

	onMounted(() => {
		// Progress bar updates every 100ms
		animation = setInterval(() => {
			progress.value += 2; // 100ms * 50 = 5 seconds
			if (progress.value >= 100) {
				progress.value = 0;
				const currentIndex = items.value.findIndex(
					(item) => item.value === activeTab.value
				);
				const nextIndex = (currentIndex + 1) % items.value.length;
				activeTab.value = items.value[nextIndex].label;
			}
		}, 100);
	});

	onBeforeUnmount(() => {
		clearInterval(animation);
	});

	watch(activeTab, (newData) => console.log(newData));
</script>

<template>
	<div class="w-full">
		<!-- Progress bar -->
		<div class="relative mb-2 h-1 rounded bg-gray-200">
			<div
				class="bg-primary-500 h-full transition-all duration-100"
				:style="{ width: `${progress}%` }"
			></div>
		</div>

		<!-- Tabs -->
		<UTabs
			v-model="activeTab"
			:items="items"
			variant="link"
			class="w-full gap-4"
			:ui="{ trigger: 'grow' }"
		>
			<template #incomplete="{ item }">
				<div class="p-4 text-gray-700">
					Incomplete Content: {{ item.label }}
				</div>
			</template>

			<template #pending="{ item }">
				<div class="p-4 text-yellow-700">Pending Content: {{ item.label }}</div>
			</template>

			<template #overdue="{ item }">
				<div class="p-4 text-red-700">Overdue Content: {{ item.label }}</div>
			</template>
		</UTabs>
	</div>
</template>
