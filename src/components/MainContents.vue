<script setup>
import { ref } from 'vue';
import axios from 'axios';

// 버튼 텍스트를 저장할 반응형 변수
const buttonText = ref('');
const inputText = ref(''); // input field에 입력된 텍스트 저장

// 데이터를 가져오는 함수 (GET 요청)
const fetchData = async () => {
    try {
        const response = await axios.get('/api/test');
        buttonText.value = response.data;
    } catch (error) {
        console.error('There was an error!', error);
        buttonText.value = 'Error!';
    }
};

// 데이터를 제출하는 함수 (POST 요청)
const submitData = async () => {
    try {
        const response = await axios.post('/api/submit', { input: inputText.value });
        console.log('Response from server:', response.data);
    } catch (error) {
        console.error('There was an error!', error);
    }
};

// 컴포넌트가 마운트될 때 API 호출
fetchData();
</script>

<template>
    <div>
        <h1>hello world</h1>
    </div>

    <div>
        <!-- 버튼 클릭 시 'test' API의 응답 데이터를 표시 -->
        <button class="btn btn-light" @click="fetchData">{{ buttonText }}</button>
    </div>
    <div>
        <form @submit.prevent="submitData">
            <input type="text" v-model="inputText" placeholder="Enter some text">
            <input type="submit" class="btn btn-primary" value="Submit">
        </form>
    </div>

</template>


