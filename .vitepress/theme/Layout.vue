<script setup>
import DefaultTheme from 'vitepress/theme'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <!-- Renders above the Previous/Next page footer on every doc page -->
    <template #doc-footer-before>
      <Feedback />
    </template>
  </Layout>
</template>
