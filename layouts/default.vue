<script setup lang="ts">
import { ref } from 'vue'

const isCollapsed = ref(false)

function toggle() {
    isCollapsed.value = !isCollapsed.value;
}

const navItems = computed(() => [
    {
        icon: isCollapsed.value ? 'i-lucide-chevron-right' : 'i-lucide-chevron-left',
        onClick: toggle
    },
    { 
        icon: 'i-lucide-home', 
        label: 'Dashboard', 
        to: '/dashboard' 
    },
    { 
        icon: 'i-lucide-calendar-days', 
        label: 'Calendars', 
        to: '/calendars' 
    },  
    { 
        icon: 'i-lucide-settings', 
        label: 'Preferences', 
        to: '/preferences' 
    }
]);

</script>

<template>
    <div class="flex">
        <div 
            class="flex flex-col p-2 h-screen transition-all border-r shadow-sm"
            :class="isCollapsed ? 'w-12' : 'w-40'"
        >
            <UButton 
                v-for="item in navItems" 
                :key="item.to" 
                v-bind="item"
                color="neutral"
            />
        </div>
        <slot />
    </div>
</template>
