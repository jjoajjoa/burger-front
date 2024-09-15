<script setup>
import router from '@/router/index.js';

function goToHome() {
    router.replace({ path: '/', query: {} });
}

</script>

<template>
    <header class="header">
      <div class="logo" @click="goToHome" style="cursor: pointer;">
        <h1>FIVE GIRLS</h1>
      </div>
      
      <nav class="navigation">
        <ul>
          <li><a href="#">Menu</a></li>
          <li><a href="#">Burger King</a></li>
          <li><a href="#">Board</a></li>
          <li><a href="#">My Page</a></li>
          <li><a href="#" @click="logout">Logout</a></li>
        </ul>
      </nav>
    </header>
  </template>
  
  
  <style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
  }
  
  .logo h1 {
    font-weight: bold;
    color: red;
    cursor: pointer;
  }
  
  .navigation ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  
  .navigation ul li {
    margin: 0 15px;
  }
  
  .navigation ul li a {
    text-decoration: none;
    color: black;
    font-weight: bold;
  }
  
  .navigation ul li a:hover {
    color: tomato;
  }
  </style>