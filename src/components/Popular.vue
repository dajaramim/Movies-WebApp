<template>
  <v-container class="fill-height">
    <v-responsive class="align-center text-center fill-height">
      <v-row>
        <v-col cols="4" v-for="(movie, index) in popularMovies" :key="index">
          <v-row class="ma-2">{{ movie.original_title }}</v-row>
          <v-img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"></v-img>
        </v-col>
      </v-row>
      
    </v-responsive>
  </v-container>
</template>

<script>
  export default {
  data() {
    return {
      popularMovies: [],
    };
  },
  mounted() {
    this.fetchMovies();
  },
  methods: {
    fetchMovies() {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjlhNTMwYWQ5M2FkNWJiYTRmMjllOTczNDAwNTMwNiIsInN1YiI6IjY0OGI1MjMyMjYzNDYyMDEyZDQ4Y2FmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Et8_P6mnw57auSL1lTQZJMHPwdJ-XCW0hWBjKjq83n0",
        },
      };

      fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        options
      )
        .then((response) => response.json())
        .then((response) => {
          this.popularMovies = response.results;
        })
        .catch((err) => console.error(err));
    },

  },
};
</script>
