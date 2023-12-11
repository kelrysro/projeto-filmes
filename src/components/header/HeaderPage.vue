<script setup>
import { ref } from 'vue';
import {  useRouter } from 'vue-router';
import { useSearchStore } from '@/stores/search';

const useSearch =  new useSearchStore();

const currentRoute = ref(null);
const router = useRouter();
const termSearch = ref('');

function searchButton() {
  console.log('Search button clicked');
  console.log('Term:', termSearch.value);
  useSearch.searchMovieFunction(termSearch.value);
  useSearch.searchTvFunction(termSearch.value);
  useSearch.searchPersonFunction(termSearch.value);
  router.push({ name: 'search' });
}

</script>

<template>
  <div class="container-header">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="logo navbar-brand">
        <router-link :to="{ name: 'home' }" class="nav-link" :class="{ 'active-link': currentRoute === 'home' }">
          <img src="@/assets/logo-tmdb.svg" alt="">
        </router-link>
      </div>
      <div class="nav-collapse">
        <div class="mr-auto navbar-nav">
          <router-link :to="{ name: 'home' }" class="nav-link" :class="{ 'active-link': currentRoute === 'home' }">
            Explorar
          </router-link>
          <router-link :to="{ name: 'movie' }" class="nav-link" :class="{ 'active-link': currentRoute === 'movie' }">
            Filmes
          </router-link>
          <router-link :to="{ name: 'tv' }" class="nav-link" :class="{ 'active-link': currentRoute === 'tv' }">
            Séries
          </router-link>
          <router-link :to="{ name: 'person' }" class="nav-link" :class="{ 'active-link': currentRoute === 'person' }">
            Pessoas
          </router-link>
        </div>
      </div>
      <form class="form-inline d-flex form-header">
        <input type="text" placeholder="Filmes, Séries ou Pessoas..." class="form-control mr-4" v-model="termSearch">
        <button class="button-primary btn-search btn btn-primary" type="button" @click="searchButton">Pesquisar</button>
      </form>
    </nav>
  </div>
</template>

<style scoped>
.container-header {
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  background-color: var(--brand_blue);
}

.container-header .navbar {
  background-color: var(--brand_blue) !important;
}

.container-header nav {
  width: 1144px;
}

.container-header .logo {
  width: 200px;
  cursor: pointer;
}

.button-primary {
  background: linear-gradient(
    to right,
    var(--light_green) 0%,
    var(--light_blue) 100%
  );
  border: none;
}

.form-header {
  margin-left: 21.8rem;
}

.active-link {
  color: var(--light_green) !important;
}
</style>
