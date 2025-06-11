<script setup lang="ts"></script>

<template>
	<div class="grid h-dvh w-full grid-cols-5 grid-rows-5">
		<CalendarDate class="col-span-2 col-start-1 row-start-1 border-b" />
		<TodoView class="col-span-2 col-start-1 row-span-4 row-start-2" />
		<CalendarSchedule
			class="col-span-3 col-start-3 row-span-5 row-start-1 border-l"
		/>
	</div>
</template>
