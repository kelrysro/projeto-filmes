<script setup>
import HeaderPage from '@/components/header/HeaderPage.vue';
import FooterPage from '@/components/footer/FooterPage.vue';
import { onMounted, ref } from 'vue';
import api from '@/plugin/axios';
import Loading from 'vue-loading-overlay'
const isLoading = ref(false);
const peoples = ref([]);
const props = defineProps({
    id: Number
});

const fetchPeopleDetail = async (id) => {
    try {
        const response = await api.get(`person/${id}?append_to_response=movie_credits,combined_credits`, {
            params: {
                language: 'pt-BR'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar os detalhes da pessoa:', error);
        return null;
    }
};

onMounted(async () => {
    isLoading.value = true;
    const peopleDetail = await fetchPeopleDetail(props.id);
    if (peopleDetail) {
        peoples.value = [peopleDetail];
    }
    isLoading.value = false;

});
</script>
<template>
    <header-page />
    <loading v-model:active="isLoading" is-full-page />

    <div v-for="person in peoples" :key="person.id">
        <div class="mt-4 p-0 container-fluid">
            <div class="d-flex flex-wrap">
                <div class="col-lg-4 col-md-4 col-12">
                    <div class="info text-md-left">
                        <img :src="`https://image.tmdb.org/t/p/w500${person.profile_path}`" width="350" class="img">
                        <div class="social">
                        </div>
                        <h3 class="mt-3">Informações pessoais</h3>
                        <div class="person-info">
                            <div class="info-item">
                                <h3>Conhecido(a) por</h3>
                                <p>{{ person.known_for_department }}</p>
                            </div>
                            <div class="info-item">
                                <h3>Gênero</h3>
                                <p v-if="person.gender === 1">Feminino</p>
                                <p v-else-if="person.gender === 2">Masculino</p>
                                <p v-else>Outro</p>
                            </div>
                            <div class="info-item">
                                <h3>Nascimento</h3>
                                <p>{{ person.birthday }}</p>
                            </div>
                            <div class="info-item">
                                <h3>Local de nascimento (em inglês)</h3>
                                <p>{{ person.place_of_birth }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-8 col-md-8 col-12">
                    <div class="panel">
                        <h1 class="d-none d-md-block font-weight-bold mb-4 text-md-left">
                            <h1 class="name">
                                {{ person.name }}
                            </h1>
                        </h1>
                        <div class="info-item text-md-left">
                            <h3>Biografia</h3>
                            <p class="biography-text">{{ person.biography }}</p>
                        </div>
                    </div>
                    <div class="mt-5">
                        <h3 class="mb-4 text-md-left">Conhecido(a) por</h3>
                        <div class="row mt-4">
                            <div v-for="credit in person.combined_credits.cast" :key="credit.id"
                                class="mb-3 col-lg-3 col-md-4 col-sm-6">
                                <div class="h-100 card">
                                    <div class="position-relative">
                                        <img :src="credit.poster_path ? `https://image.tmdb.org/t/p/w500${credit.poster_path}` : '@/assets/cast_placeholder.jpg'"
                                            alt="" class="card-img-top" style="height: 100%" />

                                    </div>
                                    <div class="card-body">
                                        <h6 class="card-title">{{ credit.title || credit.name }}</h6>
                                        <p class="card-text">{{ credit.character || '' }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <footer-page />
</template>

<style scoped>
p {
    font-size: 18px;
    font-weight: 300;
}

.row {
    margin-left: -5px;
    margin-right: -5px;
}

.card {
    border: none;
    transition: transform 0.2s;
}

.img {
    border-radius: 10px;
}

.card:hover {
    transform: scale(1.05);
}

.card-img-top {
    object-fit: cover;
    height: 100px;
    cursor: pointer;

}

.card-body {
    padding: 1rem;
    cursor: pointer;
}

.card-title {
    font-size: 1rem;
    margin-bottom: 0.5rem;
}

.card-text {
    font-size: 0.875rem;
    color: #6c757d;
}

.biography-text {
    white-space: pre-line;
}

.person-info h3 {
    font-size: 20px;
}
</style>
