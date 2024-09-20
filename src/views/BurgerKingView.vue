<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import axios from 'axios';
import MainHeader from '@/components/MainHeader.vue';
import MainFooter from '@/components/MainFooter.vue';

const burgerTypes = ref([
    { id: 1, name: 'BURGUNDY' },
    { id: 2, name: '김숙자 버거' },
    { id: 3, name: '존버.거' }
]);

const burgerRankings = ref({});
let intervalId = null;

const fetchRankings = async () => {
    try {
        const [topResponse, bottomResponse] = await Promise.all([
            axios.get('/api/burgergameking'),
            axios.get('/api/burgergamepoor'),
        ]);

        //console.log(topResponse.data);

        const rankings = {};

        for (const burger of burgerTypes.value) {
            const topData = topResponse.data.filter(item => item.burgerPk === burger.id);
            const bottomData = bottomResponse.data.filter(item => item.burgerPk === burger.id);

            rankings[burger.id] = {
                top: topData.length > 0 ? topData : null,
                bottom: bottomData.length > 0 ? bottomData : null
            };
        }

        burgerRankings.value = rankings;
    } catch (error) {
        console.error('BurgerKingView Err >>>>>', error);
    }
};

onMounted(() => {
    fetchRankings();
    intervalId = setInterval(fetchRankings, 5000); //5초마다새로고침
});

onUnmounted(() => {
    if (intervalId) {
        clearInterval(intervalId);
    }
});
</script>

<template>
    <MainHeader />

    <div class="app-main flex-column flex-row-fluid" id="kt_app_main">
        <div class="image-container position-relative">
            <img src="../assets/images/menu-header.jpg" alt="Menu Header" class="menu-image">
            <h1 class="header-text">Burger King</h1>
        </div>

        <div class="d-flex flex-column flex-column-fluid justify-content-center align-items-center">
            <div id="kt_app_content_container" class="app-container container-xxl d-flex my-10 flex-wrap justify-content-between align-items-center">

                <div v-for="burger in burgerTypes" :key="burger.id" class="card-container-burger">
                    <!-- 버거 이름 -->
                    <h1>{{ burger.name }}</h1>

                    <!-- 버거킹 -->
                    <div class="card-burger-king" v-if="burgerRankings[burger.id] && burgerRankings[burger.id].top">
                        <h2>버거킹</h2>
                        <p v-for="(item, index) in burgerRankings[burger.id].top" :key="'top-' + index" class="rank-info">
                            <span>{{ index + 1 }}등</span> {{ item.userName }} ({{ item.gameScore }}점)
                        </p>
                    </div>
                    <div class="card-burger-king" v-else>
                        <h2>버거킹</h2>
                        <p>데이터가 없습니다</p>
                    </div>

                    <!-- 버거지 -->
                    <div class="card-burger-poor" v-if="burgerRankings[burger.id] && burgerRankings[burger.id].bottom">
                        <h2>버거지</h2>
                        <p v-for="(item, index) in burgerRankings[burger.id].bottom" :key="'bottom-' + index" class="rank-info">
                            <span>{{ index + 1 }}등</span> {{ item.userName }} ({{ item.gameScore }}점)
                        </p>
                    </div>
                    <div class="card-burger-poor" v-else>
                        <h2>버거지</h2>
                        <p>데이터가 없습니다</p>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <MainFooter />
</template>
