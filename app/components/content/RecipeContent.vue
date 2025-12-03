<template>
  <div class="space-y-4">
    <div class="flex items-center gap-2 text-2xl font-bold">
      <span>🍽️</span>
      <h4>{{ recipe.name }}</h4>
    </div>

    <div class="grid grid-cols-2 gap-4 text-sm">
      <div class="flex items-center gap-2">
        <span>⏱️</span>
        <span>Vorbereitung: {{ recipe.prepTime }}</span>
      </div>
      <div class="flex items-center gap-2">
        <span>🔥</span>
        <span>Zubereitung: {{ recipe.cookTime }}</span>
      </div>
    </div>

    <div>
      <h5 class="font-semibold mb-2 flex items-center gap-2">
        <span>🛒</span>
        Zutaten:
      </h5>
      <ul class="list-disc list-inside space-y-1">
        <li v-for="(ingredient, idx) in recipe.ingredients" :key="idx">
          {{ ingredient }}
        </li>
      </ul>
    </div>

    <div>
      <h5 class="font-semibold mb-2 flex items-center gap-2">
        <span>👨‍🍳</span>
        Zubereitung:
      </h5>
      <ol class="list-decimal list-inside space-y-2">
        <li v-for="(instruction, idx) in recipe.instructions" :key="idx">
          {{ instruction }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RecipeContent } from '~/data/adventCalendar'

defineProps<{
  recipe: RecipeContent
}>()
</script>
