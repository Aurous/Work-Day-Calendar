<script setup lang="ts">
import { ref } from 'vue'

const isCollapsed = ref(false)

function toggle() {
    isCollapsed.value = !isCollapsed.value;
}

const navItems = computed(() => [
    {
        icon: isCollapsed.value ? 'i-lucide-chevron-right' : 'i-lucide-chevron-left',
        label: 'Hide',
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
            class="flex flex-col h-screen transition-all border-r shadow-sm pt-3"
            :class="isCollapsed ? 'w-14' : 'w-40'"
        >
            <UButton 
                v-for="{ label, ...item } in navItems" 
                :key="label" 
                :label="isCollapsed ? '' : label"
                v-bind="item"
                :square="!isCollapsed"
                color="neutral"
                variant="ghost"
                class="h-8 flex items-center justify-center"
            />
        </div>
        <slot />
    </div>
</template>
