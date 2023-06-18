<template>
  <div class="parent-container">
    <SearchBar />

    <MovieDetail  v-if="selectedEntityType === 'movie'" />
    <ShowDetail  v-else-if="selectedEntityType === 'show'" />
  </div>
</template>
  
  <script>
import MovieDetail from "@/components/MovieDetail.vue";
import ShowDetail from "@/components/ShowDetail.vue";
import SearchBar from "@/components/SearchBar.vue";
import { mapState, useStore } from "vuex";
export default {
  components: {
    SearchBar,
    MovieDetail,
    ShowDetail,
  },
  computed: {
    ...mapState(["selectedEntityType"]) // Mapea selectedEntityType del store a una propiedad computada
  }
}

</script>
