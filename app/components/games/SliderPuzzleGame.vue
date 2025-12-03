<template>
  <div>
    <h5 class="font-semibold mb-4 flex items-center gap-2">
      <span>🧩</span>
      Schiebepuzzle
    </h5>

    <div class="mb-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
      <p class="text-sm">Züge: {{ moves }}</p>
      <p class="text-xs mt-1">Verschiebe die Kacheln, um das Bild zu vervollständigen!</p>
    </div>

    <!-- Puzzle grid -->
    <div class="grid grid-cols-3 gap-2 mb-4 max-w-sm mx-auto">
      <button
        v-for="(tile, idx) in tiles"
        :key="idx"
        @click="moveTile(idx)"
        class="aspect-square flex items-center justify-center text-5xl rounded-lg transition-all"
        :class="{
          'bg-gradient-to-br from-red-600 to-green-600 hover:scale-105 cursor-pointer': tile !== null,
          'bg-gray-200 dark:bg-gray-700': tile === null
        }"
        :disabled="tile === null"
      >
        {{ tile }}
      </button>
    </div>

    <!-- Solution preview -->
    <div class="mb-4">
      <button
        @click="showSolution = !showSolution"
        class="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
      >
        {{ showSolution ? '▼ Lösung ausblenden' : '▶ Lösung anzeigen' }}
      </button>

      <div v-if="showSolution" class="grid grid-cols-3 gap-1 max-w-[200px] mx-auto mt-2">
        <div
          v-for="(tile, idx) in solution"
          :key="`sol-${idx}`"
          class="aspect-square flex items-center justify-center text-2xl bg-gray-100 dark:bg-gray-800 rounded"
        >
          {{ tile }}
        </div>
      </div>
    </div>

    <!-- Reset button -->
    <div class="mb-4">
      <UButton
        block
        color="neutral"
        variant="outline"
        @click="shufflePuzzle"
      >
        Neu mischen
      </UButton>
    </div>

    <!-- Success message -->
    <div v-if="isSolved" class="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
      <p class="text-green-700 dark:text-green-400 font-semibold text-center">
        🎉 Perfekt! Du hast das Puzzle in {{ moves }} Zügen gelöst!
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
type Tile = string | null

const moves = ref(0)
const showSolution = ref(false)

// The solution (3x3 grid with Christmas cat scene)
const solution: Tile[] = [
  '🎄', '⭐', '🎁',
  '🐱', '🎅', '🔔',
  '❄️', '🕯️', null
]

const tiles = ref<Tile[]>([...solution])

const isSolved = computed(() => {
  return tiles.value.every((tile, idx) => tile === solution[idx])
})

const getEmptyIndex = (): number => {
  return tiles.value.findIndex(tile => tile === null)
}

const canMove = (index: number): boolean => {
  const emptyIndex = getEmptyIndex()
  const row = Math.floor(index / 3)
  const col = index % 3
  const emptyRow = Math.floor(emptyIndex / 3)
  const emptyCol = emptyIndex % 3

  // Check if tile is adjacent to empty space
  return (
    (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
    (col === emptyCol && Math.abs(row - emptyRow) === 1)
  )
}

const moveTile = (index: number) => {
  if (!canMove(index)) return

  const emptyIndex = getEmptyIndex()

  // Swap tiles
  const temp = tiles.value[index]
  tiles.value[index] = tiles.value[emptyIndex]
  tiles.value[emptyIndex] = temp

  moves.value++
}

const shufflePuzzle = () => {
  // Reset moves
  moves.value = 0

  // Perform random valid moves to shuffle
  const numShuffles = 100
  for (let i = 0; i < numShuffles; i++) {
    const emptyIndex = getEmptyIndex()
    const row = Math.floor(emptyIndex / 3)
    const col = emptyIndex % 3

    // Get valid adjacent positions
    const validMoves: number[] = []
    if (row > 0) validMoves.push((row - 1) * 3 + col) // up
    if (row < 2) validMoves.push((row + 1) * 3 + col) // down
    if (col > 0) validMoves.push(row * 3 + (col - 1)) // left
    if (col < 2) validMoves.push(row * 3 + (col + 1)) // right

    // Pick random valid move
    const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)]
    if (randomMove !== undefined) {
      const temp = tiles.value[randomMove]
      tiles.value[randomMove] = tiles.value[emptyIndex]
      tiles.value[emptyIndex] = temp
    }
  }
}

// Initialize shuffled puzzle on mount
onMounted(() => {
  shufflePuzzle()
})
</script>
