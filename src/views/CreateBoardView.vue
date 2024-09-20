<script setup>
import MainHeader from '@/components/MainHeader.vue';
import MainFooter from '@/components/MainFooter.vue';
import { ref } from 'vue';
import axios from 'axios';
import router from '@/router/index.js';

// 게시글 제목과 내용을 저장하는 변수
const boardTitle = ref('');
const boardBody = ref('');

// 게시글 저장 함수
const savePost = async () => {
  try {
    const response = await axios.post('/api/create', {
      boardTitle: boardTitle.value,
      boardBody: boardBody.value,
    });
    if (response.status === 200) {
      alert('게시글이 성공적으로 저장되었습니다.');
      goToBoard();
    } else {
      alert('게시글 저장 실패');
    }
  } catch (error) {
    console.error('게시글 저장 중 오류 발생:', error);
  }
};

// 로그인 페이지로 이동 함수
function goToBoard() {
  router.replace({ path: '/board' });
}

</script>

<template>
  <MainHeader />

  <div class="app-main flex-column flex-row-fluid" id="kt_app_main" style="flex-grow: 1; overflow: auto;">
    <div class="d-flex flex-column flex-column-fluid"
      style="flex-grow: 1; justify-content: center; align-items: center;">
      <div id="kt_app_content" class="app-content flex-column-fluid"
        style="flex-grow: 1; display: flex; flex-direction: column;">
        <div id="kt_app_content_container" class="app-container container-xxl"
          style="flex-grow: 1; padding: 50px 0; display: flex; justify-content: center; align-items: center;">
          <div class="d-flex flex-column flex-xl-row"
            style="flex-grow: 1; justify-content: center; align-items: center;">
            <div class="form-container">
              <h3 class="title">게시글 작성</h3>
              <input v-model="boardTitle" placeholder="글 제목" class="input-field" />
              <textarea v-model="boardBody" placeholder="글 내용" class="textarea-field"></textarea>
              <button @click="savePost" class="save-btn">저장하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <MainFooter />
</template>

<style scoped>
.title {
  display: block;
  width: 100%;
  padding: 20px;
  margin-bottom: 30px;
  background-color: #d81f26;
  color: #fff;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.form-container {
  width: 1000px;
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}


.input-field {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.textarea-field {
  width: 100%;
  height: 200px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 20px;
}

.save-btn {
  padding: 10px 20px;
    background-color: #d81f26;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    text-align: center;
    font-weight: bold;
}

.save-btn:hover {
  background-color: #d81f26;
}
</style>
