<script setup lang="ts">
function getOverlappingEvents(events) {
    // Convert to a list of timestamp markers
    const points = [];

    for (const event of events) {
        points.push({ time: new Date(event.startDT).getTime(), type: 'start', event });
        points.push({ time: new Date(event.endDT).getTime(), type: 'end', event });
    }

    // Sort all timestamps chronologically; end before start on ties
    points.sort((a, b) => {
        if (a.time === b.time) {
            return a.type === 'end' ? -1 : 1;
        }
        return a.time - b.time;
    });

    let maxOverlap = 0;
    let currentOverlap = 0;
    const overlappingWindows = [];
    let currentWindowStart = null;

    for (const point of points) {
        if (point.type === 'start') {
            currentOverlap++;
            if (currentOverlap > maxOverlap) maxOverlap = currentOverlap;

            if (currentOverlap > 1 && currentWindowStart === null) currentWindowStart = point.time;
        } else {
            if (currentOverlap > 1 && currentWindowStart !== null) {
                overlappingWindows.push({
                    start: new Date(currentWindowStart),
                    end: new Date(point.time),
                });
                currentWindowStart = null;
            }
            currentOverlap--;
        }
    }

    return {
        maxOverlap,
        overlappingWindows
    };
}

const result = getOverlappingEvents(events);
console.log('Maximum overlapping events:', result.maxOverlap);
console.log('Overlapping time windows:', result.overlappingWindows);
</script>

<template>
    <div>asdf</div>
</template>