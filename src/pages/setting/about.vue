<script setup lang="ts">
import { ref } from "vue";
import { invoke } from "@tauri-apps/api/tauri";
import { path, dialog } from "@tauri-apps/api";

const greetMsg = ref("");
const name = ref("");

const { open } = dialog;

var select_files:String[] = [];

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  greetMsg.value = await invoke("greet", { name: name.value });
}

async function openFiles() {
  console.log("openFiles >>")
  const files: String[] = await open({ multiple: true }) as String[];
  if (files != null && files.length > 0) {
    select_files = [];
    files.forEach(async filePath => {
      console.log("filepath = ", filePath);
      select_files[select_files.length] = filePath;
    })
    console.log("file path >>> ", select_files);
  }
}



</script>

<template>


<h1>Welcome to Tauri!</h1>

<div class="row">
  <a href="https://vitejs.dev" target="_blank">
    <img src="/vite.svg" class="logo vite" alt="Vite logo" />
  </a>
  <a href="https://tauri.app" target="_blank">
    <img src="/tauri.svg" class="logo tauri" alt="Tauri logo" />
  </a>
  <a href="https://vuejs.org/" target="_blank">
    <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
  </a>
</div>

<p>Click on the Tauri, Vite, and Vue logos to learn more.</p>

<p>
  Recommended IDE setup:
  <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
  +
  <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
  +
  <a href="https://github.com/tauri-apps/tauri-vscode" target="_blank"
    >Tauri</a
  >
  +
  <a href="https://github.com/rust-lang/rust-analyzer" target="_blank"
    >rust-analyzer</a
  >
</p>




  
  <form class="row" @submit.prevent="greet">
    <input id="greet-input" v-model="name" placeholder="Enter a name..." />
    <button type="submit">Greet</button>
  </form>

  <p>{{ greetMsg }}</p>
  <div>
    <button @click="openFiles">打开文件</button>
  </div>


</template>

<style>
    .logo.vite:hover {
  filter: drop-shadow(0 0 2em #747bff);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #249b73);
}
</style>