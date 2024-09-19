<script setup>
import { ref } from 'vue';
import axios from 'axios';
import router from '@/router/index.js';

import MainHeader from '@/components/MainHeader.vue';

const username = ref('');
const password = ref('');

function goToSignUp() {
    router.replace({ path: '/signup' });
}

function goToFindAccount() {
    router.replace({ path: '/findaccount' });
}

const login = async () => {
    try {
        const response = await axios.post('/api/login', {
            userId: username.value,
            userPw: password.value,
        });

        if (response.data) {
            localStorage.setItem('username', response.data.userName);
            localStorage.setItem('userPk', response.data.userPk);
            router.push({ path: '/' }); // 로그인 성공 시 메인 페이지로 이동
        } else {
            alert('로그인 실패');
        }
    } catch (error) {
        console.error('로그인 오류:', error);
    }
};
</script>

<template>

    <MainHeader />

    <div class="app-main flex-column flex-row-fluid" id="kt_app_main" style="flex-grow: 1; overflow: auto;">
        <div class="d-flex flex-column flex-column-fluid" style="flex-grow: 1; justify-content: center; align-items: center;">
            <div id="kt_app_content" class="app-content flex-column-fluid" style="flex-grow: 1; display: flex; flex-direction: column;">
                <div id="kt_app_content_container" class="app-container container-xxl" style="flex-grow: 1; padding: 50px 0; display: flex; justify-content: center; align-items: center;">
                    <div class="d-flex flex-column flex-xl-row" style="flex-grow: 1; justify-content: center; align-items: center;">

                        <form class="login-form" @submit.prevent="login" v-if="!isLoggedIn">

                            <input v-model="username" type="id" placeholder="아이디" class="input-field" />
                            <input v-model="password" type="password" placeholder="비밀번호" class="input-field" />

                            <button type="submit" class="login-btn">로그인</button>

                            <div class="additional-links">
                                <a @click="goToSignUp" href="#">회원가입</a>
                                <a @click="goToFindAccount" href="#">아이디 · 비밀번호 찾기</a>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f9f9f9;
}

.login-form {
    background-color: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 400px;
    text-align: center;
}

h2 {
    margin-bottom: 10px;
    font-size: 18px;
}

p {
    font-size: 12px;
    color: #777;
    margin-bottom: 20px;
}

.input-field {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.login-options label {
    font-size: 12px;
    color: #555;
}

.login-btn {
    width: 100%;
    padding: 10px;
    background-color: #D32F2F;
    border: none;
    color: white;
    border-radius: 5px;
    cursor: pointer;
}

.login-btn:hover {
    background-color: #D32F2F;
}

.additional-links {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
}

.additional-links a {
    font-size: 12px;
    color: #555;
    text-decoration: none;
}

.additional-links a:hover {
    text-decoration: underline;
}
</style>
