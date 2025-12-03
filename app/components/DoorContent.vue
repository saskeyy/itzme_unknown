<template>
  <UModal v-if="door" v-model:open="isOpen">
    <template #content>
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="text-3xl">{{ door.catEmoji }}</span>
              <div>
                <h3 class="text-xl font-bold">Tag {{ door.day }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">{{ door.title }}</p>
              </div>
            </div>
            <UButton
              icon="i-lucide-x"
              color="neutral"
              variant="ghost"
              @click="isOpen = false"
            />
          </div>
        </template>

        <div class="space-y-6">
          <!-- Recipe Content -->
          <ContentRecipeContent
            v-if="door.type === 'recipe'"
            :recipe="door.content as RecipeContent"
          />

          <!-- Quote Content -->
          <ContentQuoteContent
            v-else-if="door.type === 'quote'"
            :quote="door.content as QuoteContent"
          />

          <!-- Puzzle Content -->
          <ContentPuzzleContent
            v-else-if="door.type === 'puzzle'"
            :puzzle="door.content as PuzzleContent"
          />

          <!-- Game Content -->
          <div v-else-if="door.type === 'game'">
            <!-- Memory Game -->
            <GamesMemoryGame
              v-if="(door.content as GameContent).type === 'memory'"
              :cards="(door.content as GameContent).data.cards"
            />

            <!-- Hangman Game -->
            <GamesHangmanGame
              v-else-if="(door.content as GameContent).type === 'hangman'"
              :word="(door.content as GameContent).data.word"
              :hint="(door.content as GameContent).data.hint"
              :max-wrong-guesses="(door.content as GameContent).data.maxWrongGuesses"
            />

            <!-- Simon Says Game -->
            <GamesSimonGame
              v-else-if="(door.content as GameContent).type === 'simon'"
              :title="(door.content as GameContent).data.title"
              :emojis="(door.content as GameContent).data.emojis"
            />

            <!-- Catch Game -->
            <GamesCatchGame
              v-else-if="(door.content as GameContent).type === 'catch'"
              :title="(door.content as GameContent).data.title"
              :emoji="(door.content as GameContent).data.emoji"
              :duration="(door.content as GameContent).data.duration"
              :target="(door.content as GameContent).data.target"
            />

            <!-- Whack A Mouse Game -->
            <GamesWhackAMouseGame
              v-else-if="(door.content as GameContent).type === 'whackamouse'"
              :title="(door.content as GameContent).data.title"
              :duration="(door.content as GameContent).data.duration"
              :target="(door.content as GameContent).data.target"
            />

            <!-- Spot The Difference Game -->
            <GamesSpotTheDifferenceGame
              v-else-if="(door.content as GameContent).type === 'spotdifference'"
            />

            <!-- Slider Puzzle Game -->
            <GamesSliderPuzzleGame
              v-else-if="(door.content as GameContent).type === 'sliderpuzzle'"
            />

            <!-- Connect Pairs Game -->
            <GamesConnectPairsGame
              v-else-if="(door.content as GameContent).type === 'connectpairs'"
            />
          </div>
        </div>
      </UCard>
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { AdventDoor, RecipeContent, QuoteContent, PuzzleContent, GameContent } from '~/data/adventCalendar'

const props = defineProps<{
  door: AdventDoor | null
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>
