<script setup lang="ts">
    import { DateTime } from 'luxon';
    import { parseDate } from '@internationalized/date'

    const date = ref(DateTime.now());

const calendarDate = ref(parseDate(DateTime.now().toFormat('yyyy-LL-dd')));
</script>

<template>
    <div class="h-dvh w-full grid grid-cols-3 gap-4">
        <div class="col-span-2">
            <div class="h-fill w-full grid grid-cols-2 gap-4">
                <h3 class="col-span-2 bg-white text-black text-center">{{ date }}</h3>
                    <div class="col-span-1 ">
                        to do list
                    </div>
                    <div class="col-span-1">
                        <UCalendar v-model="calendarDate" />
                    </div>
            </div>
        </div>
        <div class="col-span-1">
            <div>
                day view
            </div>
        </div>
    </div>
</template>