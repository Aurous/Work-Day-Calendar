<template>
    <div class="h-screen w-1/2 p-4">
        <div class="relative h-full border rounded-lg overflow-hidden">
            <div class="absolute left-0 top-0 w-16 h-full border-r">
                <div v-for="hour in 24" :key="hour" class="h-[calc(100%/24)] border-b text-xs text-right pr-2 py-1">
                    {{ (hour - 1 + 24) % 24 }}:00
                </div>
            </div>
            <div class="ml-16 h-full relative">
                <div v-for="hour in 24" :key="hour" class="h-[calc(100%/24)] border-b"></div>

                <div 
                    v-for="event in events" 
                    :key="event.id" 
                    class="absolute left-0 w-full px-2"
                    :style="getEventStyle(event)"
                >
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
</template>

<script setup>
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
        id: 4,
        title: 'X Break',
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
    const date = new Date(datetime);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
</script>

<style scoped></style>