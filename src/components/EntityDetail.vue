<template>
  <v-container>
    <div>
      <v-row>
        <v-col>
          <h2>{{ movie.title }}</h2>
        </v-col>
        <v-col>{{ movie.vote_average }}
        {{ movie.release_date }}</v-col>
        <!-- Si existen géneros -->
        <v-col v-if="movie.genres">
          <v-row v-for="(genre, index) in movie.genres" :key="index">
            {{ genre.name }}
          </v-row>
        </v-col>
      </v-row>
      <!-- Poster  -->
      <v-row class="visual-container">
        <img class="image" :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" />

        <!-- Videos -->
        <v-col class="videos-container" v-if="videos && videos.length > 0">
        <Swiper class="carousel" :options="swiperOptions" :navigation="true" :modules="modules">
          <SwiperSlide class="video" v-for="(video, index) in videos" :key="index">
            <iframe width="800" height="500"
              :src="'https://www.youtube.com/embed/' + video.key">
            </iframe>
          </SwiperSlide>
          <div class="swiper-pagination" slot="pagination"></div>
        </Swiper>
      </v-col>
      </v-row>
      <v-row>{{ movie.overview }}</v-row>
    </div>
  </v-container>
</template>

<script>
import { Navigation } from "swiper";
import { useStore } from "vuex";
import { Swiper, SwiperSlide } from "swiper/vue";
import 'swiper/swiper-bundle.css';
import "swiper/css/navigation";
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    const store = useStore();

    const selectedMovie = store.state.selectedMovie;

    return {
      modules: [Navigation],
      selectedMovie,
    };
  },

  data() {
    return {
      movie: {},
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
      videos: [],
    };
  },
  mounted() {
    this.fetchMovie(this.selectedMovie);
    this.fetchMovieVideo(this.selectedMovie);
  },

  methods: {
    fetchMovie(movie_id) {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjlhNTMwYWQ5M2FkNWJiYTRmMjllOTczNDAwNTMwNiIsInN1YiI6IjY0OGI1MjMyMjYzNDYyMDEyZDQ4Y2FmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Et8_P6mnw57auSL1lTQZJMHPwdJ-XCW0hWBjKjq83n0",
        },
      };

      fetch(
        `https://api.themoviedb.org/3/movie/${movie_id}?language=en-US`,
        options
      )
        .then((response) => response.json())
        .then((response) => {
          this.movie = response;
        })
        .catch((err) => console.error(err));
    },
    fetchMovieVideo(movie_id) {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjlhNTMwYWQ5M2FkNWJiYTRmMjllOTczNDAwNTMwNiIsInN1YiI6IjY0OGI1MjMyMjYzNDYyMDEyZDQ4Y2FmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Et8_P6mnw57auSL1lTQZJMHPwdJ-XCW0hWBjKjq83n0",
        },
      };

      fetch(
        `https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`,
        options
      )
        .then((response) => response.json())
        .then((response) => { 
            this.videos = response.results; // select the first video
          }
        )
        .catch((err) => console.error(err));
    },
  },
};
</script>

<style scoped>

.visual-container{
  display: flex;
  align-items: start;
}
.carousel {
  width: 80rem;
}
.image {
  height: 50rem;
}
.videos-container {
  width: 80rem;
  height: 50rem;
  padding: 0;

}
.video {
  display: flex;
  justify-content: center;
  
}

</style>