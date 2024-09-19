<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import MainHeader from '@/components/MainHeader.vue';
import MainFooter from '@/components/MainFooter.vue';

const route = useRoute(); // URL에서 boardPk를 받아오기 위한 설정
const boardPk = route.params.boardPk;

const boardDetail = ref(null); // 게시글 상세 정보
const comments = ref([]); // 댓글 목록
const userPk = ref(Number(localStorage.getItem('userPk')));  // ref로 선언한 userPk에 값을 할당
const newComment = ref(''); // 새로운 댓글 입력란

// 게시글 상세 정보 가져오기
const getBoardDetail = async () => {
  try {
    const response = await axios.get(`/api/board/${boardPk}`); // 게시글 정보를 가져오는 API
    if (response.status === 200) {
      boardDetail.value = response.data;
    }
  } catch (error) {
    console.error('게시글 정보를 가져오는 중 오류 발생:', error);
  }
};

// 댓글 목록 가져오기
const getComments = async () => {
  try {
    const response = await axios.get(`/api/board/${boardPk}`); // 댓글 목록을 가져오는 API
    if (response.status === 200) {
      comments.value = response.data.comments;
    }
  } catch (error) {
    console.error('댓글을 가져오는 중 오류 발생:', error);
  }
};

// 댓글 저장하기
const saveComment = async () => {
  if (!newComment.value) {
    alert('댓글을 입력해 주세요.');
    return;
  }
  
  try {
    await axios.post(`/api/board/${boardPk}/comment`, {
      commentBody: newComment.value,
    });
    newComment.value = ''; // 댓글 입력란 초기화
    getComments(); // 댓글 목록 다시 가져오기
  } catch (error) {
    console.error('댓글 저장 중 오류 발생:', error);
  }
};

// 댓글 삭제하기
const deleteComment = async (commentPk) => {
  try {
    await axios.delete(`/api/comment/${commentPk}`);
    getBoardDetail(); // 댓글 목록 다시 가져오기
  } catch (error) {
    console.error('댓글 삭제 중 오류 발생:', error);
  }
};
console.log('Logged-in userPk:', userPk);

// 컴포넌트가 마운트될 때 게시글 정보와 댓글을 가져옴
onMounted(() => {
  getBoardDetail();
  getComments();
});
console.log('Logged-in userPk:', userPk.value);

</script>

<template>
  <MainHeader />
  
  <div class="container">
    <div v-if="boardDetail">
    <h1>{{ boardDetail.boardTitle }}</h1>
    <p>작성자: {{ boardDetail.userName }}</p>
    <p>작성일: {{ new Date(boardDetail.boardRegDate).toLocaleDateString() }}</p>
    <p>조회수: {{ boardDetail.boardViewCount }}</p>
    <div>
      {{ boardDetail.boardBody }}
    </div>
  </div>

    <div class="comments-section">
      <h3>댓글 목록</h3>
      <div v-if="comments.length">
        <ul>
          <li v-for="(comment, index) in comments" :key="index">
            
            <p>{{ comment.userName }} - {{ new Date(comment.commentRegDate).toLocaleDateString() }}</p>
            <p>{{ comment.commentBody }}</p>
            <!-- 댓글 작성자와 현재 로그인한 사용자의 userPk가 일치하면 삭제 버튼 표시 -->
            <button v-if="Number(comment.userPk) === Number(userPk.value)" @click="deleteComment(comment.commentPk)">삭제</button>
          </li>
        </ul>
      </div>
      <div v-else>
        <p>댓글이 없습니다.</p>
      </div>

      <div class="comment-form">
        <textarea v-model="newComment" placeholder="댓글을 입력해 주세요"></textarea>
        <button @click="saveComment">댓글 달기</button>
      </div>
    </div>
  </div>
  
  <MainFooter />
</template>

<style scoped>
.container {
  padding: 20px;
}

.board-detail {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.board-body {
  margin-top: 10px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
}

.comments-section {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.comment-form {
  margin-top: 20px;
}

textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #0056b3;
}
</style>
