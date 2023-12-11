<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Navigation } from 'vue3-carousel'
import { useTvStore } from '@/stores/tv.js'
import { onMounted } from 'vue'
const tvStore = useTvStore()

onMounted(async () => {
  await tvStore.getAllTvShows()
})
</script>

<template>
  <h1 id="Text-h1">Séries de Tv</h1>
  <carousel :items-to-show="4.2" class="Margin">
    <slide v-for="series in tvStore.tvShows" :key="series.id">
      <router-link :to="`/detailTv/${series.id}`" class="underline">
        <div class="img-card">
          <div class="img-container">
            <img
              :src="`https://image.tmdb.org/t/p/w500${series.poster_path}`"
              :alt="series.title"
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