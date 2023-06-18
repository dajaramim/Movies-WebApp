<template>
  <router-view :key="$route.fullPath"/> <!-- esto es para forzar a vue a recrear el componente al cambiar la ruta -->
</template>

<script setup>
  //
</script>
