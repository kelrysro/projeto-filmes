<script setup>
import HeaderPage from '@/components/header/HeaderPage.vue';
import FooterPage from '@/components/footer/FooterPage.vue';
import CarroselMain from '@/components/CarroselMain.vue';
import CardMain from '@/components/main/CardMain.vue';
import CardMainMovie from '@/components/main/CardMainMovie.vue';

</script>

<template>
<header-page/>
  <div>
    <carrosel-main/>
    <card-main/>
    <card-main-movie/>
  </div>
  <footer-page/>
</template>

