<template>
    <section class="image-gallery">
        <div class="image-container-main">
            <div class="large-image-container">
                <img src="@/assets/images/main.jpg" alt="Image 1" class="large-image">
                <div class="overlay-text">Handcrafted</div>
                <div class="overlay-text">Burgers &amp; Fries</div>
                <div class="overlay-text">since 1986</div>
            </div>
            <div class="right-images">
                <img src="@/assets/images/main2.jpg" alt="Image 2" class="small-image">       
                <div v-if="isLoggedIn" class="login-overlay">
                    <div v-if="!showResult" class="box">
                        <h2>나의 버거 찾기</h2>
                        <div class="question">
                            <p>버거를 좋아하십니까?</p>
                            <label><input type="radio" v-model="burger" value="yes"> Yes</label>
                            <label><input type="radio" v-model="burger" value="no"> No</label>
                        </div>
                        <div class="question">
                            <p>쪼랭이를 좋아하십니까?</p>
                            <label><input type="radio" v-model="jorengi" value="yes"> Yes</label>
                            <label><input type="radio" v-model="jorengi" value="no"> No</label>
                        </div>
                        <div class="question">
                            <p>코딩을 좋아하십니까?</p>
                            <label><input type="radio" v-model="coding" value="yes"> Yes</label>
                            <label><input type="radio" v-model="coding" value="no"> No</label>
                        </div>
                        <div class="question">
                            <p>이희만 강사님을 좋아하십니까?</p>
                            <label><input type="radio" v-model="teacher" value="yes"> Yes</label>
                            <label><input type="radio" v-model="teacher" value="no"> No</label>
                        </div>
                        <button @click="insertTest" :disabled="!burger || !jorengi || !coding || !teacher">결과 확인하기</button>
                    </div>
                    <div v-else class="box">
                        <p v-if="resultTest">{{ resultTest.testTypeResult }}</p>
                        <h3 v-if="resultTest">{{ resultTest.testTypeDetails }}</h3>
                        <button @click="resetForm">다시 선택하기</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>

import { ref, onMounted, provide } from 'vue';
import axios from 'axios';

const isLoggedIn = ref(false);
const burger = ref(null);
const jorengi = ref(null);
const coding = ref(null);
const teacher = ref(null);
const result = ref(null);
const resultTest = ref(null);
const showResult = ref(false);
const userPk = ref(Number(localStorage.getItem('userPk')));
const testTypeResult = ref(''); // 테스트 결과를 저장할 변수

provide('resultTest', resultTest);

// 테스트를 DB에 삽입하는 함수
const insertTest = async () => {
    try {
        const response = await axios.post('/api/insertTest', {  // URL을 문자열로 수정
            userPk: Number(userPk.value),
            burger: burger.value === 'yes' ? 1 : 0,
            jorengi: jorengi.value === 'yes' ? 1 : 0,
            coding: coding.value === 'yes' ? 1 : 0,
            teacher: teacher.value === 'yes' ? 1 : 0,
        });
        console.log('insertTest>>>>>>>>>', response);
        result.value = response.data;
        showResult.value = true;
        const resUserPk = response.data.userPk;
        await getResult(resUserPk);
        
    } catch (error) {
        console.error('테스트 DB 넣기:', error.message || error);
        alert('결과를 가져오는 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
};

// 결과를 가져오는 함수
const getResult = async (userPk) => {
    try {
        const response = await axios.get('/api/getTest', { 
            params: { userPk }
        });
        console.log('getResult>>>>>>>>>>>>>', response);
        resultTest.value = response.data;
        showResult.value = true;
        
    } catch (error) {
        console.error('테스트 DB 가져오기:', error.message || error);
    }
};


// 폼 초기화 함수
const resetForm = () => {
    burger.value = null;
    jorengi.value = null;
    coding.value = null;
    teacher.value = null;
    showResult.value = false;
    resultTest.value = null;
    testTypeResult.value = ''; // 헤더의 결과 초기화
};

// 컴포넌트가 마운트될 때 사용자 정보 확인
onMounted(() => {
    const storedUsername = localStorage.getItem('username');
    const storeduserPk = localStorage.getItem('userPk');
    if (storedUsername || storeduserPk) {
        isLoggedIn.value = true;
        userPk.value = storeduserPk;
    }
});

// 초기 데이터 가져오기
getResult();
</script>

<style scoped></style>
