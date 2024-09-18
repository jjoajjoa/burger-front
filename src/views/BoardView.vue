<script setup>
import MainHeader from '@/components/MainHeader.vue';
import MainFooter from '@/components/MainFooter.vue';

import { ref } from 'vue';
import axios from 'axios';
import router from '@/router/index.js';

const list = ref([]);

const boardlist = async () => {
    try {
        const response = await axios.get('/boards/list');
        list.value = response.data;
        //console.log(response);
    } catch (error) {
        console.error('BoardView Err >>>>>', error);
        list.value = 'Error!';
    }
};

const showDetail = (boardPk) => {
    router.push({ name: 'board-detail', params: { id: boardPk } });
};

boardlist();
</script>

<template>
    <MainHeader />

    <div class="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper" style="height: 100vh;">
        <div class="app-main flex-column flex-row-fluid" id="kt_app_main">
            <div class="d-flex flex-column flex-column-fluid">
                <div id="kt_app_content" class="app-content flex-column-fluid">
                    <div id="kt_app_content_container" class="app-container container-xxl">
                        <div class="d-flex flex-column flex-xl-row">

                            <div>
                                <h3>게시글 리스트</h3>
                                <ul>
                                    <li v-for="(item, index) in list" :key="index" @click="showDetail(item.boardPk)">
                                        제목: {{ item.boardTitle }}
                                        작성자: {{ item.userName }}
                                        작성일: {{ item.boardRegDate }}
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <button>글작성하기</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <MainFooter />
</template>
