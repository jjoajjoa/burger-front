<script setup>
import { ref } from 'vue';
import axios from 'axios';
import router from '@/router/index.js';
import MainHeader from '@/components/MainHeader.vue';
import MainFooter from '@/components/MainFooter.vue';

const burgercategory = ref([]);

//햄버거카테고리 리스트 받아오기
const burgerlist = async () => {
    try {
        const response = await axios.get('/api/burgerlist');
        burgercategory.value = response.data;
    } catch (error) {
        console.error('There was an error!', error);
        burgercategory.value = 'Error!';
    }
};

//햄버거를 클릭했을때 해당 카테고리 id를 가지고 페이지바꾸기
const burgerclick = (burgerId) => {
    // 페이지 이동 및 burgerId 전달
    router.push({ name: 'burgergame', params: { burgerId } });
    console.log(burgerId);
};

burgerlist();

</script>

<template>
    <MainHeader />
        <div class="app-main flex-column flex-row-fluid" id="kt_app_main">
            <div class="image-container position-relative">
                <img src="../../assets/images/menu-header.jpg" alt="Menu Header" class="menu-image">
                <h1 class="header-text">Menu</h1>
            </div>
            <div class="d-flex flex-column flex-column-fluid">
                <div id="kt_app_content" class="app-content flex-column-fluid">
                    <div id="kt_app_content_container" class="app-container container-xxl">
                        <div class="d-flex flex-column flex-xl-row">
                            <div class="container">
                                <!--버거선택 시작-->
                                <div class="mt-15"></div>
                                <div class="row">
                                    <div class="col-1"></div>
                                    <div class="col-10">
                                        <div class="row">
                                            <div class="col-4 d-flex flex-column align-items-center burger-category-item" style="cursor: pointer; transition: transform 0.3s ease;" v-for="(item) in burgercategory" :key="item.burgerId">
                                                <button @click="burgerclick(item.burgerId)" class="btn custom-btn"> <img src="@/assets/burger_img.png"> <br>{{ item.burgerName }}</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-1"></div>
                                </div>
                                <!--버거선택 끝-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <MainFooter />
</template>

<style scoped>

.burger-category-item:hover {
    transform: scale(1.1);
}

.custom-btn {
    border: none;
    transition: font-weight 0.3s ease;
}

.custom-btn:hover {
    font-weight: bold;
}

</style>