<script setup lang="ts">
	import { ref } from 'vue';

	const isCollapsed = ref(true);

	function toggle() {
		isCollapsed.value = !isCollapsed.value;
	}

	const navItems = computed(() => [
		{
			icon: isCollapsed.value
				? 'i-lucide-chevron-right'
				: 'i-lucide-chevron-left',
			label: 'Hide',
			onClick: toggle,
		},
		{
			icon: 'i-lucide-home',
			label: 'Dashboard',
			to: '/dashboard',
		},
		{
			icon: 'i-lucide-calendar-days',
			label: 'Calendars',
			to: '/calendars',
		},
		{
			icon: 'i-lucide-settings',
			label: 'Preferences',
			to: '/preferences',
		},
	]);
</script>

<template>
	<div class="flex">
		<div
			class="flex h-screen flex-col border-r pt-3 shadow-sm transition-all"
			:class="isCollapsed ? 'w-15' : 'w-55'"
		>
			<UButton
				v-for="{ label, ...item } in navItems"
				:key="label"
				:label="isCollapsed ? '' : label"
				v-bind="item"
				color="neutral"
				variant="ghost"
				size="xl"
				class="h-10 justify-start gap-x-3 pl-5"
			/>
		</div>
		<div class="h-full w-full">
			<slot />
		</div>
	</div>
</template>
