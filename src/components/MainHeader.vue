<script setup>
import router from '@/router/index.js';
import axios from 'axios';
import { ref, onMounted } from 'vue';

const isLoggedIn = ref(false);
const username = ref('');

// 컴포넌트가 마운트될 때 localStorage에서 사용자 이름을 가져옴
onMounted(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
        isLoggedIn.value = true;
        username.value = storedUsername;
    }
});

// 로그아웃 함수
const logout = async () => {
    try {
        // 서버에 로그아웃 요청 (세션 무효화)
        const response = await axios.post('/api/logout');  // 경로 확인
        if (response.status === 200) {
            localStorage.removeItem('username'); // localStorage에서 사용자 정보 삭제
            isLoggedIn.value = false;


            router.replace({ path: '/' }); // 로그아웃 후 메인 페이지로 리다이렉트
        }
    } catch (error) {
        console.error('로그아웃 중 오류 발생:', error);
    }
};

// 홈으로 이동 함수
function goToHome() {
    router.replace({ path: '/' });
}

// 로그인 페이지로 이동 함수
function goToLoginpage() {
    router.replace({ path: '/login' });
}

// 마이페이지로 이동 함수
function goToMypage() {
    if (isLoggedIn.value) {
        router.replace({ path: '/mypage' });
    } else {
        alert('로그인이 필요합니다.');
        goToLoginpage(); // 로그인 안 된 상태에서 마이페이지 접근 시 로그인 페이지로 이동
    }
}

// 게시판 페이지로 이동 함수
function goToBoard() {
    router.replace({ path: '/board' });
}

// 버거킹 페이지로 이동 함수
function goToBurgerking() {
    router.replace({ path: '/burgerking' });
}
</script>

<template>
    <header class="header">
        <div class="logo cursor-pointer" @click="goToHome">
            <h1>FIVE GIRLS</h1>
        </div>

        <nav class="navigation">
            <ul class="nav-center">
                <li><a href="#" class="cursor-pointer">Menu</a></li>
                <li><a @click="goToBurgerking" class="cursor-pointer">Burger King</a></li>
                <li><a @click="goToBoard" class="cursor-pointer">Board</a></li>
                <li><a @click="goToMypage" class="cursor-pointer">My Page</a></li>
            </ul>
            <ul class="nav-right cursor-pointer">
                <li v-if="isLoggedIn">{{ username }}님</li>
                <li v-if="isLoggedIn"><a @click="logout" class="cursor-pointer">Logout</a></li>
                <li v-else><a @click="goToLoginpage" class="cursor-pointer">Login</a></li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>
/* 스타일을 여기에 추가하세요 */
</style>
