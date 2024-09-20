<script setup>
import { ref, onMounted } from 'vue';
import router from '@/router/index.js';
import axios from 'axios';
import MainHeader from '@/components/MainHeader.vue';
import MainFooter from '@/components/MainFooter.vue';

const user = ref({
    userName: '',
    userId: '',
});

const posts = ref([]);


// 현재 사용자가 로그인되어 있는지 확인
const isLoggedIn = ref(false);

// 서버에서 로그인 된 사용자 정보 가져옴
onMounted(async () => {
    try {
        const response = await axios.get('api/profile');
        if (response.status === 200) {
            const userData = response.data;
            user.value.userName = userData.userName;
            isLoggedIn.value = true; // 로그인 상태를 true로 변경
        } else {
            console.log("Response status:", response.status); // 응답 상태 로그
        }
    } catch (error) {
        console.error('사용자 정보를 가져오는 중 오류 발생:', error);
        isLoggedIn.value = false; // 로그인이 안 되어 있으면 false로 처리
    }
});

// 내가 작성한 게시글 목록 가져옴
onMounted(async () => {
    try {
        const response = await axios.get('api/myboard'); // 내가 작성한 게시글 목록 API 호출
        if (response.status === 200) {
            posts.value = response.data; // 서버에서 받은 데이터를 posts에 저장
        }
    } catch (error) {
        console.error('게시글을 가져오는 중 오류 발생:', error);
    }
});

// 내가 작성한 글 페이지로 이동 함수
function goToBoardInMypage() {
    router.replace({ path: '/myboard' });
}

// 개인정보수정 페이지로 이동 함수
function goToProfileInMypage() {
    router.replace({ path: '/mypage' });
}

function goToBoardDetail(boardPk) {
    router.push({ name: 'BoardDetail', params: { boardPk } });
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
                                <div class="level-main">{{ user.userName }}님의 햄버거만들기 </div>
                                <div class="level">LV.1</div>
                                <button class="menu-button">내가 만든 버거</button>
                                <button @click="goToBoardInMypage" class="menu-button">내가 쓴 게시물</button>
                                <button @click="goToProfileInMypage" class="menu-button">개인정보 수정</button>
                            </div>
                            
                            <div class="main-content">
                                <h3 class="title">내가 쓴 게시물</h3>
                                <table class="my-table">
                                    <thead>
                                        <tr>
                                            <th>번호</th>
                                            <th>제목</th>
                                            <th>일자</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(post, index) in posts" :key="index">
                                        <td>{{ index + 1 }}</td>
                                        <td><router-link @click="goToBoardDetail(post.boardPk)"
                                                :to="{ name: 'BoardDetail', params: { boardPk: post.boardPk } }">
                                                {{ post.boardTitle }}
                                            </router-link></td>
                                        <td>{{ post.boardRegDate }}</td>
                                        </tr>
                                    </tbody>
                                </table>
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
