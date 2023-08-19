<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import Greet from "./components/Greet.vue";

//主题切换
import { useDark, useToggle, usePreferredDark } from "@vueuse/core";
var isDark = useDark();
useToggle(isDark);
// const isDark = usePreferredDark();
const toggleDark = useToggle(isDark);

console.log("isDark =", isDark);
</script>

<template>
  <div class="container">
    <!-- <button @click="toggleDark()">
      <i inline-block align-middle i="dark:carbon-moon carbon-sun" />
      <span class="ml-2">{{ isDark ? "Dark" : "Light" }}</span>
    </button> -->
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <router-view></router-view>
  </div>
</template>

<style type="scss" scoped>
.container {
  height: 100vh;
}
</style>
