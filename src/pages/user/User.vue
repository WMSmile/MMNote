<template>
    <div class="outer">
      <h2>这是用户页面</h2>
      <router-link :to="{name: 'Login'}">登录</router-link> |
      <router-link :to="{name: 'Register'}">注册</router-link>
      <router-view></router-view>
    </div>
  </template>
   
  <script lang="ts">
  export default {
    name: 'User'
  }
  </script>
   
  <style scoped>
  .outer {
    margin: 20px;
    border: 2px solid red;
    padding: 20px;
  }
  </style>