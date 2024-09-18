<script setup>
import { ref } from 'vue';
import axios from 'axios';
import MainHeader from '@/components/MainHeader.vue';
import MainFooter from '@/components/MainFooter.vue';

// 입력값과 결과를 위한 상태 정의
const name = ref('');
const id = ref('');
const email = ref('');
const phone = ref('');
const idResult = ref('');
const isFound = ref(false); // 아이디 찾기 결과가 있는지 여부
const isPasswordSearch = ref(false); // 비밀번호 찾기 여부를 위한 상태

// 아이디 찾기 요청 함수
const findId = async () => {
    if (!name.value || !email.value) {
        alert('이름과 이메일을 입력해주세요.');
        return;
    }
    try {
        
        // 서버로 아이디 찾기 요청
        const response = await axios.post('/api/findId', {
            userName: name.value,  // UserVO의 필드와 맞춰야 합니다.
            userEmail: email.value
        });
        if (response && response.data && response.data.userId) {
            idResult.value = response.data.userId; // 단일 객체에서 userId 사용
            isFound.value = true; // 결과 표시
        } else {
            alert('아이디를 찾을 수 없습니다. 입력하신 정보를 다시 확인하세요.');
            isFound.value = false;
        }
    } catch (error) {
        console.error('아이디 찾기 오류:', error);
        alert('서버 오류로 인해 아이디 찾기에 실패했습니다.');
    }
};

// 비밀번호 찾기 요청 함수
const findPassword = async () => {
    if (!id.value || !email.value || !phone.value) {
        alert('아이디, 이메일, 전화번호를 입력해주세요.');
        return;
    }
    try {
        // 서버로 비밀번호 찾기 요청
        const response = await axios.post('/api/findPassword', {
            userId: id.value,   // UserVO의 필드와 맞춰야 합니다.
            userEmail: email.value,
            userMobile: phone.value
        });
        
        if (response.data) {
            // 첫 번째 결과의 userPw 사용
            idResult.value = response.data.userPw;
            isFound.value = true; // 결과 표시
        } else {
            alert('비밀번호를 찾을 수 없습니다. 입력하신 정보를 다시 입력하세요.');
            isFound.value = false;
        }
    } catch (error) {
        console.error('비밀번호 찾기 오류:', error);
        alert('서버 오류로 인해 비밀번호 찾기에 실패했습니다.');
    }
};

// 탭 변경 함수
const toggleSearch = (searchType) => {
    isFound.value = false;
    if (searchType === 'password') {
        isPasswordSearch.value = true;
    } else {
        isPasswordSearch.value = false;
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

                        <div class="content">
                            <div class="header">
                                <button :class="{ active: !isPasswordSearch }" @click="toggleSearch('id')" style="margin-right: 15px;">아이디 찾기</button>
                                <button :class="{ active: isPasswordSearch }" @click="toggleSearch('password')">비밀번호 찾기</button>
                            </div>

                            <!-- 아이디 찾기 폼 -->
                            <div v-if="!isPasswordSearch">
                                <div class="form-group">
                                    <label for="name">이름</label>
                                    <input type="text" id="name" v-model="name" placeholder="이름을 입력해주세요" />
                                </div>
                                <div class="form-group">
                                    <label for="email">이메일</label>
                                    <input type="text" id="email" v-model="email"
                                        placeholder="이메일을 입력해주세요 (예: fivegirls@burger.com)" />
                                </div>
                                <button class="find-id-btn" @click="findId">아이디 찾기</button>
                            </div>

                            <!-- 비밀번호 찾기 폼 -->
                            <div v-else>
                                <div class="form-group">
                                    <label for="id">아이디</label>
                                    <input type="text" id="id" v-model="id" placeholder="아이디를 입력해주세요" />
                                </div>
                                <div class="form-group">
                                    <label for="email">이메일</label>
                                    <input type="text" id="email" v-model="email"
                                        placeholder="이메일을 입력해주세요 (예: fivegirls@burger.com)" />
                                </div>
                                <div class="form-group">
                                    <label for="phone">전화번호</label>
                                    <input type="text" id="phone" v-model="phone" placeholder="전화번호를 입력해주세요" />
                                </div>
                                <button class="find-id-btn" @click="findPassword">비밀번호 찾기</button>
                            </div>

                            <!-- 결과 표시 -->
                            <div v-if="isFound" class="id-result">
                                <div class="success-icon">✔</div>

                                <!-- 아이디 찾기 결과 -->
                                <p v-if="!isPasswordSearch">{{ name }}님의 아이디는 <strong>{{ idResult }}</strong>입니다.</p>

                                <!-- 비밀번호 찾기 결과 -->
                                <p v-else>{{ id }}님의 비밀번호는 <strong>{{ idResult }}</strong>입니다.</p>

                                <!-- 추가 정보 표시 -->
                                <p class="info" v-if="!isPasswordSearch">
                                    비밀번호를 잊으셨나요? 비밀번호 찾기를 통해 비밀번호를 찾을 수 있습니다.
                                </p>
                                <p class="info" v-else>
                                    비밀번호 변경은 로그인 후 마이페이지에서 가능합니다.
                                </p>
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
.container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
}

.content {
    width: 500px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.header {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.header button {
    flex: none;
    /* flex-grow를 비활성화 */
    width: 210px;
    /* 원하는 고정 폭 */
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #f0f0f0;
    cursor: pointer;
    text-align: center;
    /* 버튼 텍스트 가운데 정렬 */
}


.header button.active {
    background-color: #e0e0e0;
    font-weight: bold;
}

.form-group {
    margin-bottom: 20px;
}

input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-top: 5px;
}

.find-id-btn {
    width: 100%;
    padding: 10px;
    background-color: #d81f26;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
}

.id-result {
    margin-top: 30px;
    text-align: center;
}

.success-icon {
    font-size: 40px;
    color: green;
}

.info {
    font-size: 12px;
    color: #666666;
    margin-top: 10px;
}
</style>
