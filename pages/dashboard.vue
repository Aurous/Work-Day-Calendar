<script setup lang="ts">
    import { DateTime } from 'luxon';
    import { parseDate } from '@internationalized/date'

    const date = ref(DateTime.now());

const calendarDate = ref(parseDate(DateTime.now().toFormat('yyyy-LL-dd')));
</script>

<template>
    <div class="h-dvh w-full grid grid-cols-3 grid-rows-12 gap-4">
        <div class="row-span-12 col-span-2">
            <h3 class="bg-white text-black text-center">{{ date }}</h3>
        </div>
        <div class="row-span-12">
            day view
        </div>
        <div class="col-span-2 grid grid-cols-2 gap-4">
            <div class="">
                to do list
            </div>
            <div class="">
                <UCalendar v-model="calendarDate" />
            </div>
        </div>
    </div>
</template>