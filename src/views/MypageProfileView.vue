<script setup>
import { ref, onMounted } from 'vue';
import router from '@/router/index.js';
import axios from 'axios';
import MainHeader from '@/components/MainHeader.vue';
import MainFooter from '@/components/MainFooter.vue';

const user = ref({
    userName: '',
    userId: '',
    userPw: '',
    userBirth: '',
    userEmail: '',
    userMobile: '',
});

// 현재 사용자가 로그인되어 있는지 확인
const isLoggedIn = ref(false);




onMounted(async () => {
    try {
        // 서버에서 로그인 된 사용자 정보 가져오기
        const response = await axios.get('api/profile');
        console.log("Response Data:", response.data); // 추가된 로그
        if (response.status === 200) {
            const userData = response.data;
            user.value.userName = userData.userName;
            user.value.userId = userData.userId;
            user.value.userPw = userData.userPw;
            user.value.userBirth = userData.userBirth;
            user.value.userEmail = userData.userEmail;
            user.value.userMobile = userData.userMobile;
            isLoggedIn.value = true; // 로그인 상태를 true로 변경
        } else {
            console.log("Response status:", response.status); // 응답 상태 로그
        }
    } catch (error) {
        console.error('사용자 정보를 가져오는 중 오류 발생:', error);
        isLoggedIn.value = false; // 로그인이 안 되어 있으면 false로 처리
    }
});

const isEditing = ref(false);

const startEditing = () => {
    isEditing.value = true;
};

const cancelEditing = () => {
    isEditing.value = false;
};

const saveChanges = async () => {

    const dataToSend = {
        ...user.value
    };

    try {
        const response = await axios.post('/api/updateUser', dataToSend);
        if (response.status === 200) {
            localStorage.setItem('username', response.data.userName);
            alert('저장되었습니다.');
            isEditing.value = false;
            location.reload();
        }
    } catch (error) {
        console.error('Error saving changes:', error);
        alert('저장 실패.');
    }
};

// 개인정보수정 페이지로 이동 함수
function goToProfileInMypage() {
    router.replace({ path: '/mypage' });
}

// 내가 작성한 글 페이지로 이동 함수
function goToBoardInMypage() {
    router.replace({ path: '/myboard' });
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
                            <div class="profile-container">
                                <div class="sidebar" style="margin-right: 20px;">
                                    <div class="level-main">{{ user.userName }}님의 햄버거만들기 </div>
                                    <div class="level">LV.1</div>
                                    <button class="menu-button">내가 만든 버거</button>
                                    <button @click="goToBoardInMypage" class="menu-button">내가 쓴 게시물</button>
                                    <button @click="goToProfileInMypage" class="menu-button">개인정보 수정</button>
                                </div>
                                <div class="main-content">
                                    <h3 class="title">회원정보</h3>
                                    <div class="info-group">
                                        <label>이름</label>
                                        <input v-if="isEditing" v-model="user.userName" />
                                        <p v-else>{{ user.userName }}</p>
                                    </div>
                                    <div class="info-group">
                                        <label>아이디</label>
                                        <p>{{ user.userId }}</p>
                                    </div>
                                    <div class="info-group">
                                        <label>비밀번호</label>
                                        <input v-if="isEditing" v-model="user.userPw" />
                                        <p v-else>{{ user.userPw }}</p>
                                    </div>
                                    <div class="info-group">
                                        <label>생년월일</label>
                                        <input v-if="isEditing" type="date" v-model="user.userBirth" />
                                        <p v-else>{{ user.userBirth }}</p>
                                    </div>
                                    <div class="info-group">
                                        <label>이메일</label>
                                        <p>{{ user.userEmail }}</p>
                                    </div>
                                    <div class="info-group">
                                        <label>전화번호</label>
                                        <p>{{ user.userMobile }}</p>
                                    </div>
                                    <div class="button-group">
                                        <button v-if="!isEditing" @click="startEditing">수정</button>
                                        <button v-if="isEditing" @click="cancelEditing">취소</button>
                                        <button v-if="isEditing" @click="saveChanges">저장</button>
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
    text-align: center; /* 글씨를 가운데 정렬 */
    font-family: "Diphylleia", sans-serif; /* Black Han Sans 글씨체 적용 */
}

@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Diphylleia&display=swap');

.level {
    font-size: 50px;
    font-weight: 800;
    margin-bottom: 30px;
    text-align: center; /* 글씨를 가운데 정렬 */
    font-family: "Diphylleia", sans-serif; /* Black Han Sans 글씨체 적용 */
}

.image-upload {
    margin-bottom: 20px;
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

.button-group {
    display: flex;
    gap: 10px;
}

.button-group button {
    padding: 10px 20px;
    background-color: #d81f26;
    color: #fff;
    border: none;
    cursor: pointer;
    font-size: 15px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}




.signup-page {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.signup-form {
    flex-direction: column;
}

.form-group {
    margin-bottom: 15px;
}

label {
    font-size: 100px;
    font-weight: bold;
    margin-bottom: 5px;
    margin-right: 10px;
}

input {
    margin-left: 10px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.error-msg {
    color: red;
    font-size: 12px;
    margin-top: 5px;
}

.email-wrapper {
    display: flex;
    align-items: center;
}

.email-wrapper span {
    margin: 0 10px;
}

.birthday-wrapper {
    display: flex;
    justify-content: space-between;
}

.birthday-wrapper input {
    width: 32%;
    padding: 10px;
}

.form-actions {
    display: flex;
    justify-content: right;
    margin-top: 20px;
}

.btn-join {
    background-color: #d81f26;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 10px;
}

.btn-cancel {
    background-color: #000000;
    color: white;
    border: none;
    padding: 10px;
    cursor: pointer;
    border-radius: 10px;
    
}
</style>
