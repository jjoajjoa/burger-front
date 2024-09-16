<script setup>

import MainHeader from '@/components/MainHeader.vue';
import { ref } from 'vue';

// 사용자가 입력하는 값들
const name = ref('');
const registrationFirst = ref('');
const registrationSecond = ref('');
const foundId = ref(''); // 찾은 아이디를 저장할 변수
const tab = ref('personal'); // 선택된 탭

// 아이디 찾기 함수
const findId = () => {
  // 여기에서 서버에 아이디를 찾기 위한 요청을 보낼 수 있습니다.
  // 아래는 테스트를 위해 임의로 찾은 아이디를 설정한 예시입니다.
  
  // 조건 예시: 이름이 '김사장'이고 주민등록번호가 맞을 경우 아이디 찾기 성공
  if (name.value === '김사장' && registrationFirst.value === '881225') {
    foundId.value = 'bznavi1234'; // 찾은 아이디 예시
  } else {
    foundId.value = ''; // 못 찾았을 경우
    alert('아이디를 찾을 수 없습니다.');
  }
};

// 아이디를 마스킹 처리하는 함수
const maskId = (id) => {
  return id.slice(0, 5) + '****';
};


</script>

<template>

    <MainHeader />

    <div class="app-main flex-column flex-row-fluid" id="kt_app_main" style="flex-grow: 1; overflow: auto;">
        <div class="d-flex flex-column flex-column-fluid" style="flex-grow: 1; justify-content: center; align-items: center;">
            <div id="kt_app_content" class="app-content flex-column-fluid" style="flex-grow: 1; display: flex; flex-direction: column;">
                <div id="kt_app_content_container" class="app-container container-xxl" style="flex-grow: 1; padding: 50px 0; display: flex; justify-content: center; align-items: center;">
                    <div class="d-flex flex-column flex-xl-row" style="flex-grow: 1; justify-content: center; align-items: center;">

    <div class="tab-menu">
      <button :class="{ active: tab === 'personal' }" @click="tab = 'personal'">개인 아이디</button>
      <button :class="{ active: tab === 'business' }" @click="tab = 'business'">사업자 아이디</button>
    </div>
    
    <div v-if="tab === 'personal'">
      <form @submit.prevent="findId">
        <div>
          <label for="name">이름*</label>
          <input type="text" v-model="name" placeholder="이름을 입력하세요" />
        </div>
        <div>
          <label for="registration">주민등록번호*</label>
          <input type="text" v-model="registrationFirst" maxlength="6" placeholder="앞자리 입력" />
          <input type="password" v-model="registrationSecond" maxlength="7" placeholder="뒤자리 입력" />
        </div>
        <button type="submit">아이디 찾기</button>
      </form>
    </div>

    <div v-if="foundId">
      <p>{{ name }}님의 아이디는</p>
      <p><strong>{{ maskId(foundId) }}</strong>입니다.</p>
    </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.tab-menu {
  display: flex;
  margin-bottom: 20px;
}

.tab-menu button {
  flex: 1;
  padding: 10px;
  border: none;
  background-color: #f0f0f0;
  cursor: pointer;
}

.tab-menu button.active {
  background-color: #ddd;
  font-weight: bold;
}

form {
  margin-bottom: 20px;
}

input {
  display: block;
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
}

button {
  background-color: #6200ea;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #3700b3;
}
</style>