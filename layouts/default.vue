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
			label: 'Home',
			to: '/',
		},
		{
			icon: 'i-lucide-layout-dashboard',
			label: 'Dashboard',
			to: '/dashboard',
		},
		{
			icon: 'i-lucide-calendar-days',
			label: 'Calendars',
			to: '/calendars',
		},
		{
			icon: 'i-lucide-circle-check-big',
			label: 'Tasks',
			to: '/tasks',
		},
		{
			icon: 'i-lucide-cog',
			label: 'Preferences',
			to: '/preferences',
		},
	]);
</script>

<template>
	<div class="flex">
		<div
			class="flex h-screen flex-col border-r pt-3 shadow-sm transition-all"
			:class="isCollapsed ? 'w-15' : 'w-45'"
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
		<div class="h-dvh w-full">
			<slot />
		</div>
	</div>
</template>
