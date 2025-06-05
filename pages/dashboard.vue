<script setup lang="ts">
import { DateTime, Interval } from 'luxon';

const date = ref(DateTime.now());

// this will change to a fetch
const eventsFetched = [
    {
        id: 1,
        title: 'Meeting with Team',
        startDT: '2025-06-03T09:30:00',
        endDT: '2025-06-03T10:30:00'
    },
    {
        id: 4,
        title: 'Test',
        startDT: '2025-06-03T10:30:00',
        endDT: '2025-06-03T13:30:00'
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

// inject luxon into events
const events = eventsFetched.map(event => {
    const { startDT, endDT } = event;

    const start = DateTime.fromISO(startDT, { zone: DateTime.local().zoneName });
    const end = DateTime.fromISO(endDT, { zone: DateTime.local().zoneName });
    const interval = Interval.fromDateTimes(start, end);

    return {
        ...event,
        start,
        end,
        interval
    }
});

const { assigned } = events
    // map events into array of start and end times
    .flatMap(event => {
        const { start, end } = event.interval;
        return [
            { time: start, type: 'start', event },
            { time: end, type: 'end', event }
        ];
    })
    // sort based on time or type
    .sort((a, b) => a.time - b.time || (a.type === 'end' ? -1 : 1))
    // calculate which times overlap
    .reduce(
        (state, { type, event: { id } }) => {
            const { assigned, used, active } = state;

            if (type === 'start') {
                let column = 1;
                while (used.has(column)) column++;
                assigned.set(id, column);
                active.set(id, column);
                used.add(column);
            } else {
                used.delete(active.get(id));
                active.delete(id);
            }

            return state;
        },
        {
            assigned: new Map(),
            used: new Set(),
            active: new Map()
        }
    );

// Add column info to events
let maxColumnWidth = 1;

// attach column onto event
const eventsWithColumns = events.map(({ id, ...event}) => {
    const column = assigned.get(id);
    if (column > maxColumnWidth) maxColumnWidth = column;
 
    return {
        id,
        ...event,
        column
    }
});

// TODO: move these to environment/settings
const startingHour = 7;
const totalHours = 14;
const splitPeriod = 4;
const totalTime = totalHours * splitPeriod;
const totalColumnWidth = (maxColumnWidth * 2) + 2;

function getEventStyle(event) {
    const { startDT, endDT, column } = event;

    const start = DateTime.fromISO(startDT, { zone: DateTime.local().zoneName });
    const end = DateTime.fromISO(endDT, { zone: DateTime.local().zoneName });

    const [hours, minutes] = start.toFormat('H:m').split(':');
    const startHour = ((totalTime * ((((parseInt(hours) * 60) + parseInt(minutes)) / 60) - startingHour)) / totalHours) + 1

    const duration = end.diff(start, ['hour']).toObject().hours * splitPeriod;

    return {
        gridColumnStart: column * 2,
        gridRow: `${startHour} / span ${duration}`
    }
}
</script>

<template>
    <div class="h-dvh w-full grid grid-cols-2 gap-2">
        <div class="h-fill">
            <div class="h-1/6 border-b grid grid-cols-2 gap-1 place-items-end">
                <div class="row-span-2 h-fill w-fill text-8xl self-center">
                    {{ date.toFormat('dd') }}
                </div>
                <div class="place-self-start self-end-safe h-fill w-fill text-5xl ">
                    {{ date.toFormat('cccc') }}
                </div>
                <div class="place-self-start h-fill w-fill text-xl">
                    {{ date.toFormat('LLLL yyyy') }}
                </div>
            </div>
            <div class="h-5/6">
                to do list
            </div>
        </div>
        <div class="h-full grid grid-cols-1">
            <div class="col-start-1 row-start-1">
                <div 
                    class="h-full grid" 
                    :style="{ 
                        gridTemplateRows: `repeat(${totalTime}, minmax(0, .25fr))` 
                    }"
                >
                    <div 
                        v-for="hour in totalHours" 
                        :key="hour" 
                        class="border-t flex place-items-center" 
                        :style="{
                            gridRow: `span ${splitPeriod}`
                        }"
                    >
                        <div class="self-start">
                            {{ DateTime.fromFormat(`${String(startingHour + (hour - 1)).padStart(2, '0')}:00`, 'T').toFormat('t') }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-start-1 row-start-1">
                <div 
                    class="h-full grid" 
                    :style="{
                        gridTemplateRows: `repeat(${totalTime}, minmax(0, .25fr))`,
                        gridTemplateColumns: `repeat(${totalColumnWidth}, minmax(0, 1fr))`
                    }"
                >
                    <div 
                        v-for="event in eventsWithColumns" 
                        :key="event.id"
                        class="bg-blue-500 text-white text-sm col-span-2 border" 
                        :style="getEventStyle(event)"
                    >
                        <div class="font-semibold truncate">{{ event.title }}</div>
                        <div class="text-xs truncate">
                            {{ event.start.toFormat('h:mma') }} - {{ event.end.toFormat('h:mma') }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>