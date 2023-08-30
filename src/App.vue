<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import Greet from "./components/Greet.vue";


//主题切换
import { useDark, useToggle, usePreferredDark } from "@vueuse/core";
import { ElConfigProvider } from 'element-plus'

import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

var isDark = useDark();
useToggle(isDark);
// const isDark = usePreferredDark();
const toggleDark = useToggle(isDark);

console.log("isDark =", isDark);

const locale = zhCn;
// import { appWindow } from '@tauri-apps/api/window'
// document
//   .getElementById('titlebar-minimize')
//   .addEventListener('click', () => appWindow.minimize())
// document
//   .getElementById('titlebar-maximize')
//   .addEventListener('click', () => appWindow.toggleMaximize())
// document
//   .getElementById('titlebar-close')
//   .addEventListener('click', () => appWindow.close())




</script>

<template>
  <div class="container">
    <!-- <button @click="toggleDark()">
      <i inline-block align-middle i="dark:carbon-moon carbon-sun" />
      <span class="ml-2">{{ isDark ? "Dark" : "Light" }}</span>
    </button> -->
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <el-config-provider :locale="locale">
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<style type="scss" scoped>
.container {
  margin: 0; 
  padding-top: 0;
  width: 100%;
  height: 100%;
  /* background-color: blue; */
}
</style>
