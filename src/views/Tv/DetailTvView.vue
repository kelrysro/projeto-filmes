<script setup>
import { onMounted, ref } from 'vue';
import api from '@/plugin/axios';
import HeaderPage from '@/components/header/HeaderPage.vue';
import FooterPage from '@/components/footer/FooterPage.vue';
import Loading from 'vue-loading-overlay'
const isLoading = ref(false);

const tvs = ref([]);
const props = defineProps({
    id: Number
});

const showMoreCast = ref(false);
const maxVisibleCastMembers = 8;


onMounted(async () => {
    isLoading.value = true;
    const tvDetails = await fetchtvDetails(props.id);
    tvs.value = [tvDetails];
    isLoading.value = false;

});

const fetchtvDetails = async (id) => {
    try {
        const response = await api.get(`tv/${id}?language=pt-BR&append_to_response=credits,videos,keywords,imagens`, {
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar os detalhes do filme:', error);
        return {};
    }
};

const getGenreNames = (genres) => {
    return genres.map(genre => genre.name).join(', ');
};
const openTrailer = (videos) => {
    if (videos && videos.length > 0) {
        const trailerId = videos[0].key;
        const trailerUrl = `https://www.youtube.com/watch?v=${trailerId}`;
        window.open(trailerUrl, '_blank');
    } else {
        console.warn('Nenhum vídeo de trailer disponível.');
    }
    console.log('Abrir trailer:', videos);
};


const toggleShowMore = () => {
    showMoreCast.value = !showMoreCast.value;
};
const getKeywordsNames = (keywords) => {
    return keywords.results.map(keyword => keyword.name);
};

</script>


<template>
    <header-page />
    <loading v-model:active="isLoading" is-full-page />

    <div v-for="tv in tvs" :key="tv.id">
        <div class="image-bg-top d-flex flex-wrap justify-content-center" :style="{
            'background-image': `linear-gradient(to right, rgb(16, 14, 14) 150px, rgba(16, 14, 14, 0.84) 100%),url(https://image.tmdb.org/t/p/original${tv.backdrop_path})`
        }">
            <div class="d-flex flex-wrap py-4" style="width: 100%; max-width: 1144px;">
                <div class="col-md-4 col-12">
                    <div class="details-left text-center">
                        <img :src="`https://image.tmdb.org/t/p/w500${tv.poster_path}`" :alt="tv.title" width="350" />
                    </div>
                </div>
                <div class="col-md-8 col-12">
                    <div class="details-right text-md-left">
                        <h1 class="details-title my-4 my-md-0">
                            {{ tv.name }}
                        </h1>
                        <div class="d-flex flex-column flex-md-row">

                            <div class=" d-flex justify-content-center align-items-center container-gender">
                                <p> {{ getGenreNames(tv.genres) }}</p>
                            </div>
                        </div>
                        <button
                            class="mt-4 w-100 d-flex align-items-center justify-content-center  justify-content-md-start btn-trailer"
                            @click="openTrailer(tv.videos && tv.videos.results)">
                            <p class="ml-2 trailer">Reproduzir Trailer</p>
                        </button>
                        <div class="mt-4">
                            <h2>Sinopse</h2>
                            <p> {{ tv.overview }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-main d-flex flex-wrap">
            <div class="col-lg-8 col-md-8 col-12">
                <div class="panel">
                    <h1 class="mb-4 font-weight-bold text-center text-md-left mt-4 title-member">Elenco Principal</h1>
                    <div class="d-flex flex-wrap">
                        <div v-for="(castMember) in tv.credits.cast.slice(0, showMoreCast ? undefined : maxVisibleCastMembers)"
                            :key="castMember.id" class="mb-3 col-lg-3 col-sm-4 col-6 wid-card">
                            <router-link :to="`/detailPerson/${castMember.id}`" class="underline">
                                <div class="h-100 card">
                                    <img
                                    :src="`https://image.tmdb.org/t/p/w500${castMember.profile_path}`" />
                                    <div class="card-body">
                                        <h2 class="name-member">{{ castMember.name }}</h2>
                                        <p class="mt-1 char">{{ castMember.character }}</p>
                                    </div>
                                </div>
                            </router-link>
                        </div>
                    </div>
                    <div class="text-center">
                        <button class="btn-show-cast btn-lg" @click="toggleShowMore">
                            {{ showMoreCast ? 'ver menos' : 'ver mais' }}
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-lg-4 col-md-4 col-12">
                <div class="info text-center  text-md-left">
                    <div class="social d-flex mt-4 title-member">
                        <i class="bi bi-instagram"></i>
                        <i class="bi bi-twitter ml-5"></i>
                        <i class="bi bi-facebook ml-5"></i>
                    </div>
                    <div class="info-item ">
                        <h1>Título original</h1>
                        <p class="mt-4">
                            {{ tv.original_name }}
                        </p>
                    </div>
                    <div class="info-item ">
                        <h1>Situação</h1>
                        <p class="mt-4">
                            {{ tv.status }}
                        </p>
                    </div>
                    <div class="info-item ">
                        <h1>Emissora</h1>
                        <p class="mt-4">
                            <img v-if="tv.networks && tv.networks.length > 0"
                                :src="`https://image.tmdb.org/t/p/w200${tv.networks[0].logo_path}`"
                                :alt="tv.networks[0].name" />
                        </p>
                    </div>
                    <div class="info-item ">
                        <h1>Tipo</h1>
                        <p class="mt-4">
                            {{ tv.type }}
                        </p>
                    </div>
                    <div v-for="(keyword, index) in getKeywordsNames(tv.keywords)" :key="index"
                        class="d-flex mt-2 flex-wrap justify-content-center">
                        <div>
                            <p class="keyword-tag text-center">
                                {{ keyword }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <footer-page />
</template>

<style scoped>
.image-bg-top p {
    margin-bottom: 0 !important;
}
.underline{
    text-decoration: none;
}
.details-left {}

.details-right {
    color: white;
}

.details-title {
    font-weight: bold;
}

.details-title span {
    font-weight: normal;
}

.details-date {
    font-size: 18px;
}

.details-runtime {
    font-size: 18px;
}

.container-gender p {
    font-size: 18px;
}

@media screen and (min-width: 500px) {
    .container-gender::before {
        content: "";
        display: block;
        margin: 0 10px;
        width: 6px;
        height: 6px;
        background-color: white;
        border-radius: 999px;
    }

    .container-gender::after {
        content: "";
        display: block;
        margin: 0 10px;
        width: 6px;
        height: 6px;
        background-color: white;
        border-radius: 999px;
    }
}

.btn-trailer {
    background-color: Transparent;
    border: none;
    color: white;
}

.trailer {
    font-size: 22px;
    font-weight: bold;
}

.info-item {
    margin-top: 20px;
}

.info-item h3 {
    font-size: 22px;
    color: black;
    font-weight: bold;
}

.info-item p {
    font-size: 18px;
}

.keyword-tag {
    background-color: var(--light_gray);
    color: var(--darker_gray);
    padding: 4px 8px;
    border-radius: 6px;
    margin-right: 10px;
}

.details-about {
    margin: 24px auto 0;
}

.container-main {
    max-width: 1400px;
    clear: both;
    margin: 0 auto;
}

.info-opc {
    font-size: 20px;
}

.keyword-tag {
    background-color: #ddd;
    color: #666;
    padding: 4px 8px;
    border-radius: 6px;
    margin-right: 10px;
    font-size: 18px;
}

.info-item>h1 {
    margin-top: 20px;
    font-size: 30px;
    font-weight: bold;
}

.info-item>p {
    font-size: 21px;
    margin-left: 5px;
}

.card {
    position: relative;
    display: flex;
    width: 160px;
    flex-direction: column;
    cursor: pointer;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, .125);
    margin-left: 0.5rem;
    border-radius: 0.5rem;
}

.card-body {
    padding: 10px;
    flex: 1 1 auto;
    min-height: 1px;
}

.char {
    color: gray;
    font-size: 12px;
}

.title-member {
    font-size: 30px;
}

.name-member {
    font-size: 15px;
}
</style>