<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'de'
  }
})

const title = 'Katzen-Adventskalender'
const description = 'Ein weihnachtlicher Adventskalender mit Spielen, Rätseln, veganen Rezepten und schönen Worten - und natürlich mit Katzen!'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})
</script>

<template>
  <UApp>
    <UHeader class="backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
      <template #left>
        <NuxtLink to="/" class="flex items-center gap-2">
          <span class="text-2xl">🎄🐱</span>
          <span class="font-bold bg-gradient-to-r from-red-600 to-green-600 bg-clip-text text-transparent">
            Katzen-Adventskalender
          </span>
        </NuxtLink>
      </template>

      <template #right>
        <UColorModeButton />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <UFooter class="backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
      <template #left>
        <p class="text-sm text-muted">
          Frohe Weihnachten 🎄 • © {{ new Date().getFullYear() }}
        </p>
      </template>

      <template #right>
        <p class="text-sm text-muted flex items-center gap-1">
          Gemacht mit 💚 und einem Hauch von Katzenmagie 🐱
        </p>
      </template>
    </UFooter>
  </UApp>
</template>
