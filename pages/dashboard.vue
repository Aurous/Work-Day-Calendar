<script setup lang="ts">
import { CalendarDate } from '@internationalized/date'

const value = ref(new CalendarDate(2022, 2, 9));
</script>

<template>
    <UCard>
        <template #header>
            <USkeleton class="h-8 w-[250px]" />
        </template>

        <template #default>
            <UContainer class="grid grid-cols-3 gap-4">

                <UCalendar v-model="value" />
                <UCalendar v-model="value" />
            </UContainer>
        </template>

        <template #footer>
            <USkeleton class="h-8 w-[250px]" />
        </template>
    </UCard>
</template>