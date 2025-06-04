<script setup lang="ts">
import { DateTime } from 'luxon';

const date = ref(DateTime.now());

const startingHour = 9;
const totalHours = 12;

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

    // will probably move this calculation to be on a table so that everything scales better
    const top = ((startHour - startingHour) / totalHours) * 100;
    // will need to fix the formatting to not be hard coded
    const height = (duration / totalHours) * 100;

    return {
        top: `${top}%`,
        height: `${height}%`,
        width: '50%' // this will be used for stacking
    };
}

function formatTime(datetime) {
    return DateTime
        .fromISO(datetime, { zone: DateTime.local().zoneName })
        .toFormat('h:mma');
}
</script>

<template>
    <div class="h-dvh w-full auto-cols-auto grid grid-cols-2 gap-4 p-5">
        <div class="h-fill">
            <div class="h-1/6 border-b grid grid-cols-2 gap-1 place-items-end">
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
        <div :class="['h-full', 'grid', `grid-rows-${totalHours*2}`, 'grid-cols-1']">
            <div v-for="hour in totalHours" :key="hour" :class="[`row-start-${hour}`, 'row-span-2', 'col-start-1', 'border-b']">
                {{ DateTime.fromFormat(`${String(startingHour + (hour - 1)).padStart(2, '0')}:00`, 'T').toFormat('t') }}
            </div>
            <div class="row-start-1 row-span-2 col-start-1 bg-blue-500 text-white text-sm rounded p-2 shadow">
                <div class="font-semibold truncate">test</div>
                <div class="text-xs truncate">
                    10am - 11am
                </div>
            </div>
        </div>
    </div>
</template>