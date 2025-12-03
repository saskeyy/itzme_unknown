<template>
  <div>
    <h5 class="font-semibold mb-4 flex items-center gap-2">
      <span>🐱</span>
      {{ title }}
    </h5>

    <div class="mb-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg flex justify-between items-center">
      <div>
        <p class="text-sm">Gefangene Mäuse: {{ score }} / {{ target }}</p>
        <p class="text-xs mt-1">Zeit: {{ timeLeft }}s</p>
      </div>
      <div class="text-3xl">🐱</div>
    </div>

    <!-- Game area -->
    <div
      v-if="gameStarted && !gameOver"
      class="grid grid-cols-3 gap-4 p-4 bg-gradient-to-br from-green-100 to-green-200 dark:from-green-950/40 dark:to-green-900/40 rounded-lg"
    >
      <button
        v-for="hole in holes"
        :key="hole.id"
        @click="whackMouse(hole.id)"
        class="aspect-square rounded-lg flex items-center justify-center text-6xl transition-all relative"
        :class="{
          'bg-amber-700 dark:bg-amber-900': true,
          'hover:bg-amber-600 dark:hover:bg-amber-800': hole.hasMouse
        }"
      >
        <span v-if="hole.hasMouse" class="animate-bounce">🐭</span>
        <span v-else class="text-4xl opacity-50">🕳️</span>
      </button>
    </div>

    <!-- Start button -->
    <div v-if="!gameStarted" class="mb-4">
      <UButton
        block
        color="primary"
        @click="startGame"
      >
        Spiel starten
      </UButton>
    </div>

    <!-- Game over messages -->
    <div v-if="gameOver && score >= target" class="mt-4 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
      <p class="text-green-700 dark:text-green-400 font-semibold text-center">
        🎉 Perfekt! Du hast {{ score }} Mäuse gefangen!
      </p>
    </div>

    <div v-if="gameOver && score < target" class="mt-4 p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
      <p class="text-yellow-700 dark:text-yellow-400 font-semibold text-center">
        Gut gemacht! Du hast {{ score }} von {{ target }} Mäusen gefangen!
      </p>
      <UButton
        block
        color="primary"
        @click="startGame"
        class="mt-2"
      >
        Nochmal versuchen
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Hole {
  id: number
  hasMouse: boolean
}

const props = defineProps<{
  title: string
  duration: number
  target: number
}>()

const score = ref(0)
const timeLeft = ref(0)
const gameStarted = ref(false)
const gameOver = ref(false)
const holes = ref<Hole[]>([])
let gameInterval: ReturnType<typeof setInterval> | null = null
let mouseInterval: ReturnType<typeof setInterval> | null = null

const initHoles = () => {
  holes.value = Array.from({ length: 9 }, (_, i) => ({
    id: i,
    hasMouse: false
  }))
}

const startGame = () => {
  score.value = 0
  timeLeft.value = props.duration
  gameStarted.value = true
  gameOver.value = false
  initHoles()

  // Timer
  gameInterval = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      endGame()
    }
  }, 1000)

  // Spawn mice
  mouseInterval = setInterval(() => {
    spawnMouse()
  }, 800)
}

const spawnMouse = () => {
  // Remove all current mice
  holes.value.forEach(hole => {
    hole.hasMouse = false
  })

  // Spawn 1-2 mice randomly
  const numMice = Math.random() > 0.6 ? 2 : 1
  const availableHoles = [...holes.value]

  for (let i = 0; i < numMice && availableHoles.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * availableHoles.length)
    const hole = availableHoles[randomIndex]
    if (hole) {
      hole.hasMouse = true
      availableHoles.splice(randomIndex, 1)
    }
  }
}

const whackMouse = (holeId: number) => {
  const hole = holes.value.find(h => h.id === holeId)
  if (hole?.hasMouse) {
    hole.hasMouse = false
    score.value++
  }
}

const endGame = () => {
  if (gameInterval) clearInterval(gameInterval)
  if (mouseInterval) clearInterval(mouseInterval)
  gameStarted.value = false
  gameOver.value = true
  holes.value = []
}

// Cleanup on unmount
onUnmounted(() => {
  if (gameInterval) clearInterval(gameInterval)
  if (mouseInterval) clearInterval(mouseInterval)
})

// Initialize holes
onMounted(() => {
  initHoles()
})
</script>
