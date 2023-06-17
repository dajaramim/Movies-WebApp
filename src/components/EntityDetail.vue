<template>
  <v-container>
    <v-row>
      <v-row>
        <v-col>{{ selectedMovie.title }}</v-col>
        <v-col>{{ selectedMovie.id }}</v-col>

        <v-col>{{ selectedMovie.vote_average.toFixed(1) }}</v-col>
        <v-col>{{selectedMovie.release_date}}</v-col>
      </v-row>

      <v-row>
        <v-img
          :src="'https://image.tmdb.org/t/p/w500' + selectedMovie.poster_path"
        ></v-img>
        <v-col>Video</v-col>
      </v-row>
      <v-row>{{selectedMovie.overview}}</v-row>
    </v-row>
  </v-container>
</template>

<script>
import { useStore } from 'vuex';
export default {

    setup() {
    const store = useStore();

    const selectedMovie = store.state.selectedMovie;

    return {
      selectedMovie,
    };
  },
    
};
</script>