<script setup>
import { useTvStore } from '@/stores/tv'
import { onMounted, ref } from 'vue';
import { useGenreStore } from '@/stores/genre';
import Loading from 'vue-loading-overlay';

const genreStore = useGenreStore()
const isLoading = ref(false);
const selectedGenre = ref(null);
const selectedYear = ref(null);
const tvStore = useTvStore();

onMounted(async () => {
  await genreStore.getAllGenres('tv');
  isLoading.value = true;
  await tvStore.getAllTvShows();
  isLoading.value = false;
});

const filterByGenre = async () => {
  isLoading.value = true;

  if (selectedGenre.value) {
    await tvStore.filterTvShowsByGenre(selectedGenre.value);
  } else {
    await tvStore.getAllTvShows();
  }

  isLoading.value = false;
};

const filterByYear = async () => {
  isLoading.value = true;
  await tvStore.filterTvShowsByYear(selectedYear.value);  
  isLoading.value = false;
};

const nextPage = async () => {
  isLoading.value = true;
  await tvStore.nextPage();
  isLoading.value = false;
};

const prevPage = async () => {
  isLoading.value = true;
  await tvStore.prevPage();
  isLoading.value = false;
};

const availableYears = ref([]);

onMounted(() => {
  loadAvailableYears();
});

const loadAvailableYears = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, index) => currentYear - index);
  availableYears.value = years;
};
</script>


<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 mb-3">
        <label for="genreSelect" class="form-label title-text">Escolher Gênero:</label>
        <select v-model="selectedGenre" class="form-select" id="genreSelect">
          <option value="">Todos os Gêneros</option>
          <option v-for="genre in genreStore.genres" :key="genre.id" :value="genre.id">
            {{ genre.name }}
          </option>
        </select>
        <button @click="filterByGenre" class="btn btn-primary mt-3">Filtrar</button>
      </div>
      <div class="col-12 mb-3">
        <label for="yearSelect" class="form-label title-text">Escolher Ano:</label>
        <select v-model="selectedYear" class="form-select" id="yearSelect">
          <option value="">Todos os Anos</option>
          <!-- Adicione opções de anos conforme necessário -->
          <option v-for="year in availableYears" :key="year" :value="year">
            {{ year }}
          </option>
        </select>
        <button @click="filterByYear" class="btn btn-primary mt-3">Filtrar por Ano</button>
      </div>
      <loading v-model:active="isLoading" is-full-page />

      <div
        v-for="tvShow in tvStore.filteredTvShows"
        :key="tvShow.id"
        class="col-lg-3 col-md-4 col-sm-6 col-12 max"
      >
        <div class="mt-5 card-container">
          <router-link :to="`/detailTv/${tvShow.id}`" class="underline">
            <div class="h100 card">
              <div class="img">
                <img
                  :src="`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`"
                  class="position-relative"
                  width="260"
                />
              </div>
              <div class="card-body">
                <div class="title">
                  <p class="title-text underline">{{ tvShow.name }}</p>
                </div>
                <div class="card-text">
                  {{ tvShow.data }}
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="d-flex flex-wrap my-2 md-5">
      <div class="col-md-4 col-12">
        <div
          class="container-info-results d-flex flex-column align-items-center align-items-md-start"
        >
        <p class="mb-0 infos-pages">
          Página {{ tvStore.currentPage }} de {{ tvStore.totalPages }}
        </p>
        <p class="info-results">Resultados: {{ tvStore.totalResults }}</p>
        </div>
      </div>
      <div class="col-md-4 col-12">
        <div class="container-pagination d-flex justify-content-center">
          <ul class="pagination">
            <li @click="prevPage" class="page-item">Voltar Página</li>
            <li @click="nextPage" class="page-item">Próxima Página</li>
          </ul>
        </div>
      </div>
      <div class="col-md-4 col-12"></div>
    </div>
  </div>
</template>

<style scoped>
.title-text {
  font-weight: bold;
  font-size: 18px;
  max-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.img {
  overflow: hidden;
}

.img img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.max {
  height: 100%;
}

.pagination {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
}

.page-item {
    margin-right: 5px;
    padding: 5px 10px;
    background-color: #007BFF;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
}

.page-item:hover {
    background-color: #0056b3;
}
</style>