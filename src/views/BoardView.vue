<script setup>
import MainHeader from '@/components/MainHeader.vue';
import MainFooter from '@/components/MainFooter.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import router from '@/router/index.js';

// 로그인 여부를 확인하는 상태 변수
const isLoggedIn = ref(false);

// 게시글 리스트를 저장하는 배열 : 서버에서 받아온 게시글 데이터를 담음
const posts = ref([]);

// 서버에서 게시글을 가져오는 API
onMounted(async () => {
    try {
        const response = await axios.get('api/boardlist'); 
        if (response.status === 200) {
            posts.value = response.data;
        }
    } catch (error) {
        console.error('게시글을 가져오는 중 오류 발생:', error);
    }

    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
        isLoggedIn.value = true;
    }
});

// 게시글 추가로 이동 함수
function goToCreateboard() {
    if (isLoggedIn.value) {
        router.replace({ path: '/createboard' });
    } else {
        alert('로그인이 필요합니다.');
        goToLoginpage(); // 로그인 안 된 상태에서 게시글 추가 접근 시 로그인 페이지로 이동
    }
}

// 게시글 상세로 이동 함수
function goToBoardDetail() {
    if (!isLoggedIn.value) { alert('로그인이 필요합니다.');
        goToLoginpage(); // 로그인 안 된 상태에서 게시글 추가 접근 시 로그인 페이지로 이동
    }
}

// 로그인 페이지로 이동 함수
function goToLoginpage() {
    router.replace({ path: '/login' });
}

</script>

<template>
    <MainHeader />

    <div class="app-main flex-column flex-row-fluid" id="kt_app_main" style="flex-grow: 1; overflow: auto;">
        <div class="d-flex flex-column flex-column-fluid"
            style="flex-grow: 1; justify-content: center; align-items: center;">
            <div id="kt_app_content" class="app-content flex-column-fluid"
                style="flex-grow: 1; display: flex; flex-direction: column;">
                <div id="kt_app_content_container" class="app-container container-xxl"
                    style="flex-grow: 1; padding: 50px 0; display: flex; justify-content: center; align-items: center;">
                    <div class="d-flex flex-column flex-xl-row"
                        style="flex-grow: 1; justify-content: center; align-items: center;">
                        <div class="board-container">
                            <h3 class="title">게시판</h3>
                            <table class="board-table">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>제목</th>
                                        <th>글쓴이</th>
                                        <th>작성일자</th>
                                        <th>조회수</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(post, index) in posts" :key="index">
                                        <td>{{ index + 1 }}</td> <!-- 번호 역순 -->
                                        <td><router-link @click="goToBoardDetail()"
                                                :to="{ name: 'BoardDetail', params: { boardPk: post.boardPk } }">
                                                {{ post.boardTitle }}
                                            </router-link></td>
                                        <td >{{ post.userName }}</td>
                                        <td>{{ post.boardRegDate }}</td>
                                        <td>{{ post.boardViewCount }}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <button @click="goToCreateboard()" class="write-btn">작성하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <MainFooter />
</template>

<style scoped>

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

.board-container {
    width: 1000px;
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.board-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
}

.board-table th,
.board-table td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
}

.board-table th {
    background-color: #d81f26;
    color: white;
    font-weight: bold;
}

.board-table td {
    background-color: #fff3f3;
    color: #333;
}

.write-btn {
    padding: 10px 20px;
    background-color: #d81f26;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    text-align: center;
    font-weight: bold;
}

.write-btn:hover {
    background-color: #d81f26;
}
</style>
