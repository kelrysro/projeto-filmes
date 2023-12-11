import { reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import api from '@/plugin/axios'

export const useTvStore = defineStore('tv', () => {
  const state = reactive({
    tvShows: [],
    filteredTvShows: [],
    currentPage: 1,
    totalPages: 0,
    totalResults: 0,
    selectedYear: null, 
  })

  const tvShows = computed(() => state.tvShows)
  const filteredTvShows = computed(() => state.filteredTvShows)
  const currentPage = computed(() => state.currentPage)
  const totalPages = computed(() => state.totalPages)
  const totalResults = computed(() => state.totalResults)
  const selectedYear = computed(() => state.selectedYear) 

  const getAllTvShows = async (genreId = null) => {
    try {
      const params = {
        language: 'pt-BR',
        page: state.currentPage,
        with_genres: genreId,
        first_air_date_year: selectedYear.value, 
      }

      const response = await api.get('discover/tv', { params })
      state.tvShows = response.data.results
      state.totalPages = response.data.total_pages
      state.totalResults = response.data.total_results
    } catch (error) {
      console.error('Erro ao buscar os programas de TV:', error)
    }
    state.filteredTvShows = state.tvShows
  }

  const filterTvShowsByGenre = (genreId) => {
    if (!genreId) {
      state.filteredTvShows = state.tvShows
    } else {
      state.filteredTvShows = state.tvShows.filter((show) => show.genre_ids.includes(genreId))
    }
  }

  const filterTvShowsByYear = (year) => {  
    state.selectedYear = year;
    getAllTvShows();
  }

  const getTvShowsByPage = (page) => {
    state.currentPage = page
    getAllTvShows()
  }

  const nextPage = () => {
    if (state.currentPage < state.totalPages) {
      getTvShowsByPage(state.currentPage + 1)
    }
  }

  const prevPage = () => {
    if (state.currentPage > 1) {
      getTvShowsByPage(state.currentPage - 1)
    }
  }

  return {
    tvShows,
    filteredTvShows,
    currentPage,
    totalPages,
    totalResults,
    selectedYear,
    getAllTvShows,
    filterTvShowsByGenre,
    filterTvShowsByYear,
    getTvShowsByPage,
    nextPage,
    prevPage,
  }
})
