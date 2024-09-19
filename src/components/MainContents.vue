<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const buttonText = ref('');
const isLoggedIn = ref(false);
const burger = ref(null);
const jorengi = ref(null);
const coding = ref(null);
const teacher = ref(null);
const result = ref(null);
const showResult = ref(false);
const userPK = ref(null);

const fetchData = async () => {
    try {
        const response = await axios.get('/api/getTest');
        console.log(response);
        result.value = response.data;
    } catch (error) {
        console.error('데이터 가져오기 오류:', error.message || error);
        buttonText.value = '데이터를 가져오는 중 오류가 발생했습니다.';
    }
};

const getResults = async () => {
    try {
        const response = await axios.post(`/api/insertTest`, {
            userPK: Number(userPK.value),
            burger: burger.value === 'yes' ? 1 : 0,
            jorengi: jorengi.value === 'yes' ? 1 : 0,
            coding: coding.value === 'yes' ? 1 : 0,
            teacher: teacher.value === 'yes' ? 1 : 0,
        });
        result.value = response.data;
        showResult.value = true;
    } catch (error) {
        console.error('결과 가져오기 오류:', error.message || error);
        alert('결과를 가져오는 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
};

onMounted(() => {
    const storedUsername = localStorage.getItem('username');
    const storedUserPK = localStorage.getItem('userPK');
    if (storedUsername || storedUserPK) {
        isLoggedIn.value = true;
        userPK.value = storedUserPK;
    }
});

fetchData();
</script>


<template>
    <section class="image-gallery">
        <div class="image-container">
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
                        <button @click="getResults" :disabled="!burger || !jorengi || !coding || !teacher">결과 확인하기</button>
                    </div>
                    <div v-else class="box">
                        <h3 v-if="result">{{ result.test_type_result }}</h3>
                        <p v-if="result">{{ result.test_type_details }}</p>
                        <button @click="showResult = false; result = null">다시 선택하기</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
