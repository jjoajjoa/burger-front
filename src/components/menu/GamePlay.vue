<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import router from '@/router';
import MainHeader from '@/components/MainHeader.vue';


const route = useRoute();
const burgerId = route.params.burgerId;

const IngrList = ref([]);
const IngrListByGamePk = ref([]);

const burgerScoreSum = ref('');

const selectedIngr = ref([]);


//선택한 버거 카테고리id를 서버에 보내기 
const burgerCategoryId = async () => {
    try {
        const response = await axios.post('/api/burgerlistid', { burgerId: burgerId });
        console.log('Response from server:', response.data);
    } catch (error) {
        console.error('There was an error!', error);
    }
};

// 컴포넌트가 마운트될 때 API 호출 (onMounted 사용)
onMounted(() => {
    console.log('Burger ID:', burgerId);
    burgerCategoryId();
    GetIngrList();
});

//재료리스트받아오기
const GetIngrList = async () => {
    try {
        const response = await axios.get('/api/IngrList');
        IngrList.value = response.data;
    } catch (error) {
        console.error('There was an error!', error);
        IngrList.value = 'Error!';
    }
};

//재료리스트보여주고 클릭할때 id를 서버로 던지기
const IngrClick = async (ingrPk) => {
    // 재료 개수 확인
    if (selectedIngr.value.length >= 8) {
        console.log("Ingredient limit reached, showing warning modal");
        return;
    }

    try {
        const response = await axios.post('/api/IngrListId', { ingrPk });
        IngrListByGamePk.value = response.data.data;

        // 중복 선택을 허용하여 재료를 계속 추가
        selectedIngr.value.push(ingrPk);
        console.log("Selected ingredients:", selectedIngr.value);

    } catch (error) {
        console.error('There was an error!', error);
        IngrListByGamePk.value = 'Error!';
    }
};

//점수 받아오기
const burgerScore = async () => {
    try {
        const response = await axios.get('/api/burgerScore');
        burgerScoreSum.value = response.data;
    } catch (error) {
        console.error('There was an error!', error);
        burgerScoreSum.value = '0';
    }
};

//삭제하기
const deleteIngr = async (ingrPk) => {
    try {
        const response = await axios.post('/api/deleteIngr', { ingrPk: ingrPk });
        IngrListByGamePk.value = response.data;
        selectedIngr.value = selectedIngr.value.filter(item => item !== ingrPk);
    } catch (error) {
        console.error('There was an error!', error);
        IngrListByGamePk.value = 'Error!';
    }
};

//점수모달에서 다시하기 버튼눌렀을때
function goToGamePlay() {
    location.reload(true);
}

//점수모달에서 나가기 버튼 눌렀을때
function goToGameMenu() {
    router.replace({ path: '/burgerMenu', query: {} });
}



</script>

