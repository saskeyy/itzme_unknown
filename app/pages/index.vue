<template>
  <div class="min-h-screen bg-gradient-to-b from-red-50 via-white to-green-50 dark:from-red-950/20 dark:via-gray-900 dark:to-green-950/20">
    <!-- Header -->
    <div class="container mx-auto px-4 py-8">
      <div class="text-center mb-8">
        <h1 class="text-5xl font-bold mb-4 bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent">
          🎄 Katzen-Adventskalender 🐱
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 mb-6">
          24 Türchen voller Überraschungen, Spiele, Rezepte und schöner Worte
        </p>

        <!-- Test Mode Toggle -->
        <!--
        <div class="flex items-center justify-center gap-3 mb-4">
          <UButton
            :color="testMode ? 'primary' : 'neutral'"
            :variant="testMode ? 'solid' : 'outline'"
            @click="testMode = !testMode"
            size="sm"
          >
            {{ testMode ? '🔓 Test-Modus: An' : '🔒 Test-Modus: Aus' }}
          </UButton>
          <span class="text-xs text-gray-600 dark:text-gray-400">
            (zum Testen aller Türchen)
          </span>
        </div>
        -->
        <!-- Stats -->
        <div class="flex items-center justify-center gap-6 text-sm">
          <div class="flex items-center gap-2">
            <span class="text-2xl">🎁</span>
            <span>{{ openedDoorsCount }} von 24 Türchen geöffnet</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-2xl">📅</span>
            <span>{{ currentDay }}. Dezember</span>
          </div>
        </div>
      </div>

      <!-- Advent Calendar Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
        <AdventDoor
          v-for="door in shuffledDoors"
          :key="door.day"
          :door="door"
          :test-mode="testMode"
          @open="openDoor"
        />
      </div>

      <!-- Snow Animation -->
      <div class="snow-container">
        <div v-for="i in 50" :key="i" class="snowflake" :style="getSnowflakeStyle(i)">
          ❄️
        </div>
      </div>
    </div>

    <!-- Door Content Modal -->
    <DoorContent
      v-model="showContent"
      :door="selectedDoor"
    />
  </div>
</template>

<script setup lang="ts">
import { adventDoors } from '~/data/adventCalendar'
import type { AdventDoor } from '~/data/adventCalendar'

useHead({
  title: 'Katzen-Adventskalender',
  meta: [
    { name: 'description', content: 'Ein weihnachtlicher Adventskalender mit Spielen, Rätseln, veganen Rezepten und schönen Worten - und natürlich mit Katzen!' }
  ]
})

const testMode = ref(false)
const showContent = ref(false)
const selectedDoor = ref<AdventDoor | null>(null)

// Shuffle doors randomly
const shuffledDoors = computed(() => {
  const doors = [...adventDoors]
  // Fisher-Yates shuffle algorithm
  for (let i = doors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = doors[i]
    if (temp !== undefined && doors[j] !== undefined) {
      doors[i] = doors[j]
      doors[j] = temp
    }
  }
  return doors
})

const currentDay = computed(() => {
  const today = new Date()
  return today.getDate()
})

const openedDoorsCount = computed(() => {
  if (import.meta.client) {
    const openDoors = JSON.parse(localStorage.getItem('openDoors') || '[]')
    return openDoors.length
  }
  return 0
})

const openDoor = (door: AdventDoor) => {
  selectedDoor.value = door
  showContent.value = true
}

const getSnowflakeStyle = (index: number) => {
  const delay = Math.random() * 10
  const duration = 10 + Math.random() * 20
  const left = Math.random() * 100
  const size = 0.5 + Math.random() * 1

  return {
    left: `${left}%`,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    fontSize: `${size}rem`,
    opacity: 0.3 + Math.random() * 0.7
  }
}
</script>

<style scoped>
.snow-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.snowflake {
  position: absolute;
  top: -10%;
  animation: fall linear infinite;
}

@keyframes fall {
  to {
    transform: translateY(100vh) rotate(360deg);
  }
}
</style>
