<template>
  <div class="app">
    <AppHeader />
    <div class="layout">
      <NuxtPage />
    </div>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter();
onMounted(() => {
  router.push('/auth');
})
</script>

<style lang="scss" scoped>
.layout {
  margin: 0 auto;
  padding-top: 40px;
  padding-bottom: 40px;
  max-width: 1100px;
}
</style>
