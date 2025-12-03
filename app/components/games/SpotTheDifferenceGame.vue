<template>
  <div>
    <h5 class="font-semibold mb-4 flex items-center gap-2">
      <span>🔍</span>
      Suchbild: Finde die Unterschiede!
    </h5>

    <div class="mb-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
      <p class="text-sm">Gefunden: {{ foundDifferences.length }} / {{ differences.length }}</p>
      <p class="text-xs mt-1">Klicke auf die Unterschiede im rechten Bild!</p>
    </div>

    <div class="grid grid-cols-2 gap-4 mb-4">
      <!-- Left image (original) -->
      <div class="border-2 border-gray-300 dark:border-gray-700 rounded-lg p-2">
        <p class="text-xs text-center mb-2 font-semibold">Original</p>
        <div class="grid grid-cols-5 gap-1">
          <div
            v-for="(emoji, idx) in originalGrid"
            :key="`orig-${idx}`"
            class="aspect-square flex items-center justify-center text-2xl bg-white dark:bg-gray-800 rounded"
          >
            {{ emoji }}
          </div>
        </div>
      </div>

      <!-- Right image (with differences) -->
      <div class="border-2 border-gray-300 dark:border-gray-700 rounded-lg p-2">
        <p class="text-xs text-center mb-2 font-semibold">Finde die Unterschiede</p>
        <div class="grid grid-cols-5 gap-1">
          <button
            v-for="(emoji, idx) in modifiedGrid"
            :key="`mod-${idx}`"
            @click="checkDifference(idx)"
            class="aspect-square flex items-center justify-center text-2xl rounded transition-all"
            :class="{
              'bg-white dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900': !foundDifferences.includes(idx),
              'bg-green-200 dark:bg-green-800': foundDifferences.includes(idx),
              'cursor-pointer': !foundDifferences.includes(idx),
              'cursor-default': foundDifferences.includes(idx)
            }"
            :disabled="foundDifferences.includes(idx)"
          >
            {{ emoji }}
          </button>
        </div>
      </div>
    </div>

    <!-- Success message -->
    <div v-if="isComplete" class="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
      <p class="text-green-700 dark:text-green-400 font-semibold text-center">
        🎉 Super! Du hast alle Unterschiede gefunden!
      </p>
    </div>

    <!-- Wrong click feedback -->
    <div v-if="showWrongFeedback" class="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
      <p class="text-red-700 dark:text-red-400 text-sm text-center">
        ❌ Das ist kein Unterschied!
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  gridSize?: number
}>()

const gridSize = props.gridSize || 25 // 5x5 grid
const foundDifferences = ref<number[]>([])
const showWrongFeedback = ref(false)
let wrongFeedbackTimeout: ReturnType<typeof setTimeout> | null = null

// Define differences (positions where images differ)
const differences = ref<number[]>([])

// Original grid with Christmas emojis
const originalGrid = ref<string[]>([])
const modifiedGrid = ref<string[]>([])

const christmasEmojis = ['🎄', '⭐', '🎁', '🔔', '❄️', '🕯️', '🎅', '⛄', '🦌', '🎀']

const isComplete = computed(() => {
  return foundDifferences.value.length === differences.value.length
})

const initializeGame = () => {
  // Create original grid
  originalGrid.value = Array.from({ length: gridSize }, () => {
    return christmasEmojis[Math.floor(Math.random() * christmasEmojis.length)]
  })

  // Copy to modified grid
  modifiedGrid.value = [...originalGrid.value]

  // Create 5 random differences
  differences.value = []
  const numDifferences = 5
  const usedPositions = new Set<number>()

  while (differences.value.length < numDifferences) {
    const position = Math.floor(Math.random() * gridSize)
    if (!usedPositions.has(position)) {
      usedPositions.add(position)
      differences.value.push(position)

      // Change the emoji at this position
      let newEmoji = christmasEmojis[Math.floor(Math.random() * christmasEmojis.length)]
      while (newEmoji === originalGrid.value[position]) {
        newEmoji = christmasEmojis[Math.floor(Math.random() * christmasEmojis.length)]
      }
      modifiedGrid.value[position] = newEmoji
    }
  }
}

const checkDifference = (index: number) => {
  if (foundDifferences.value.includes(index)) return

  if (differences.value.includes(index)) {
    // Correct!
    foundDifferences.value.push(index)
  } else {
    // Wrong!
    showWrongFeedback.value = true
    if (wrongFeedbackTimeout) clearTimeout(wrongFeedbackTimeout)
    wrongFeedbackTimeout = setTimeout(() => {
      showWrongFeedback.value = false
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
