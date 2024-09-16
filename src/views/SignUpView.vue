<script setup>
import { ref } from 'vue';
import axios from 'axios';
import router from '@/router/index.js';
import MainHeader from '@/components/MainHeader.vue';
import MainFooter from '@/components/MainFooter.vue';

// 홈으로 이동 함수

function goToHome() {
    router.replace({ path: '/' });
}

// form input references
const username = ref('');
const password = ref('');
const passwordConfirm = ref('');
const name = ref('');
const phone = ref('');
const email = ref(''); // 이메일 아이디 부분
const emailDomain = ref(''); // 이메일 도메인 부분
const year = ref(''); // 년도
const month = ref(''); // 월
const day = ref(''); // 일

// 에러 메시지 상태
const errors = ref({
    username: '',
    password: '',
    passwordConfirm: '',
    name: '',
    phone: '',
    email: '',
    birthday: ''
});

// 가입하기 버튼을 눌렀을 때 실행되는 함수
const join = async () => {
    let valid = true;

    // 입력 검증
    if (!username.value) {
        errors.value.username = '아이디를 입력해주세요.';
        valid = false;
    } else {
        try {
            // 아이디 중복 확인
            const checkUsernameResponse = await axios.post('/api/checkUsername', { userId: username.value });
            if (!checkUsernameResponse.data) {
                errors.value.username = '이미 사용 중인 아이디입니다.';
                valid = false;
            } else {
                errors.value.username = ''; // 중복이 없으면 에러 메시지 삭제
            }
        } catch (error) {
            console.error('아이디 중복 확인 오류:', error);
            valid = false; // 중복 확인 중 에러 발생 시 valid를 false로 설정
        }
    }

    if (!password.value) {
        errors.value.password = '비밀번호를 입력해주세요.';
        valid = false;
    } else if (password.value !== passwordConfirm.value) {
        errors.value.passwordConfirm = '비밀번호가 일치하지 않습니다.';
        valid = false;
    } else {
        errors.value.password = '';
        errors.value.passwordConfirm = '';
    }

    if (!name.value) {
        errors.value.name = '이름을 입력해주세요.';
        valid = false;
    } else {
        errors.value.name = '';
    }

    if (!phone.value) {
        errors.value.phone = '전화번호를 입력해주세요.';
        valid = false;
    } else {
        try {
            // 전화번호 중복 확인
            const checkPhoneResponse = await axios.post('/api/checkPhone', { phone: phone.value });
            if (!checkPhoneResponse.data) {
                errors.value.phone = '이미 사용 중인 전화번호입니다.';
                valid = false;
            } else {
                errors.value.phone = ''; // 중복이 없으면 에러 메시지 삭제
            }
        } catch (error) {
            console.error('전화번호 중복 확인 오류:', error);
            valid = false;
        }
    }

    if (!email.value || !emailDomain.value) {
        errors.value.email = '이메일 주소를 입력해주세요.';
        valid = false;
    } else {
        try {
            // 이메일 중복 확인
            const checkEmailResponse = await axios.post('/api/checkEmail', { email: `${email.value}@${emailDomain.value}` });
            if (!checkEmailResponse.data) {
                errors.value.email = '이미 사용 중인 이메일입니다.';
                valid = false;
            } else {
                errors.value.email = ''; // 중복이 없으면 에러 메시지 삭제
            }
        } catch (error) {
            console.error('이메일 중복 확인 오류:', error);
            valid = false;
        }
    }

    if (!year.value || !month.value || !day.value) {
        errors.value.birthday = '생년월일을 입력해주세요.';
        valid = false;
    } else {
        errors.value.birthday = '';
    }

    // 모든 입력이 유효한 경우 서버에 회원가입 요청
    if (valid) {
        try {
            const response = await axios.post('/api/signup', {
                userId: username.value,
                userPw: password.value,
                userName: name.value,
                userBirth: `${year.value}-${month.value}-${day.value}`, // 생년월일 조합
                userMobile: phone.value,
                userEmail: `${email.value}@${emailDomain.value}` // 이메일 조합
            });

            if (response.data === '회원가입 성공') {
                alert('회원가입이 완료되었습니다.');
                router.push({ path: '/login' }); // 가입 후 로그인 페이지로 이동
            } else {
                alert('회원가입에 실패하였습니다.');
            }
        } catch (error) {
            console.error('회원가입 오류:', error);
            alert('서버 오류로 인해 회원가입에 실패하였습니다.');
        }
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
                        <div class="signup-page">
                            <form class="signup-form" @submit.prevent="join">
                                <div class="form-group">
                                    <label for="username">아이디</label>
                                    <input type="text" id="username" v-model="username" placeholder="아이디 입력" />
                                    <p class="error-msg" v-if="errors.username">{{ errors.username }}</p>
                                </div>

                                <div class="form-group">
                                    <label for="password">비밀번호</label>
                                    <input type="password" id="password" v-model="password" placeholder="비밀번호 입력" />
                                    <p class="error-msg" v-if="errors.password">{{ errors.password }}</p>
                                </div>

                                <div class="form-group">
                                    <label for="password-confirm">비밀번호 확인</label>
                                    <input type="password" id="password-confirm" v-model="passwordConfirm" placeholder="비밀번호 재입력" />
                                    <p class="error-msg" v-if="errors.passwordConfirm">{{ errors.passwordConfirm }}</p>
                                </div>

                                <div class="form-group">
                                    <label for="name">이름</label>
                                    <input type="text" id="name" v-model="name" placeholder="이름을 입력해주세요" />
                                    <p class="error-msg" v-if="errors.name">{{ errors.name }}</p>
                                </div>

                                <div class="form-group">
                                    <label for="phone">전화번호</label>
                                    <input type="tel" id="phone" v-model="phone" placeholder="휴대폰 번호 입력 ('-' 제외 11자리 입력)" />
                                    <p class="error-msg" v-if="errors.phone">{{ errors.phone }}</p>
                                </div>

                                <div class="form-group email-group">
                                    <label for="email">이메일 주소</label>
                                    <div class="email-wrapper">
                                        <input type="text" id="email" v-model="email" placeholder="이메일" />
                                        <span>@</span>
                                        <input type="text" v-model="emailDomain" placeholder="도메인 입력 (예: gmail.com)" />
                                    </div>
                                    <p class="error-msg" v-if="errors.email">{{ errors.email }}</p>
                                </div>

                                <div class="form-group">
                                    <label for="birthday">생년월일</label>
                                    <div class="birthday-wrapper">
                                        <input type="text" id="year" v-model="year" placeholder="년도 입력 (예: 1990)" />
                                        <input type="text" id="month" v-model="month" placeholder="월 입력 (예: 01)" />
                                        <input type="text" id="day" v-model="day" placeholder="일 입력 (예: 01)" />
                                    </div>
                                    <p class="error-msg" v-if="errors.birthday">{{ errors.birthday }}</p>
                                </div>

                                <div class="form-actions">
                                    <button @click="goToHome" type="button" class="btn-cancel" style="margin-right: 10px;">가입취소</button>
                                    <button type="submit" class="btn-join">가입하기</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <MainFooter />
</template>

<style scoped>
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
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 10px;
    margin-top: 5px;
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
