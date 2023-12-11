import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MovieView from '@/views/Movie/MovieView.vue'
import DetailMovieView from '@/views/Movie/DetailMovieView.vue'
import TvView from '@/views/Tv/TvView.vue'
import DetailTvView from '@/views/Tv/DetailTvView.vue'
import PersonView from '@/views/Person/PersonView.vue'
import DetailPersonView from '@/views/Person/DetailPersonView.vue'
import SearchView from '@/views/Others/SearchView.vue'
import SearchTvView from '@/views/Others/SearchTvView.vue'
import SearchPersonView from '@/views/Others/SearchPersonView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/movie',
      name: 'movie',
      component: MovieView
    },
    {
      path: '/tv',
      name: 'tv',
      component: TvView
    },
    {
      path: '/person',
      name: 'person',
      component: PersonView
    },
    {
      path: '/movie',
      name: 'movie',
      component: MovieView
    },
    {
      path: '/detailMovie/:id',
      name: 'detailMovie',
      component: DetailMovieView,
      props: true
    },
    {
      path: '/detailTv/:id',
      name: 'detailTv',
      component: DetailTvView,
      props: true
    },
    {
      path: '/detailPerson/:id',
      name: 'detailPerson',
      component: DetailPersonView,
      props: true
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView
    },
    {
      path: '/searchTv',
      name: 'searchTv',
      component: SearchTvView
    },
    {
      path: '/searchPerson',
      name: 'searchPerson',
      component: SearchPersonView
    }
  ]
})

export default router

