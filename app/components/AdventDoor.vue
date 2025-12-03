<template>
  <div
    class="advent-door relative cursor-pointer transition-all duration-300 hover:scale-105"
    :class="{
      'opacity-50': !canOpen && !testMode,
      'animate-pulse': canOpen && !isOpen
    }"
    @click="handleClick"
  >
    <div
      class="h-full rounded-lg shadow-sm !bg-gradient-to-br"
      :class="isOpen ? '!from-red-500/20 !to-green-500/20' : '!from-red-600 !to-green-600'"
    >
      <div class="flex flex-col items-center justify-center h-full min-h-[120px] relative p-4 sm:p-6">
        <div v-if="!isOpen" class="text-center">
          <div class="text-5xl mb-2">{{ door.catEmoji }}</div>
          <div class="text-3xl font-bold text-white drop-shadow-lg">{{ door.day }}</div>
          <div v-if="!canOpen && !testMode" class="text-xs text-white/90 mt-2 drop-shadow">
            🔒 Noch verschlossen
          </div>
        </div>

        <div v-else class="text-center w-full">
          <div class="text-4xl mb-2">{{ door.catEmoji }}</div>
          <div class="text-sm font-semibold text-gray-900 dark:text-white">
            {{ door.title }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { AdventDoor } from '~/data/adventCalendar'

const props = defineProps<{
  door: AdventDoor
  testMode?: boolean
}>()

const emit = defineEmits<{
  open: [door: AdventDoor]
}>()

const isOpen = ref(false)

const canOpen = computed(() => {
  if (props.testMode) return true

  const today = new Date()
  const currentDay = today.getDate()
  const currentMonth = today.getMonth() + 1 // December is 12

  // Only allow opening in December and if the day has arrived
  return currentMonth === 12 && props.door.day <= currentDay
})

const handleClick = () => {
  if (!canOpen.value && !props.testMode) {
    return
  }

  if (!isOpen.value) {
    isOpen.value = true
  }

  // Always emit open event, even for already opened doors
  emit('open', props.door)
}

// Check if door should be open from localStorage
onMounted(() => {
  const openDoors = JSON.parse(localStorage.getItem('openDoors') || '[]')
  isOpen.value = openDoors.includes(props.door.day)
})

watch(isOpen, (newVal) => {
  if (newVal) {
    const openDoors = JSON.parse(localStorage.getItem('openDoors') || '[]')
    if (!openDoors.includes(props.door.day)) {
      openDoors.push(props.door.day)
      localStorage.setItem('openDoors', JSON.stringify(openDoors))
    }
  }
})
</script>

<style scoped>
.advent-door {
  perspective: 1000px;
}
</style>
