import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/plugin/axios'

export const useSearchStore = defineStore('search', () => {
  const state = reactive({
    search: [],
    searchTv: [],
    searchPerson: [],
    query: '',
    currentPage: 0,
  });

  const search = computed(() => state.search)
  const searchTv = computed(() => state.searchTv)
  const searchPerson = computed(() => state.searchPerson)

  const searchMovieFunction = async (param) => {
    const response = await api.get(`/search/multi?query=${param}&include_adult=false&language=pt-BR`);
    state.search = response.data.results;
    console.log('Movies:', state.search);
  };
  
  const searchTvFunction = async (param) => {
    const response = await api.get(`/search/tv?query=${param}&include_adult=false&language=pt-BR`);
    state.searchTv = response.data.results;
    console.log('TV shows:', state.searchTv);
  };
  
  const searchPersonFunction = async (param) => {
    const response = await api.get(`/search/person?query=${param}&include_adult=false&language=pt-BR`);
    state.searchPerson = response.data.results;
    console.log('Persons:', state.searchPerson);
  };
  const nextPage = async () => {
    const nextPage = state.currentPage + 1;
    await searchMovieFunction(state.query, nextPage);
    await searchPersonFunction(state.query, nextPage);
    await searchTvFunction(state.query, nextPage);
  };

  const backPage = async () => {
    const backPage = state.currentPage - 1;
    await searchMovieFunction(state.query, backPage);
    await searchPersonFunction(state.query, backPage);
    await searchTvFunction(state.query, backPage);
  };

  return {
    search,
    searchMovieFunction,
    nextPage,
    backPage,
    searchTv,
    searchTvFunction,
    searchPerson,
    searchPersonFunction,
  };
});
