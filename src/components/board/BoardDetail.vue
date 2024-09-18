<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const route = useRoute();
const boardDetail = ref({});
const comments = ref([]);
const isLoading = ref(true);

const getBoardDetail = async () => {
    const boardId = route.params.id;
    try {
        const response = await axios.get(`/boards/detail/${boardId}`);
        boardDetail.value = response.data;
        isLoading.value = false;
    } catch (error) {
        console.error('BoardDetail Err >>>>>', error);
        isLoading.value = false;
    }
};

const getComments = async () => {
    const boardId = route.params.id;
    try {
        const response = await axios.get(`/boards/comments/${boardId}`);
        //console.log(response);
        comments.value = response.data;
    } catch (error) {
        console.error('Comments Err >>>>>', error);
    }
};

onMounted(() => {
    getBoardDetail();
    getComments();
});
</script>

<template>
    <div>
        <h1>게시글</h1>
        <div v-if="isLoading">
            <p>Loading...</p>
        </div>

        <div v-else-if="Object.keys(boardDetail).length > 0">
            <p>제목: {{ boardDetail.boardTitle }}</p>
            <p>작성자: {{ boardDetail.userName }}</p>
            <p>작성일: {{ boardDetail.boardRegDate }}</p>
            <p>내용: {{ boardDetail.boardBody }}</p>

            <div>
                <button>수정</button>
                <button>삭제</button>
            </div>

            <h2 style="margin-top: 60px;">댓글</h2>
            <div v-if="comments.length > 0">
                <div v-for="comment in comments" :key="comment.commentId">
                    <p>{{ comment.userName }}: {{ comment.commentBody }} {{ comment.commentRegDate }}</p>
                </div>
                <input type="text">
                <button type="submit" value="ok">ok</button>
            </div>
            <div v-else>
                <p>댓글이 없습니다.</p>
            </div>
        </div>

        <div v-else>
            <p>게시글을 불러올 수 없습니다.</p>
        </div>
    </div>
</template>
