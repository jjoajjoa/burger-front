<script setup>
import axios from 'axios';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';

const route = useRoute();
const burgerId = route.params.burgerId;

//선택한 버거 카테고리id를 서버에 보내기 
const burgerCategoryId = async () => {
    try {
        const response = await axios.post('/api/burgerlistid', { burgerId : burgerId });
        console.log('Response from server:', response.data);
    } catch (error) {
        console.error('There was an error!', error);
    }
};

// 컴포넌트가 마운트될 때 API 호출 (onMounted 사용)
onMounted(() => {
    console.log('Burger ID:', burgerId);
    burgerCategoryId();
});

</script>

<template>
    <h1>버거게임하는 곳입니다</h1>
    <div class="container">
        <div class="row">
            <div class="col-6">
                <div>안뇽</div>
            </div>
            <div class="col-6">
                <div>안뇽</div>
            </div>
        </div>
    </div>
</template>