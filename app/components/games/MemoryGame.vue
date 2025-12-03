<template>
  <div>
    <h5 class="font-semibold mb-4 flex items-center gap-2">
      <span>🎮</span>
      Memory-Spiel:
    </h5>
    <div class="grid grid-cols-4 gap-3">
      <button
        v-for="(card, idx) in memoryCards"
        :key="idx"
        class="aspect-square bg-gradient-to-br from-red-600 to-green-600 rounded-lg flex items-center justify-center text-4xl transition-all hover:scale-105"
        :class="{
          'bg-white dark:bg-gray-800': card.flipped || card.matched,
          'opacity-50': card.matched
        }"
        @click="flipCard(idx)"
        :disabled="card.matched || card.flipped"
      >
        <span v-if="card.flipped || card.matched">{{ card.emoji }}</span>
        <span v-else class="text-white text-2xl">?</span>
      </button>
    </div>

    <div v-if="memoryComplete" class="mt-4 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
      <p class="text-green-700 dark:text-green-400 font-semibold text-center">
        🎉 Gratuliere! Du hast alle Paare gefunden!
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface MemoryCard {
  emoji: string
  flipped: boolean
  matched: boolean
}

const props = defineProps<{
  cards: string[]
}>()

const memoryCards = ref<MemoryCard[]>([])
const flippedIndices = ref<number[]>([])
const memoryComplete = ref(false)

const initMemoryGame = () => {
  const doubled = [...props.cards, ...props.cards]
  const shuffled = doubled.sort(() => Math.random() - 0.5)

  memoryCards.value = shuffled.map(emoji => ({
    emoji,
    flipped: false,
    matched: false
  }))
}

const flipCard = (idx: number) => {
  if (flippedIndices.value.length >= 2) return
  if (!memoryCards.value[idx]) return

  memoryCards.value[idx].flipped = true
  flippedIndices.value.push(idx)

  if (flippedIndices.value.length === 2) {
    const [first, second] = flippedIndices.value
    if (first === undefined || second === undefined) return

    const firstCard = memoryCards.value[first]
    const secondCard = memoryCards.value[second]
    if (!firstCard || !secondCard) return

    if (firstCard.emoji === secondCard.emoji) {
      firstCard.matched = true
      secondCard.matched = true
      flippedIndices.value = []

      // Check if all matched
      if (memoryCards.value.every(card => card.matched)) {
        memoryComplete.value = true
      }
    } else {
      setTimeout(() => {
        if (first !== undefined && second !== undefined && memoryCards.value[first] && memoryCards.value[second]) {
          memoryCards.value[first].flipped = false
          memoryCards.value[second].flipped = false
        }
        flippedIndices.value = []
      }, 1000)
    }
  }
}

// Initialize game on mount
onMounted(() => {
  initMemoryGame()
})
</script>
