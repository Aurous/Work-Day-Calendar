<script setup lang="ts">
	import { DateTime } from 'luxon';

	const date = ref(DateTime.now());
</script>

<template>
	<div class="w-fill">
		<div
			class="flex place-content-center gap-1 pt-4 sm:scale-50 md:scale-60 lg:scale-80 xl:scale-90 2xl:scale-100"
		>
			<div class="text-9xl">
				{{ date.toFormat('dd') }}
			</div>
			<div class="flex flex-col gap-1 pt-4">
				<div class="text-6xl">{{ date.toFormat('cccc') }}</div>
				<div class="text-3xl">
					{{ date.toFormat('LLLL yyyy') }}
				</div>
			</div>
		</div>
	</div>
</template>
