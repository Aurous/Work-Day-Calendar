<script setup lang="ts"></script>

<template>
	<div
		class="grid h-dvh w-full grid-cols-1 grid-rows-[auto_1fr_auto] gap-2 p-2 md:grid-cols-5 md:grid-rows-5"
	>
		<CalendarDate class="md:col-span-2 md:col-start-1 md:row-start-1" />
		<TodoView
			class="md:col-span-2 md:col-start-1 md:row-span-4 md:row-start-2"
		/>
		<CalendarSchedule
			class="border-t md:col-span-3 md:col-start-3 md:row-span-5 md:row-start-1 md:border-t-0 md:border-l"
		/>
	</div>
</template>
