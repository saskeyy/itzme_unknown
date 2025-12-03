<template>
  <div>
    <h5 class="font-semibold mb-4 flex items-center gap-2">
      <span>🧠</span>
      {{ title }}
    </h5>

    <div class="mb-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
      <p class="text-sm">Merke dir die Reihenfolge und wiederhole sie!</p>
      <p class="text-xs mt-1">Level: {{ level }}</p>
    </div>

    <!-- Display sequence -->
    <div class="grid grid-cols-3 gap-4 mb-6">
      <button
        v-for="(emoji, idx) in emojis"
        :key="idx"
        @click="playerInput(idx)"
        :disabled="showingSequence || gameOver"
        class="aspect-square rounded-lg flex items-center justify-center text-6xl transition-all"
        :class="{
          'bg-gradient-to-br from-red-600 to-green-600 hover:scale-105': !showingSequence && !gameOver,
          'bg-yellow-400 dark:bg-yellow-600 scale-110': activeButton === idx,
          'opacity-50 cursor-not-allowed': showingSequence || gameOver
        }"
      >
        {{ emoji }}
      </button>
    </div>

    <!-- Start/Restart button -->
    <div v-if="!started || gameOver" class="mb-4">
      <UButton
        block
        color="primary"
        @click="startGame"
      >
        {{ gameOver ? 'Nochmal versuchen' : 'Spiel starten' }}
      </UButton>
    </div>

    <!-- Game over message -->
    <div v-if="gameOver" class="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
      <p class="text-red-700 dark:text-red-400 font-semibold text-center">
        😿 Game Over! Du hast Level {{ level - 1 }} erreicht!
      </p>
    </div>

    <!-- Success message -->
    <div v-if="level > 5 && !gameOver" class="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
      <p class="text-green-700 dark:text-green-400 font-semibold text-center">
        🎉 Fantastisch! Du bist Level {{ level }}!
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
  emojis: string[]
}>()

const sequence = ref<number[]>([])
const playerSequence = ref<number[]>([])
const level = ref(1)
const showingSequence = ref(false)
const gameOver = ref(false)
const started = ref(false)
const activeButton = ref<number | null>(null)

const startGame = () => {
  sequence.value = []
  playerSequence.value = []
  level.value = 1
  gameOver.value = false
  started.value = true
  nextRound()
}

const nextRound = async () => {
  playerSequence.value = []
  showingSequence.value = true

  // Add new random button to sequence
  sequence.value.push(Math.floor(Math.random() * props.emojis.length))

  // Show sequence
  for (const buttonIdx of sequence.value) {
    await new Promise(resolve => setTimeout(resolve, 500))
    activeButton.value = buttonIdx
    await new Promise(resolve => setTimeout(resolve, 600))
    activeButton.value = null
  }

  showingSequence.value = false
}

const playerInput = (idx: number) => {
  if (showingSequence.value || gameOver.value) return

  playerSequence.value.push(idx)

  // Flash button
  activeButton.value = idx
  setTimeout(() => {
    activeButton.value = null
  }, 300)

  // Check if correct
  const currentStep = playerSequence.value.length - 1
  if (playerSequence.value[currentStep] !== sequence.value[currentStep]) {
    // Wrong!
    gameOver.value = true
    return
  }

  // Check if round complete
  if (playerSequence.value.length === sequence.value.length) {
    level.value++
    setTimeout(() => {
      nextRound()
    }, 1000)
  }
}
</script>
