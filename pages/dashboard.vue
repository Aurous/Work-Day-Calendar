<script setup lang="ts">
import { DateTime } from 'luxon';

const date = ref(DateTime.now());

const startingHour = 9;
const totalHours = 12;
const totalTime = totalHours * 4;

const events = [
    {
        id: 1,
        title: 'Meeting with Team',
        startDT: '2025-06-03T09:30:00',
        endDT: '2025-06-03T10:30:00'
    },
    {
        id: 2,
        title: 'Lunch Break',
        startDT: '2025-06-03T12:00:00',
        endDT: '2025-06-03T13:00:00'
    },
    {
        id: 3,
        title: 'Design Review',
        startDT: '2025-06-03T15:15:00',
        endDT: '2025-06-03T16:00:00'
    }
];

function getEventClass(event) {
    const { startDT, endDT } = event;

    const start = DateTime.fromISO(startDT, { zone: DateTime.local().zoneName });
    const end = DateTime.fromISO(endDT, { zone: DateTime.local().zoneName });

    const [hours, minutes] = start.toFormat('H:m').split(':');
    console.log([hours, minutes])
    const startHour = ((parseInt(hours) / 24) + (parseInt(minutes / 60))) * totalTime;
    console.log(startHour)

    const diff = end.diff(start, ['hour']).toObject();
    const duration = diff.hours * 4;

    return [
        'col-start-1',
        `row-start-${startHour}`,
        `row-span-${duration}`
    ];
}

function formatTime(datetime) {
    return DateTime
        .fromISO(datetime, { zone: DateTime.local().zoneName })
        .toFormat('h:mma');
}
</script>

<template>
    <div class="h-dvh w-full grid grid-cols-2 gap-2">
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
        <div class="grid grid-cols-1">
            <div class="col-start-1 row-start-1">
                <div :class="['h-full', 'grid', `grid-rows-${totalHours}`, 'grid-cols-1']">
                    <div v-for="hour in totalHours" :key="hour" class="border-t flex place-items-center">
                        <div class="self-start">
                            {{ DateTime.fromFormat(`${String(startingHour + (hour - 1)).padStart(2, '0')}:00`, 'T').toFormat('t') }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-start-1 row-start-1">
                <div :class="['h-full', 'grid', `grid-rows-${totalTime}`, 'grid-cols-1']">
                    <div v-for="event in events" :key="event.id" :class="getEventClass(event)">
                        <div class="bg-blue-500 text-white text-sm p-1 w-3/4 place-self-end">
                            <div class="font-semibold truncate">{{ event.title }}</div>
                            <div class="text-xs truncate">
                                {{ formatTime(event.startDT) }} - {{ formatTime(event.endDT) }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>