<template>
  <div class="space-y-4">
    <div class="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
      <h5 class="font-semibold mb-2 flex items-center gap-2">
        <span>🤔</span>
        Rätsel:
      </h5>
      <p class="text-lg">{{ puzzle.question }}</p>
    </div>

    <div v-if="!showAnswer" class="space-y-2">
      <UButton
        block
        color="primary"
        @click="showAnswer = true"
      >
        Antwort zeigen
      </UButton>
      <UButton
        v-if="puzzle.hint"
        block
        color="neutral"
        variant="outline"
        @click="showHint = !showHint"
      >
        {{ showHint ? 'Hinweis verstecken' : 'Hinweis anzeigen' }}
      </UButton>
    </div>

    <div v-if="showHint && puzzle.hint" class="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
      <p class="text-sm">💡 {{ puzzle.hint }}</p>
    </div>

    <div v-if="showAnswer" class="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
      <h5 class="font-semibold mb-2 flex items-center gap-2">
        <span>✅</span>
        Lösung:
      </h5>
      <p class="text-xl font-bold text-green-700 dark:text-green-400">
        {{ puzzle.answer }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PuzzleContent } from '~/data/adventCalendar'

defineProps<{
  puzzle: PuzzleContent
}>()

const showAnswer = ref(false)
const showHint = ref(false)
</script>
