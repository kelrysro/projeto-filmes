import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import api from '@/plugin/axios';

export const useMovieStore = defineStore('movie', () => {
  const state = reactive({
    movies: [],
    filteredMovies: [],
    currentPage: 1,
    totalPages: 0,
    totalResults: 0,
    selectedYear: null,
  });

  const movies = computed(() => state.movies);
  const filteredMovies = computed(() => state.filteredMovies);
  const currentPage = computed(() => state.currentPage);
  const totalPages = computed(() => state.totalPages);
  const totalResults = computed(() => state.totalResults);
  const selectedYear = computed(() => state.selectedYear);

  const getAllMovie = async (genreId = null, page = 1) => {
    try {
      const params = {
        language: 'pt-BR',
        page: page,
        with_genres: genreId,
        primary_release_year: selectedYear.value,
      };

      const response = await api.get('discover/movie', { params });
      state.movies = response.data.results;
      state.totalPages = response.data.total_pages;
      state.totalResults = response.data.total_results;
    } catch (error) {
      console.error('Erro ao buscar os filmes:', error);
    }
    state.filteredMovies = state.movies;
  };

  const filterMoviesByGenre = (genreId) => {
    if (!genreId) {
      state.filteredMovies = state.movies;
    } else {
      state.filteredMovies = state.movies.filter((movie) => movie.genre_ids.includes(genreId));
    }
  };

  const filterMoviesByYear = (year, genreId) => {
    state.selectedYear = year;
    getAllMovie(genreId);
  };
  

  const getMoviesByPage = (page) => {
    state.currentPage = page;
    getAllMovie(null, page);
  };

  const nextPage = () => {
    if (state.currentPage < state.totalPages) {
      getMoviesByPage(state.currentPage + 1);
    }
  };

  const prevPage = () => {
    if (state.currentPage > 1) {
      getMoviesByPage(state.currentPage - 1);
    }
  };

  return { movies, filteredMovies, currentPage, totalPages, totalResults, selectedYear, getAllMovie, filterMoviesByGenre, filterMoviesByYear, getMoviesByPage, nextPage, prevPage };
});
