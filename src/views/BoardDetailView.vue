<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router/index.js';
import axios from 'axios';
import MainHeader from '@/components/MainHeader.vue';
import MainFooter from '@/components/MainFooter.vue';

// URL에서 boardPk를 받아오기 위한 설정
const route = useRoute();

// URL에서 boardPk 값 가져오기
const boardPk = route.params.boardPk; 

// 게시글 상세 정보를 저장하는 객체
const boardDetail = ref({
  boardTitle: '',
  boardBody: '',
  userPk: ''
}); 

// 댓글 리스트를 저장하는 배열 : 서버에서 받아온 댓글 데이터를 담음
const comments = ref([]); 

// 로그인한 사용자의 userPk를 저장하는 변수
const userPk = ref(Number(localStorage.getItem('userPk'))); 

// 세션에서 불러온 userPk를 저장하는 변수
const sessionUserPk = ref(''); 

// 게시글 수정 모드 활성화 여부를 저장하는 변수
const isEditing = ref(false);

// 새로운 댓글 내용을 저장하는 변수
const newComment = ref(''); 

// 서버에서 게시글 상세 정보를 가져오는 함수
const getBoardDetail = async () => {
  try {
    const response = await axios.get(`/api/board/${boardPk}`); // 게시글 정보를 가져오는 API
    if (response.status === 200) {
      boardDetail.value = response.data; // 받은 데이터를 boardDetail에 저장
      sessionUserPk.value = response.data.sessionUserPk; // 세션에서 가져온 사용자 정보도 저장
    }
  } catch (error) {
    console.error('게시글 정보를 가져오는 중 오류 발생:', error);
  }
};

// 서버에서 댓글 목록을 가져오는 함수
const getComments = async () => {
  try {
    const response = await axios.get(`/api/board/${boardPk}`); // 댓글 목록을 가져오는 API
    if (response.status === 200) {
      comments.value = response.data.comments; // 받은 댓글 데이터를 comments 배열에 저장
      sessionUserPk.value = response.data.sessionUserPk; // 세션에서 가져온 사용자 정보도 저장
    }
  } catch (error) {
    console.error('댓글을 가져오는 중 오류 발생:', error);
  }
};

// 새로운 댓글을 서버에 저장하는 함수
const saveComment = async () => {
  if (!newComment.value) {
    alert('댓글을 입력해 주세요.');
    return;
  }

  try {
    await axios.post(`/api/board/${boardPk}/comment`, {
      commentBody: newComment.value, // 새로운 댓글의 내용을 서버에 전송
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
    await axios.delete(`/api/board/${boardPk}/comment/${commentPk}`);
    getComments(); // 댓글 목록 다시 가져오기
  } catch (error) {
    console.error('댓글 삭제 중 오류 발생:', error);
  }
};

// 게시글 수정 모드 활성화
const startEditing = () => {
  isEditing.value = true;
};

// 게시글 수정 취소
const cancelEditing = () => {
  isEditing.value = false;
};

// 게시글 수정 내용 저장
const editBoard = async () => {
  try {
    const response = await axios.put(`/api/board/${boardPk}/edit`, {
      boardTitle: boardDetail.value.boardTitle,
      boardBody: boardDetail.value.boardBody,
    });
    if (response.status === 200) {
      alert('게시글이 수정되었습니다.');
      isEditing.value = false;
      router.push(`/board/${boardPk}`);  // 수정 후 해당 게시글로 다시 이동
    }
  } catch (error) {
    console.error('게시글 수정 중 오류 발생:', error);
    alert('수정 실패.');
  }
};


// 게시글 삭제하기 (수정 버튼용)
const deleteBoard = async () => {
  try {
    await axios.delete(`/api/board/${boardPk}/delete`);
    alert('게시글이 삭제되었습니다.');
    router.push('/board');
  } catch (error) {
    if (error.response) {
      // 서버로부터 받은 응답이 있으면 출력
      console.error('서버 응답 데이터:', error.response.data);
      console.error('서버 응답 상태 코드:', error.response.status);
      console.error('서버 응답 헤더:', error.response.headers);
    } else if (error.request) {
      // 요청은 성공적으로 전송되었으나 응답을 받지 못한 경우
      console.error('요청 데이터:', error.request);
    } else {
      // 요청 설정 중에 발생한 오류
      console.error('오류 메시지:', error.message);
    }
    console.error('요청 설정:', error.config);
  }
};

// 컴포넌트가 마운트될 때 게시글 정보와 댓글을 가져옴
onMounted(() => {
  getBoardDetail(); // 게시글 정보 가져오기
  getComments(); // 댓글 목록 가져오기
});


console.log('Logged-in userPk:', userPk.value);

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
            <div class="container">

              <div class="boarddetail-section" v-if="boardDetail" style="margin-bottom: 20px;">
                <div class="board-header"
                  style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                  <h1 v-if="!isEditing">{{ boardDetail.boardTitle }}</h1>
                  <input v-if="isEditing" v-model="boardDetail.boardTitle" />

                  <div v-if="boardDetail.userPk == userPk">
                    <button v-if="!isEditing" @click="startEditing">수정</button>
                    <button v-if="isEditing" @click="cancelEditing">취소</button>
                    <button v-if="isEditing" @click="editBoard">저장</button>
                    <button @click="deleteBoard">삭제</button>
                  </div>
                </div>
                <p>작성자: {{ boardDetail.userName }}</p>
                <p>작성일: {{ boardDetail.boardRegDate }}</p>
                <p>조회수: {{ boardDetail.boardViewCount }}</p>

                <div>
                  <p v-if="!isEditing">{{ boardDetail.boardBody }}</p>
                  <textarea v-if="isEditing" v-model="boardDetail.boardBody"></textarea>
                </div>
              </div>

              <!-- 댓글 섹션 -->
              <div class="comments-section">
                <h3 style="margin-bottom: 20px;">댓글 목록</h3>
                <div v-if="comments.length">
                  <ul>
                    <li v-for="(comment, index) in comments" :key="index" class="comment-item">
                      <div class="comment-header">
                        <!-- 유저 이름과 댓글 작성 시간 -->
                        <div class="comment-meta">
                          <span class="comment-username">{{ comment.userName }}</span>
                          <span class="comment-time">{{ comment.commentRegDate }}</span>
                        </div>

                        <!-- 댓글 내용 -->
                        <p class="comment-body">{{ comment.commentBody }}</p>
                        <div v-if="(comment.userPk == sessionUserPk)" class="comment-actions">
                          <button class="delete-button" @click="deleteComment(comment.commentPk)">삭제</button>
                        </div>
                      </div>
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
          </div>
        </div>
      </div>
    </div>
  </div>


  <MainFooter />
</template>

<style scoped>

.comments-section {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 1000px;
  margin-top: 20px;
}

.boarddetail-section {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 1000px;
}

.comment-item {
  position: relative; /* 부모 요소에 상대 위치 설정 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  margin-bottom: 20px;
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.comment-meta {
  font-size: 1.1em;
  margin-top: 5px;
  margin-bottom: 10px;
  color: #555;
}

.comment-username {
  font-weight: bold;
}


.comment-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 20%;
  position: absolute;
  right: 10px;  /* 오른쪽에 위치 */
}

.delete-button {
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #ff1a1a;
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
  display: block;
  width: 100%;
  padding: 20px;
  background-color: #f5f5f5;
  color: #000000;
  border: none;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}



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
  background-color: #d81f26;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: #cfcfcf;
}



.comment-header {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.comment-body {
  margin: 5px 0;
  font-size: 1.1em;
  color: #333;
}







</style>
