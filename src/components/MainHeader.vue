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
        <ul class="nav-center">
          <li><a href="#">Menu</a></li>
          <li><a href="#">Burger King</a></li>
          <li><a href="#">Board</a></li>
          <li><a href="#">My Page</a></li>
        </ul>
        <ul class="nav-right">
          <li><a href="#" @click="goToLoginpage">Login</a></li>
        </ul>
      </nav>
    </header>
  </template>
  

<style scoped>

</style>

