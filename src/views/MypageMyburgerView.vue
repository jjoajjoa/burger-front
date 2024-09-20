<script setup>
import { ref, onMounted } from 'vue';
import router from '@/router/index.js';
import axios from 'axios';
import MainHeader from '@/components/MainHeader.vue';
import MainFooter from '@/components/MainFooter.vue';

const IngrListByUserPk = ref([]);

onMounted(() => {
    IngrClick();
});

//
const IngrClick = async () => {
    try {
        const response = await axios.post('/api/getIngrListbyUserPk');
        IngrListByUserPk.value = response.data;
        console.log(IngrListByUserPk.value);

    } catch (error) {
        console.error('There was an error!', error);
        IngrListByUserPk.value = 'Error!';
    }
};

// 내가 작성한 글 페이지로 이동 함수
function goToBoardInMypage() {
    router.replace({ path: '/myboard' });
}

//내가 만든 버거로 이동함수
function goToMyburgerInmypage() {
    router.replace({ path: '/myburger' });
}

//개인정보 수정화면으로 이동 함수
function goToProfileInMypage() {
    router.replace({ path: '/mypage' });
}

</script>

<template>
    <MainHeader />
    <div class="app-main flex-column flex-row-fluid" id="kt_app_main" style="flex-grow: 1; overflow: auto;">
        <div class="d-flex flex-column flex-column-fluid" style="flex-grow: 1; justify-content: center; align-items: center;">
            <div id="kt_app_content" class="app-content flex-column-fluid" style="flex-grow: 1; display: flex; flex-direction: column;">
                <div id="kt_app_content_container" class="app-container container-xxl" style="flex-grow: 1; padding: 50px 0; display: flex; justify-content: center; align-items: center;">
                    <div class="d-flex flex-column flex-xl-row" style="flex-grow: 1; justify-content: center; align-items: center;">

                        <div class="profile-container">

                            <div class="sidebar" style="margin-right: 20px;">
                                <!--<div class="level-main">{{ user.userName }}님의 햄버거만들기 </div>-->
                                <div class="level">LV.1</div>
                                <button @click="goToMyburgerInmypage" class="menu-button">내가 만든 버거</button>
                                <button @click="goToBoardInMypage" class="menu-button">내가 쓴 게시물</button>
                                <button @click="goToProfileInMypage" class="menu-button">개인정보 수정</button>
                            </div>
                            
                            <div class="main-content">
                                <h3 class="title">내가 만든 버거</h3>
                                <table class="my-table">
                                    <thead>
                                        <tr>
                                            <th class="col-2">버거 카테고리</th>
                                            <th class="col-10">내가 만든 버거</th>
                                        </tr>
                                    </thead>
                                </table>
                                <div class="container">
                                    <div class="row">
                                        <div class="col-1">
                                        냠냠
                                        </div>
                                        <div class="col-11">
                                            <div class="card">
                                                <div v-for="(item) in IngrListByUserPk" :key="item.ingrPk">
                                                    <!-- 수량만큼 재료를 반복해서 보여줌 -->
                                                    <div v-for="n in item.ingrUsageQuantity" :key="n" class="row">
                                                        <div class="imageContainer2 col-10">
                                                            <img :src="require('@/assets' + item.ingrSideUrl)"  class="ingrImage2">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="pagination">
                                    <span>
                                        1, 2, 3, 4, 5
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <MainFooter />
</template>

<style scoped>

.imageContainer2 {
    display: flex;
    flex-direction: row;
    align-items: center; 
    width: 400px;
    height: 70px;
}

.ingrImage2 {
    width: 300px;
    height: auto;
    object-fit: contain;
    margin-right: 10px;
}

.profile-container {
    display: flex;
}

.sidebar {
    width: 300px;
    background-color: #222;
    color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.level-main {
    margin-top: 20px;
    font-size: 19px;
    text-align: center;
    font-family: "Diphylleia", sans-serif;
}

.level {
    font-size: 50px;
    font-weight: 800;
    margin-bottom: 30px;
    text-align: center;
    font-family: "Diphylleia", sans-serif;
}

.menu-button {
    display: block;
    width: 100%;
    padding: 10px 13px;
    margin-bottom: 20px;
    background-color: #d81f26;
    color: #fff;
    border: none;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-size: 15px;
    font-weight: 800;
}

.main-content {
    width: 700px;
    padding: 25px;
    background-color: #f7f7f7;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.my-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

.my-table th,
.my-table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
}

.my-table th {
    background-color: #333;
    color: white;
    font-weight: bold;
}

.my-table td {
    background-color: #f7f7f7;
    color: #333;
}

.pagination {
    text-align: center;
    margin-top: 20px;
}

.pagination span {
    font-size: 16px;
    cursor: pointer;
}

.profile-container {
    display: flex;
}

.sidebar {
    width: 300px;
    background-color: #222;
    color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.level-main {
    margin-top: 20px;
    font-size: 19px;
    text-align: center;
    /* 글씨를 가운데 정렬 */
    font-family: "Diphylleia", sans-serif;
    /* Black Han Sans 글씨체 적용 */
}

@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Diphylleia&display=swap');

.level {
    font-size: 50px;
    font-weight: 800;
    margin-bottom: 30px;
    text-align: center;
    /* 글씨를 가운데 정렬 */
    font-family: "Diphylleia", sans-serif;
    /* Black Han Sans 글씨체 적용 */
}

.menu-button {
    display: block;
    width: 100%;
    padding: 10px 13px;
    margin-bottom: 20px;
    background-color: #d81f26;
    color: #fff;
    border: none;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-size: 15px;
    font-weight: 800;
}

.title {
    display: block;
    width: 100%;
    padding: 20px;
    margin-bottom: 30px;
    background-color: #d81f26;
    color: #fff;
    border: none;
    cursor: pointer;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.main-content {
    width: 700px;
    padding: 25px;
    background-color: #f7f7f7;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.info-group {
    display: flex;
    padding: 5px;
    margin-bottom: 30px;
    font-size: 15px;
}

.info-group label {
    width: 100px;
    font-size: 18px;
}

.info-group input {
    flex-grow: 1;
    padding: 5px;
}

.form-actions {
    display: flex;
    justify-content: right;
    margin-top: 20px;
}

</style>
