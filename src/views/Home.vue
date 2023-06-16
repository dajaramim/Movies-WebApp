<template>
  <div class="parent-container">
    <SearchBar />
    <Popular />
  </div>
</template>

<script setup>
import Popular from "@/components/Popular.vue";
import SearchBar from "@/components/SearchBar.vue";
</script>
<style scoped>
.parent-container {
  position: relative;
}
</style>