<script setup>
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import {ref} from 'vue'

const pictures = ref([
  {
    'src': 'https://ottvsimg.ottvs.com.br/res/banner/d6bd3b3e-fd6a-4005-b76c-7679c89daf45.jpg',
  },
  {
    'src': 'https://ottvsimg.ottvs.com.br/res/banner/4c3610f7-ff22-478f-bdbf-338e93cbffbe.jpg',
  },
  {
    'src': 'https://ottvsimg.ottvs.com.br/res/banner/3d37aa16-2f0f-482d-bb6d-375e94b5da7a.jpg',
  },
  {
    'src': 'https://ottvsimg.ottvs.com.br/res/banner/7d74b9bb-29bb-4ddb-9774-5d16095841ba.jpg',
  },
])
</script>

<template>
    <carousel :items-to-show="1">
      <slide v-for="slide in pictures" :key="slide">
        <img :src="slide.src"/>
      </slide>
      <template #addons>
        <navigation />
        <pagination />
      </template>
    </carousel>
  </template>
  