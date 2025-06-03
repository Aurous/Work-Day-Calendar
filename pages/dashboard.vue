<script setup lang="ts">
    import { DateTime } from 'luxon';
    // import { parseDate } from '@internationalized/date'

    const date = ref(DateTime.now());

    // const calendarDate = ref(parseDate(DateTime.now().toFormat('yyyy-LL-dd')));
</script>

<template>
    <div class="h-dvh w-full auto-cols-auto grid grid-cols-2 gap-4">
        <div class="h-fill">
            <div class="h-1/6 bg-white text-black text-center">
                <h1>{{ date.toFormat('yyyy-LL-dd') }}</h1>
            </div>
            <div class="h-5/6">
                to do list
            </div>
        </div>
        <div class="h-fill">
            day view
        </div>
    </div>
</template>