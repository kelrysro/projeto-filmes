<script setup>
import { onMounted, ref } from 'vue'
import { usePeopleStore } from '@/stores/person.js'
import Loading from 'vue-loading-overlay'
const isLoading = ref(false)
const peopleStore = usePeopleStore()
onMounted(async () => {
  isLoading.value = true
  await peopleStore.getAllPeople()
  isLoading.value = false
})
const nextPage = async () => {
  isLoading.value = true;
  await peopleStore.nextPage();
  isLoading.value = false;
}
const prevPage = async () => {
  isLoading.value = true;
  await peopleStore.backPage();
  isLoading.value = false;
}
</script>

<template>
  <div class="container-fluid">
    <div class="row">
      <loading v-model:active="isLoading" is-full-page />

      <div
        v-for="people in peopleStore.peoples"
        :key="people.id"
        class="col-lg-3 col-md-4 col-sm-6 col-12"
      >
        <div class="mt-5">
          <router-link :to="`/detailPerson/${people.id}`" class="underline">
            <div class="h100 card">
              <div class="img">
                <img
                  :src="
                    people.profile_path
                      ? `https://image.tmdb.org/t/p/w500${people.profile_path}`
                      : '@/assets/cast_placeholder.jpg'
                  "
                  :alt="people.name"
                  class="position-relative"
                  width="260"
                />
              </div>
              <div class="card-body">
                <div class="title">
                  <p class="title-text underline">{{ people.name }}</p>
                </div>
                <div class="card-text">
                  {{ people.known_for.overview }}
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
          Página {{ peopleStore.currentPage }} de {{ peopleStore.totalPages }}
        </p>
        <p class="info-results">Resultados: {{ peopleStore.totalResults }}</p>
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
