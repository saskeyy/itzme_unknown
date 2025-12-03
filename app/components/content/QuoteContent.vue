<template>
  <div class="space-y-4">
    <div class="relative p-6 bg-gradient-to-br from-red-50 to-green-50 dark:from-red-950/20 dark:to-green-950/20 rounded-lg">
      <div class="text-6xl text-red-600 dark:text-red-400 opacity-20 absolute top-2 left-2">"</div>
      <p class="text-lg italic relative z-10 pl-8">
        {{ quote.text }}
      </p>
      <div class="text-6xl text-green-600 dark:text-green-400 opacity-20 absolute bottom-2 right-2">"</div>
    </div>
    <p v-if="quote.author" class="text-right text-sm text-gray-600 dark:text-gray-400">
      — {{ quote.author }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { QuoteContent } from '~/data/adventCalendar'

defineProps<{
  quote: QuoteContent
}>()
</script>
