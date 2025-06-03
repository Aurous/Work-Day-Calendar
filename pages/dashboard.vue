<script setup lang="ts">
    import { DateTime } from 'luxon';

    const date = ref(DateTime.now());

    const events = [
        {
            id: 1,
            title: 'Meeting with Team',
            start: '2025-06-03T09:30:00',
            end: '2025-06-03T10:30:00'
        },
        {
            id: 2,
            title: 'Lunch Break',
            start: '2025-06-03T12:00:00',
            end: '2025-06-03T13:00:00'
        },
        {
            id: 3,
            title: 'Design Review',
            start: '2025-06-03T15:15:00',
            end: '2025-06-03T16:00:00'
        }
    ];

    function getEventStyle(event) {
        const start = new Date(event.start);
        const end = new Date(event.end);

        const startHour = start.getHours() + start.getMinutes() / 60;
        const endHour = end.getHours() + end.getMinutes() / 60;
        const duration = endHour - startHour;

        const top = (startHour / 24) * 100;
        const height = (duration / 24) * 100;

        return {
            top: `${top}%`,
            height: `${height}%`
        };
    }

    function formatTime(datetime) {
        return DateTime.fromISO(datetime);
    }
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
        <div class="relative h-full overflow-hidden">
            <div class="absolute left-0 top-0 w-16 h-full border-r">
                <div v-for="hour in 24" :key="hour" class="h-[calc(100%/24)] border-b bg-white text-black text-xs text-right pr-2 py-1">
                    {{ (hour - 1 + 24) % 24 }}:00
                </div>
            </div>
            <div class="ml-16 h-full relative">
                <div v-for="hour in 24" :key="hour" class="h-[calc(100%/24)] border-b bg-white" />
                <div 
                    v-for="event in events" 
                    :key="event.id" 
                    class="absolute left-0 w-full px-2"
                    :style="getEventStyle(event)
                ">
                    <div class="bg-blue-500 text-white text-sm rounded p-2 shadow">
                        <div class="font-semibold">{{ event.title }}</div>
                        <div class="text-xs">
                            {{ formatTime(event.start).toFormat('h:mma') }} - {{ formatTime(event.end).toFormat('hh:mma') }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>