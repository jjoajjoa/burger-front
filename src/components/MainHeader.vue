<script setup>
import router from '@/router/index.js';
import { ref, onMounted } from 'vue';

const isLoggedIn = ref(false); // 로그인 여부를 확인하는 상태 변수
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
const logout = () => {
    localStorage.removeItem('username'); // localStorage에서 사용자 정보 삭제
    isLoggedIn.value = false;
    router.replace({ path: '/' });  // 로그인 페이지로 이동
};

// 홈으로 이동 함수

function goToHome() {
    router.replace({ path: '/' });
}

// 로그인 페이지로 이동 함수
function goToLoginpage() {
    router.replace({ path: '/login' });
}

// 로그인 페이지로 이동 함수
function goToBoard() {
    router.replace({ path: '/board' });
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

</script>

<template>
    <header class="header">
        <div class="logo" @click="goToHome" style="cursor: pointer;">
            <h1>FIVE GIRLS</h1>
        </div>

        <nav class="navigation">
            <ul class="nav-center">
                <li><a href="#">Menu</a></li>
                <li><a href="#">Burger King</a></li>
                <li><a @click="goToBoard" href="#">Board</a></li>
                <li><a @click="goToMypage" href="#">My Page</a></li>
            </ul>
            <ul class="nav-right" style="cursor: pointer;">
                <li v-if="isLoggedIn">{{ username }}님</li>
                <li v-if="isLoggedIn"><a @click="logout">Logout</a></li>
                <li v-else><a @click="goToLoginpage">Login</a></li>
            </ul>
        </nav>
    </header>
</template>


<style scoped></style>
