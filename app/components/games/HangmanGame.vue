<template>
  <div>
    <h5 class="font-semibold mb-4 flex items-center gap-2">
      <span>🎯</span>
      Galgenmännchen:
    </h5>

    <div class="mb-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
      <p class="text-sm mb-2">💡 Hinweis: {{ hint }}</p>
    </div>

    <!-- Display word with guessed letters -->
    <div class="flex justify-center gap-2 mb-6 flex-wrap">
      <div
        v-for="(letter, idx) in word.split('')"
        :key="idx"
        class="w-10 h-12 border-b-2 border-gray-400 dark:border-gray-600 flex items-center justify-center text-2xl font-bold"
      >
        {{ guessedLetters.includes(letter) ? letter : '' }}
      </div>
    </div>

    <!-- Wrong guesses counter -->
    <div class="mb-4 text-center">
      <p class="text-sm">
        Falsche Versuche: {{ wrongGuesses.length }} / {{ maxWrongGuesses }}
      </p>
      <p v-if="wrongGuesses.length > 0" class="text-xs text-red-600 dark:text-red-400 mt-1">
        Falsche Buchstaben: {{ wrongGuesses.join(', ') }}
      </p>
    </div>

    <!-- Keyboard -->
    <div v-if="!won && !lost" class="grid grid-cols-7 gap-2 mb-4">
      <UButton
        v-for="letter in alphabet"
        :key="letter"
        :disabled="guessedLetters.includes(letter) || wrongGuesses.includes(letter)"
        @click="guessLetter(letter)"
        size="sm"
        :color="guessedLetters.includes(letter) ? 'success' : wrongGuesses.includes(letter) ? 'error' : 'neutral'"
      >
        {{ letter }}
      </UButton>
    </div>

    <!-- Win message -->
    <div v-if="won" class="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
      <p class="text-green-700 dark:text-green-400 font-semibold text-center">
        🎉 Gewonnen! Das Wort war: {{ word }}
      </p>
    </div>

    <!-- Lose message -->
    <div v-if="lost" class="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg">
      <p class="text-red-700 dark:text-red-400 font-semibold text-center">
        😿 Verloren! Das Wort war: {{ word }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  word: string
  hint: string
  maxWrongGuesses: number
}>()

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const guessedLetters = ref<string[]>([])
const wrongGuesses = ref<string[]>([])

const won = computed(() => {
  return props.word.split('').every((letter: string) => guessedLetters.value.includes(letter))
})

const lost = computed(() => {
  return wrongGuesses.value.length >= props.maxWrongGuesses
})

const guessLetter = (letter: string) => {
  if (props.word.includes(letter)) {
    guessedLetters.value.push(letter)
  } else {
    wrongGuesses.value.push(letter)
  }
}
</script>
