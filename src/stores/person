import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/plugin/axios'

export const usePeopleStore = defineStore('people', () => {
  const state = reactive({
    peoples: [],
    currentPage: 1,
    totalPages: 0,
    totalResults: 0
  })

  const peoples = computed(() => state.peoples)
  const currentPage = computed(() => state.currentPage)
  const totalPages = computed(() => state.totalPages)
  const totalResults = computed(() => state.totalResults)

  const getAllPeople = async (page = 1) => {
    try {
      const response = await api.get(`/person/popular?language=pt-BR&page=${page}`);
      state.peoples = response.data.results;
      state.currentPage = page;
      state.totalPages = response.data.total_pages;
      state.totalResults = response.data.total_results;
    } catch (error) {
      console.error('Erro ao buscar as pessoas:', error);
    }
  }

  const nextPage = () => {
    if (state.currentPage < state.totalPages) {
      getAllPeople(state.currentPage + 1);
    }
  }

  const backPage = () => {
    if (state.currentPage > 1) {
      getAllPeople(state.currentPage - 1);
    }
  }

  return { peoples, getAllPeople, nextPage, backPage, currentPage, totalPages, totalResults }
})
