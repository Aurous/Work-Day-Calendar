<script setup lang="ts">
	import type { FormSubmitEvent } from '@nuxt/ui';
	import * as z from 'zod';

	const schema = z.object({
		title: z.string(),
		priority: z.string(),
	});

	type Schema = z.output<typeof schema>;

	const state = reactive<Partial<Schema>>({
		title: undefined,
		priority: undefined,
	});

	const toast = useToast();
	async function onSubmit(event: FormSubmitEvent<Schema>) {
		console.log(event.data);
	}
</script>

<template>
	<UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
		<UFormField label="Title" name="title">
			<UInput v-model="state.title" />
		</UFormField>

		<UFormField label="Priority" name="priority">
			<UInput v-model="state.priority" />
		</UFormField>

		<UButton type="submit">Save</UButton>
	</UForm>
</template>
