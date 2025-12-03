<template>
  <div>
    <h5 class="font-semibold mb-4 flex items-center gap-2">
      <span>🔗</span>
      Verbinde die Paare!
    </h5>

    <div class="mb-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
      <p class="text-sm">Gefundene Paare: {{ foundPairs.length }} / {{ pairs.length }}</p>
      <p class="text-xs mt-1">Klicke auf zwei zusammengehörige Items!</p>
    </div>

    <!-- Items grid -->
    <div class="grid grid-cols-4 gap-3 mb-4">
      <button
        v-for="(item, idx) in shuffledItems"
        :key="idx"
        @click="selectItem(idx)"
        class="aspect-square rounded-lg flex items-center justify-center text-4xl transition-all"
        :class="{
          'bg-gradient-to-br from-red-600 to-green-600 hover:scale-105': !item.matched && !selectedIndices.includes(idx),
          'bg-blue-500 dark:bg-blue-700 scale-105': selectedIndices.includes(idx) && !item.matched,
          'bg-green-500 dark:bg-green-700 opacity-50': item.matched,
          'cursor-pointer': !item.matched,
          'cursor-default': item.matched
        }"
        :disabled="item.matched"
      >
        {{ item.emoji }}
      </button>
    </div>

    <!-- Wrong selection feedback -->
    <div v-if="showWrongFeedback" class="mb-4 p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
      <p class="text-red-700 dark:text-red-400 text-sm text-center">
        ❌ Diese Items gehören nicht zusammen!
      </p>
    </div>

    <!-- Success message -->
    <div v-if="isComplete" class="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
      <p class="text-green-700 dark:text-green-400 font-semibold text-center">
        🎉 Super! Du hast alle Paare gefunden!
      </p>
    </div>

    <!-- Hint section -->
    <div class="text-xs text-gray-600 dark:text-gray-400 text-center">
      Tipp: Finde zusammengehörige Items (z.B. Weihnachtsmann & Schlitten)
    </div>
  </div>
</template>

<script setup lang="ts">
interface PairItem {
  emoji: string
  pairId: number
  matched: boolean
}

// Define pairs that belong together
const pairs = [
  { id: 0, items: ['🎅', '🛷'] }, // Santa & sleigh
  { id: 1, items: ['🎄', '⭐'] }, // Tree & star
  { id: 2, items: ['🐱', '🎁'] }, // Cat & gift
  { id: 3, items: ['❄️', '⛄'] }, // Snowflake & snowman
  { id: 4, items: ['🕯️', '🔥'] }, // Candle & fire
  { id: 5, items: ['🔔', '🎵'] }  // Bell & music
]

const shuffledItems = ref<PairItem[]>([])
const selectedIndices = ref<number[]>([])
const foundPairs = ref<number[]>([])
const showWrongFeedback = ref(false)
let wrongFeedbackTimeout: ReturnType<typeof setTimeout> | null = null

const isComplete = computed(() => {
  return foundPairs.value.length === pairs.length
})

const initializeGame = () => {
  // Create flat array of all items
  const items: PairItem[] = []
  pairs.forEach(pair => {
    items.push({ emoji: pair.items[0], pairId: pair.id, matched: false })
    items.push({ emoji: pair.items[1], pairId: pair.id, matched: false })
  })

  // Shuffle items
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = items[i]
    if (temp !== undefined && items[j] !== undefined) {
      items[i] = items[j]
      items[j] = temp
    }
  }

  shuffledItems.value = items
}

const selectItem = (index: number) => {
  if (selectedIndices.value.includes(index)) {
    // Deselect
    selectedIndices.value = selectedIndices.value.filter(i => i !== index)
    return
  }

  if (selectedIndices.value.length >= 2) {
    // Already have 2 selected, ignore
    return
  }

  selectedIndices.value.push(index)

  // Check if we have 2 selected
  if (selectedIndices.value.length === 2) {
    checkPair()
  }
}

const checkPair = () => {
  const [firstIdx, secondIdx] = selectedIndices.value
  if (firstIdx === undefined || secondIdx === undefined) return

  const firstItem = shuffledItems.value[firstIdx]
  const secondItem = shuffledItems.value[secondIdx]

  if (!firstItem || !secondItem) return

  if (firstItem.pairId === secondItem.pairId) {
    // Correct pair!
    setTimeout(() => {
      firstItem.matched = true
      secondItem.matched = true
      foundPairs.value.push(firstItem.pairId)
      selectedIndices.value = []
    }, 500)
  } else {
    // Wrong pair
    showWrongFeedback.value = true
    if (wrongFeedbackTimeout) clearTimeout(wrongFeedbackTimeout)
    wrongFeedbackTimeout = setTimeout(() => {
      showWrongFeedback.value = false
      selectedIndices.value = []
    }, 1500)
  }
}

onMounted(() => {
  initializeGame()
})

onUnmounted(() => {
  if (wrongFeedbackTimeout) clearTimeout(wrongFeedbackTimeout)
})
</script>
