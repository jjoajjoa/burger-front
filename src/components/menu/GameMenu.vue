<script setup>
import { ref } from 'vue';
import axios from 'axios';
import router from '@/router/index.js'

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
    <div class="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper" style="height: 100vh;">
        <div class="app-main flex-column flex-row-fluid" id="kt_app_main">
            <div class="d-flex flex-column flex-column-fluid">
                <div id="kt_app_content" class="app-content flex-column-fluid">
                    <div id="kt_app_content_container" class="app-container container-xxl">
                        <div class="d-flex flex-column flex-xl-row">
                            <div class="container">
                                <!--메뉴사진 시작-->
                                <div class="row" style="height:200px;">
                                    <div class="col-12">
                                        <div>
                                            <img src="@/assets/menu_burger.png"
                                            style="width: 100%; height: 100%; object-fit: cover;">
                                        </div>
                                    </div>
                                </div>
                                <!--메뉴사진 끝-->
                                <!--버거선택 시작-->
                                <div class="mt-15"></div>
                                <div class="row">
                                    <div class="col-1"></div>
                                    <div class="col-10">
                                        <div class="row">
                                            <div class="col-4 d-flex flex-column align-items-center burger-category-item" style="cursor: pointer; transition: transform 0.3s ease;" v-for="(item) in burgercategory" :key="item.burgerId">
                                                <img src="@/assets/burger_img.png">
                                                <button @click="burgerclick(item.burgerId)" class="btn custom-btn">{{ item.burgerName }}</button>
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
    </div>
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