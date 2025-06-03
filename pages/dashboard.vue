<script setup lang="ts">
    import { DateTime } from 'luxon';
    // import { parseDate } from '@internationalized/date'

    const date = ref(DateTime.now());

    // const calendarDate = ref(parseDate(DateTime.now().toFormat('yyyy-LL-dd')));
</script>

<template>
    <div class="h-dvh w-full auto-cols-auto grid grid-cols-2 gap-4">
        <div class="h-fill">
            <div class="h-1/6 bg-white text-black grid grid-cols-2 gap-1 place-items-end">
                <div class="row-span-2 h-fill w-fill text-9xl self-center">
                    {{ date.toFormat('LL') }}
                </div>
                <div class="place-self-start self-end-safe h-fill w-fill text-6xl ">
                    {{ date.toFormat('cccc') }}
                </div>
                <div class="place-self-start h-fill w-fill text-2xl">
                    {{ date.toFormat('LLLL yyyy') }}
                </div>
            </div>
            <div class="h-5/6">
                to do list
            </div>
        </div>
        <div class="h-fill">
            <div class="relative h-full border rounded-lg overflow-hidden">
                <div class="absolute left-0 top-0 w-16 h-full border-r">
                    <div v-for="hour in 24" :key="hour" class="h-[calc(100%/24)] border-b text-xs text-right pr-2 py-1">
                        {{ (hour - 1 + 24) % 24 }}:00
                    </div>
                </div>
                <div class="ml-16 h-full relative">
                    <div v-for="hour in 24" :key="hour" class="h-[calc(100%/24)] border-b"></div>

                    <div v-for="event in events" :key="event.id" class="absolute left-0 w-full px-2"
                        :style="getEventStyle(event)">
                        <div class="bg-blue-500 text-white text-sm rounded p-2 shadow">
                            <div class="font-semibold">{{ event.title }}</div>
                            <div class="text-xs">
                                {{ formatTime(event.start) }} - {{ formatTime(event.end) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>