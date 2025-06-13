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
	const pauseCount = ref(0);
	let animation: NodeJS.Timer;

	onMounted(() => {
		animation = setInterval(() => {
			if (pauseCount.value > 0) {
				pauseCount.value -= 1;
			} else {
				progress.value += 1;
				if (progress.value >= 100) {
					progress.value = 0;
					const currentIndex = items.value.findIndex(
						({ value }) => value === activeTab.value
					);
					const nextIndex = (currentIndex + 1) % items.value.length;
					activeTab.value = items.value[nextIndex].label;
				}
			}
		}, 100);

		const { on } = useSocket();
		on('todo-remove', () => {
			console.log('todo-remove');
		});
		on('todo-add', () => {
			console.log('todo-add');
		});
		on('todo-edit', () => {
			console.log('todo-edit');
		});
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
			:ui="{
				trigger: 'grow',
			}"
			class="gap-0.25"
			@click="pauseCount = 25"
		/>
		<UProgress v-model="progress" size="xs" />
		<div>
			<TodoList v-if="activeTab === 'incomplete'" api="incomplete" />
			<TodoList v-else-if="activeTab === 'pending'" api="pending" />
			<TodoList v-else-if="activeTab === 'overdue'" api="overdue" />
		</div>
	</div>
</template>
