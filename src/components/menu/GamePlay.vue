<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';

const route = useRoute();
const burgerId = route.params.burgerId;

const IngrList = ref([]);
const IngrListByGamePk = ref([]);

// 선택한 버거 카테고리 ID를 서버에 보내기 
const burgerCategoryId = async () => {
    try {
        await axios.post('/api/burgerlistid', { burgerId: burgerId });
    } catch (error) {
        console.error('There was an error!', error);
    }
};

// 컴포넌트가 마운트될 때 API 호출 (onMounted 사용)
onMounted(() => {
    burgerCategoryId();
    GetIngrList();
});

// 재료 리스트 받아오기
const GetIngrList = async () => {
    try {
        const response = await axios.get('/api/IngrList');
        IngrList.value = response.data;
    } catch (error) {
        console.error('There was an error!', error);
        IngrList.value = 'Error!';
    }
};

// 재료 리스트 보여주고 클릭할 때 ID를 서버로 던지기
const IngrClick = async (ingrPk) => {
    try {
        const response = await axios.post('/api/IngrListId', { ingrPk: ingrPk });
        
        const existingIngr = IngrListByGamePk.value.find(item => item.ingrPk === ingrPk);
        if (existingIngr) {
            existingIngr.count++; // 이미 존재하면 개수 증가
        } else {
            const newIngr = { ...response.data[0], count: 1 }; // 새로운 재료 추가
            IngrListByGamePk.value.push(newIngr);
        }
    } catch (error) {
        console.error('There was an error!', error);
    }
};

// 재료 삭제
const deleteIngr = async (ingrPk) => {
    try {
        await axios.delete(`/api/IngrList/${ingrPk}`); // 서버에서 삭제 API 호출
        
        const existingIngr = IngrListByGamePk.value.find(item => item.ingrPk === ingrPk);
        if (existingIngr && existingIngr.count > 1) {
            existingIngr.count--; // 개수 감소
        } else {
            // 개수가 1이면 삭제
            IngrListByGamePk.value = IngrListByGamePk.value.filter(item => item.ingrPk !== ingrPk);
        }
        console.log(`${ingrPk} 재료가 삭제되었습니다.`);
    } catch (error) {
        console.error('There was an error deleting the ingredient!', error);
    }
};
</script>

<template>
    <h1>버거게임하는 곳입니다</h1>
    <div class="container">
        <div class="row">
            <div class="col-6">
                <div v-for="(item) in IngrListByGamePk" :key="item.ingrPk">
                    <button>{{ item.ingrName }}</button>
                    <p>{{ item.ingrUrl }}</p>
                    <!-- 수량 표시 제거 -->
                </div>
            </div>
            <div class="col-6">
                <div v-for="(item) in IngrList" :key="item.ingrPk">
                    <button @click="IngrClick(item.ingrPk)">{{ item.ingrName }}</button>
                    <p>{{ item.ingrUrl }}</p>
                    <button @click="deleteIngr(item.ingrPk)">삭제</button>
                </div>
            </div>
        </div>
    </div>
</template>
