<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import MainHeader from '@/components/MainHeader.vue';
import MainFooter from '@/components/MainFooter.vue';

const burgerTypes = ref([
    { id: 1, name: 'BURGUNDY' },
    { id: 2, name: '김숙자 버거' },
    { id: 3, name: '존버.거' },
    { id: 4, name: '먹다남은버거' },
    { id: 5, name: '치즈없으면난못해' }
]);

const burgerRankings = ref({});

const fetchRankings = async () => {
    try {

        // const [topResponse, bottomResponse] = await Promise.all([
        //     axios.get('/api/burgergameking'),
        //     axios.get('/api/burgergamepoor')
        // ]);

        const topResponse = await axios.get('/api/burgergameking');
        const bottomResponse = await axios.get('/api/burgergamepoor');

        console.log('topResponse >>>>>', topResponse);
        console.log('>>>>>', topResponse.data[0].burgerPk);
        console.log('bottomResponse >>>>>', bottomResponse);

        /////////////////////////////////////////////////////////////////////////////////

        const rankings = {};

        for (const burger of burgerTypes.value) {
            rankings[burger.id] = {
                top: topResponse.data,
                bottom: bottomResponse.data
            };
        }

        burgerRankings.value = rankings;
    } catch (error) {
        console.error('BurgerKingView Err >>>>>', error);
    }
};

// 컴포넌트 마운트 시 데이터 가져오기
onMounted(() => {
    fetchRankings();
});
</script>

<template>
    <MainHeader />

    <div class="app-main flex-column flex-row-fluid" id="kt_app_main">
        <div class="image-container position-relative">
            <img src="../assets/images/menu-header.jpg" alt="Menu Header" class="menu-image">
            <h1 class="header-text">Burger King</h1>
        </div>

        <div class="d-flex flex-column flex-column-fluid justify-content-center align-items-center olive">
            <div id="kt_app_content_container"
                class="app-container container-xxl d-flex my-10 flex-wrap justify-content-between align-items-center">
                <div v-for="burger in burgerTypes" :key="burger.id" class="card-container-burger">
                    <h1>{{ burger.name }}</h1>
                    <div class="card-burger" v-if="burgerRankings[burger.id] && burgerRankings[burger.id].top">
                        <h2>버거킹</h2>
                        <p v-for="(item, index) in burgerRankings[burger.id].top" :key="'top-' + index">{{ index + 1 }}등
                            : {{ item.user_name }}</p>
                    </div>
                    <div class="card-burger" v-else>
                        <h2>버거킹</h2>
                        <p>데이터가 없습니다</p>
                    </div>
                    <div class="card-burger" v-if="burgerRankings[burger.id] && burgerRankings[burger.id].bottom">
                        <h2>버거지</h2>
                        <p v-for="(item, index) in burgerRankings[burger.id].bottom" :key="'bottom-' + index">{{ index +
                            1 }}등 : {{ item.user_name }}</p>
                    </div>
                    <div class="card-burger" v-else>
                        <h2>버거지</h2>
                        <p>데이터가 없습니다</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <MainFooter />
</template>
