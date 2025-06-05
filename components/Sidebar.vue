<script setup type="ts">
    const isCollapsed = ref(true)

    const items = ref([
        {
            label: 'Links',
            icon: isCollapsed.value ? 'lucide:chevron-right' : 'lucide:chevron-left',
            onSelect: () => isCollapsed.value = !isCollapsed.value,
        },
        {
            label: 'Guide',
            icon: 'i-lucide-book-open'
        },
        {
            label: 'Composables',
            icon: 'i-lucide-database'
        },
        {
            label: 'Components',
            icon: 'i-lucide-box',
            to: '/components',
            active: true
        }
    ]);
</script>


<template>
    <div 
        :class="[isCollapsed ? 'w-10' : 'w-64']"
        class="flex flex-col h-screen text-white transition-all duration-300">

        <UNavigationMenu :collapsed="isCollapsed" orientation="vertical" :items="items" />
    </div>
</template>
