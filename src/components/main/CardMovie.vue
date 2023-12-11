<script setup>
import { useMovieStore } from '@/stores/movie';
import { onMounted, ref } from 'vue';
import { format } from 'date-fns';
import { useGenreStore } from '@/stores/genre';
import ptBR from 'date-fns/locale/pt-BR';
import Loading from 'vue-loading-overlay';

const isLoading = ref(false);
const selectedGenre = ref(null);
const selectedYear = ref(null);
const movieStore = useMovieStore();
const genreStore = useGenreStore();

onMounted(async () => {
  await genreStore.getAllGenres('');
  isLoading.value = true;
  await movieStore.getAllMovie();
  isLoading.value = false;
});

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
};

const filterByGenre = async () => {
  isLoading.value = true;

  if (selectedGenre.value) {
    await movieStore.getAllMovie(selectedGenre.value);
  } else {
    await movieStore.getAllMovie();
  }

  isLoading.value = false;
};

const filterByYear = async () => {
  isLoading.value = true;

  const genreId = selectedGenre.value || null;

  await movieStore.filterMoviesByYear(selectedYear.value, genreId);

  isLoading.value = false;
};


const nextPage = async () => {
  isLoading.value = true;
  await movieStore.nextPage();
  isLoading.value = false;
};

const prevPage = async () => {
  isLoading.value = true;
  await movieStore.prevPage();
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
      <div v-for="movie in movieStore.movies" :key="movie.id" class="col-lg-3 col-md-4 col-sm-6 col-12">
        <div class="mt-5">
          <router-link :to="`/detailMovie/${movie.id}`" class="underline">
            <div class="h100 card">
              <div class="img">
                <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" class="position-relative" width="260" />
              </div>
              <div class="card-body">
                <div class="title">
                  <p class="title-text underline">{{ movie.title }}</p>
                </div>
                <div class="card-text underline">
                  {{ formatDate(movie.release_date) }}
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <div class="d-flex flex-wrap my-2 md-5 margin-left">
    <div class="col-md-4 col-12">
      <div class="container-info-results d-flex flex-column align-items-center align-items-md-start margin">
        <p class="mb-0 infos-pages">
          Página {{ movieStore.currentPage }} de {{ movieStore.totalPages }}
        </p>
        <p class="info-results">Resultados: {{ movieStore.totalResults }}</p>
      </div>
    </div>
    <div class="col-md-4 col-12">
      <div class="container-info-results d-flex flex-column align-items-center align-items-md-start">
        <ul class="pagination">
          <li @click="prevPage" class="page-item">
            Voltar Página
          </li>
          <li @click="nextPage" class="page-item">
            Próxima Página
          </li>
        </ul>
      </div>
    </div>
    <div class="col-md-4 col-12">
      <div class="container-pagination d-flex justify-content-center">

      </div>
    </div>
    <div class="col-md-4 col-12"></div>
  </div>
</template>

<style scoped>
.underline {
  text-decoration: underline !important;
}
.margin-left{
  margin-left: 290px;
}
.title-text {
  font-weight: bold;
  font-size: 18px;
  max-height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

.margin {
  margin-left: 70px;
}

.page-item:hover {
  background-color: #0056b3;
}
</style>
