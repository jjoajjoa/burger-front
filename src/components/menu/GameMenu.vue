<script setup>
import { ref } from 'vue';
import axios from 'axios';
import router from '@/router/index.js'

const burgercategory = ref([]);

//햄버거카테고리 리스트 받아오기
const burgerlist = async () => {
    try {
        const response = await axios.get('/api/burgerlist');
        burgercategory.value = response.data;
    } catch (error) {
        console.error('There was an error!', error);
        burgercategory.value = 'Error!';
    }
};

//햄버거를 클릭했을때 해당 카테고리 id를 가지고 페이지바꾸기
const burgerclick = (burgerId) => {
    // 페이지 이동 및 burgerId 전달
    router.push({ name: 'burgergame', params: { burgerId } });
    console.log(burgerId);
};

burgerlist();

</script>

<template>
    <div v-for="(item) in burgercategory" :key="item.burgerId">
        <button @click="burgerclick(item.burgerId)">버거</button>
        <p>{{ item.burgerName }}</p>
    </div>
</template>