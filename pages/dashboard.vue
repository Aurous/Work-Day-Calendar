<script setup lang="ts">
import { DateTime } from 'luxon';

const date = ref(DateTime.now());

const startingHour = 9;
const totalHours = 12;
const totalTime = totalHours * 4;

const test = [
    'row-span-0',
    'row-span-1',
    'row-span-2',
    'row-span-3',
    'row-span-4'
]

const houring = [
    'row-start-0',
    'row-start-1',
    'row-start-2',
    'row-start-3',
    'row-start-4',
    'row-start-5',
    'row-start-6',
    'row-start-7',
    'row-start-8',
    'row-start-9',
    'row-start-10',
    'row-start-11',
    'row-start-12',
    'row-start-13',
    'row-start-14',
    'row-start-15',
    'row-start-16',
    'row-start-17',
    'row-start-18',
    'row-start-19',
    'row-start-20',
    'row-start-21',
    'row-start-22',
    'row-start-23',
    'row-start-24',
    'row-start-25',
    'row-start-26',
    'row-start-27',
    'row-start-28',
    'row-start-29',
    'row-start-30',
    'row-start-31',
    'row-start-32',
    'row-start-33',
    'row-start-34',
    'row-start-35',
    'row-start-36',
    'row-start-37',
    'row-start-38',
    'row-start-39',
    'row-start-40',
    'row-start-41',
    'row-start-42',
    'row-start-43',
    'row-start-44',
    'row-start-45',
    'row-start-46',
    'row-start-47',
    'row-start-48',
]

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
    console.log([hours, minutes]);
    const startHour = ((totalTime * ((((parseInt(hours) * 60) + parseInt(minutes)) / 60) - startingHour)) / totalHours) + 1
    console.log(startHour);

    const diff = end.diff(start, ['hour']).toObject();
    const duration = diff.hours * 4;

    return [
        'bg-blue-500', 
        'text-white',
        'text-sm',  
        'w-3/4',
        'col-start-1',
        houring[startHour],
        test[duration]
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
                        <div class="font-semibold truncate">{{ event.title }}</div>
                        <div class="text-xs truncate">
                            {{ formatTime(event.startDT) }} - {{ formatTime(event.endDT) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>