<template>
    <MainHeader />
    <div class="app-main flex-column flex-row-fluid" id="kt_app_main">
        <div class="image-container position-relative">
            <img src="../../assets/images/menu-header.jpg" alt="Menu Header" class="menu-image">
            <h1 class="header-text">Game</h1>
        </div>
        <div class="d-flex flex-column flex-column-fluid">
            <div id="kt_app_content" class="app-content flex-column-fluid">
                <div id="kt_app_content_container" class="app-container container-xxl">
                    <div class="d-flex flex-column flex-xl-row">
                        <div class="container">
                            <div class="row">
                                <!--왼쪽 버거 쌓기 시작-->
                                <div class="col-6">
                                    <div class="card-burger-poor"
                                        style="font-size: 15px; font-weight: bold; text-align: center;">
                                        버거 재료는 최대 8개까지 선택가능합니다
                                    </div>
                                    <div class="card-burger-poor">
                                        <div class="row mt-10 me-10 ms-10 mb-10 selected-ingredients-container">
                                            <div>
                                                <img src="@/assets/images/bread_side.png"
                                                    style="width: 300px; height: auto; object-fit: contain;">
                                            </div>
                                            <div class="mt-5"></div>
                                            <div v-for="(item) in IngrListByGamePk" :key="item.ingrPk">
                                                <!-- 수량만큼 재료를 반복해서 보여줌 -->
                                                <div v-for="n in item.ingrUsageQuantity" :key="n" class="row">
                                                    <div class="imageContainer2 col-10">
                                                        <img :src="require('@/assets' + item.ingrSideUrl)"
                                                            class="ingrImage2">
                                                    </div>
                                                    <div class="col-2">
                                                        <button @click="deleteIngr(item.ingrPk)"
                                                            class="btn btn-outline-danger burgerScoreButton">삭제</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <img src="@/assets/bread_bottom.png"
                                                    style="width: 300px; height: auto; object-fit: contain;">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!--왼쪽 버거 쌓기 끝-->
                                <!--오른쪽 버거재료선택, 버거완성 시작-->
                                <div class="col-6">
                                    <div class="row">
                                        <div class="col-12">
                                            <div class="mt-6"></div>
                                            <button class="btn btn-outline-danger burgerScoreButton"
                                                data-bs-toggle="modal" data-bs-target="#kt_modal_new_target1"
                                                @click="burgerScore()"
                                                style="cursor: pointer; transition: transform 0.3s ease;">버거 완성</button>
                                        </div>
                                    </div>
                                    <div class="mt-10"></div>
                                    <div class="menu-card" style="max-height: 700px; overflow-y: auto;">
                                        <div class="row mt-5 me-5 ms-5 mb-5">
                                            <div class="col-4" v-for="(item) in IngrList" :key="item.ingrPk">
                                                <div class="imageContainer">
                                                    <img :src="require('@/assets' + item.ingrUrl)" class="ingrImage">
                                                </div>
                                                <div class="d-flex justify-content-center mt-2">
                                                    <button @click="IngrClick(item.ingrPk)"
                                                        :disabled="selectedIngr.length >= 8" class="btn btn-light">{{
                                                        item.ingrName }}</button>
                                                </div>
                                                <div class="mt-2"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!--오른쪽 버거재료선택, 버거완성 끝-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!--점수 버튼 누르면 나오는 모달-->
    <div>
        <!--begin::Modal - New Target-->
        <div class="modal fade" id="kt_modal_new_target1" tabindex="-1" aria-hidden="true">
            <!--begin::Modal dialog-->
            <div class="modal-dialog modal-dialog-centered mw-650px">
                <!--begin::Modal content-->
                <div class="modal-content rounded">
                    <!--begin::Modal header-->
                    <div class="modal-header pb-0 border-0 justify-content-end">
                        <!--begin::Close-->
                        <div class="btn btn-sm btn-icon btn-active-color-primary" data-bs-dismiss="modal">
                            <i class="ki-duotone ki-cross fs-1">
                                <span class="path1"></span>
                                <span class="path2"></span>
                            </i>
                        </div>
                        <!--end::Close-->
                    </div>
                    <!--begin::Modal header-->
                    <!--begin::Modal body-->
                    <div class="modal-body scroll-y px-10 px-lg-15 pt-0 pb-15">
                        <!--begin:Form-->
                        <form id="kt_modal_new_target_form" class="form" action="#">
                            <!--begin::Heading-->
                            <div class="mb-13 text-center">
                                <!--begin::Title-->
                                <h1 class="mb-3">Burger Score</h1>
                                <!--end::Title-->
                                <!--begin::Description-->
                                <div>
                                    <a href="#" class="fw-bold link-dark">당신의 점수는</a>
                                    <div class="mt-10"></div>
                                    <div class="fw-bold link-dark">{{ burgerScoreSum }}<br></div>
                                </div>
                                <!--end::Description-->
                            </div>
                            <!--end::Heading-->
                            <!--begin::Actions-->
                            <div class="text-center">
                                <button type="reset" id="kt_modal_new_target_cancel" class="btn btn-light me-3"
                                    @click="goToGamePlay()">다시하기</button>
                                <button type="submit" id="kt_modal_new_target_submit" class="btn btn-primary"
                                    @click="goToGameMenu()">
                                    <span class="indicator-label">나가기</span>
                                    <span class="indicator-progress">Please wait...
                                        <span class="spinner-border spinner-border-sm align-middle ms-2"></span></span>
                                </button>
                            </div>
                            <!--end::Actions-->
                        </form>
                        <!--end:Form-->
                    </div>
                    <!--end::Modal body-->
                </div>
                <!--end::Modal content-->
            </div>
            <!--end::Modal dialog-->
        </div>
        <!--end::Modal - New Target-->
    </div>
    <!--점수 버튼 누르면 나오는 모달-->



</template>

<style scoped>
.menu-card {
    border: 2px solid #434040;
    border-radius: 5px;
    box-shadow: 0px 2px 5px rgba(32, 31, 31, 0.1);
    max-width: 600px;
    margin: 20px auto;
    position: relative;
    font-weight: bold;
}

.menu-card::after {
    content: '';
    position: relative;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 10px;
    background: repeating-linear-gradient(135deg,
            #ccc,
            #ccc 10px,
            #fff 10px,
            #fff 20px);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    z-index: 1;
}

.imageContainer {
    width: 150px;
    height: 150px;
}

.ingrImage {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.selected-ingredients-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    width: 100%;
    gap: 5px;
}

.imageContainer2 {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 400px;
    height: 70px;
}

.ingrImage2 {
    width: 300px;
    height: auto;
    object-fit: contain;
    margin-right: 10px;
}

.burgerScoreButton {
    display: block;
    width: 100%;
    background-color: #d81f26;
    color: #fff;
    border: none;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    font-size: 20px;
    font-weight: 800;
}

.burgerScoreButton:hover {
    transform: scale(1.05);
}
</style>