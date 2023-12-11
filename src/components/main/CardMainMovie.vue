<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { useMovieStore } from '@/stores/movie.js'
import { onMounted } from 'vue'
const movieStore = useMovieStore()

onMounted(async () => {
  await movieStore.getAllMovie()
})
</script>

<template>
  <h1 id="Text-h1">Filmes mais vistos</h1>
  <carousel :items-to-show="4.2" class="Margin">
    <slide v-for="(movie) in movieStore.movies" :key="movie.id">
    <router-link :to="`/detailMovie/${movie.id}`" class="underline">
      <div class="img-card">
        <div class="img-container">
          <img
            :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
            :alt="movie.title"
            width="165"
            class="img"
          />
        </div>
      </div>
    </router-link>
    </slide>
    <template #addons>
      <navigation />
    </template>
  </carousel>
</template>

<style scoped>
.Margin {
  margin-bottom: 80px;
}

#Text-h1 {
  text-align: center;
  margin-top: 80px;
  margin-bottom: 30px;
  font-size: 36px;
  font-weight: bold;
}
.img {
  border-radius: 10px;
}
.img-card {
  text-align: center;
  min-height: 0;
  height: auto;
}

h6 {
  font-weight: 700;
  margin-top: 20px;
}

.img-card h6 {
  margin-top: 10px;
}
</style>
