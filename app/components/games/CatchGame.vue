<template>
  <div>
    <h5 class="font-semibold mb-4 flex items-center gap-2">
      <span>⚡</span>
      {{ title }}
    </h5>

    <div class="mb-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg flex justify-between items-center">
      <div>
        <p class="text-sm">Gefangen: {{ score }} / {{ target }}</p>
        <p class="text-xs mt-1">Zeit: {{ timeLeft }}s</p>
      </div>
      <div class="text-3xl">🐱</div>
    </div>

    <!-- Game area -->
    <div
      v-if="gameStarted && !gameOver"
      class="relative bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-950/40 dark:to-blue-900/40 rounded-lg overflow-hidden"
      style="height: 400px"
    >
      <button
        v-for="flake in snowflakes"
        :key="flake.id"
        @click="catchSnowflake(flake.id)"
        class="absolute text-4xl transition-none cursor-pointer hover:scale-125"
        :style="{
          left: flake.x + '%',
          top: flake.y + '%'
        }"
      >
        {{ emoji }}
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
        🎉 Gewonnen! Du hast {{ score }} Schneeflocken gefangen!
      </p>
    </div>

    <div v-if="gameOver && score < target" class="mt-4 p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
      <p class="text-yellow-700 dark:text-yellow-400 font-semibold text-center">
        Fast geschafft! Du hast {{ score }} von {{ target }} Schneeflocken gefangen!
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
interface Snowflake {
  id: number
  x: number
  y: number
}

const props = defineProps<{
  title: string
  emoji: string
  duration: number
  target: number
}>()

const score = ref(0)
const timeLeft = ref(0)
const gameStarted = ref(false)
const gameOver = ref(false)
const snowflakes = ref<Snowflake[]>([])
let gameInterval: ReturnType<typeof setInterval> | null = null
let spawnInterval: ReturnType<typeof setInterval> | null = null

const startGame = () => {
  score.value = 0
  timeLeft.value = props.duration
  gameStarted.value = true
  gameOver.value = false
  snowflakes.value = []

  // Timer
  gameInterval = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      endGame()
    }
  }, 1000)

  // Spawn snowflakes
  spawnInterval = setInterval(() => {
    spawnSnowflake()
  }, 800)
}

const spawnSnowflake = () => {
  const id = Date.now() + Math.random()
  snowflakes.value.push({
    id,
    x: Math.random() * 90,
    y: Math.random() * 90
  })

  // Remove after 2 seconds
  setTimeout(() => {
    snowflakes.value = snowflakes.value.filter(f => f.id !== id)
  }, 2000)
}

const catchSnowflake = (id: number) => {
  snowflakes.value = snowflakes.value.filter(f => f.id !== id)
  score.value++
}

const endGame = () => {
  if (gameInterval) clearInterval(gameInterval)
  if (spawnInterval) clearInterval(spawnInterval)
  gameStarted.value = false
  gameOver.value = true
  snowflakes.value = []
}

// Cleanup on unmount
onUnmounted(() => {
  if (gameInterval) clearInterval(gameInterval)
  if (spawnInterval) clearInterval(spawnInterval)
})
</script>
