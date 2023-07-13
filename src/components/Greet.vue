<script setup lang="ts">
import { ref } from "vue";
import { invoke } from "@tauri-apps/api/tauri";
import { path, dialog } from "@tauri-apps/api";
import Windows from "../common/windows";

import { Md5 } from 'ts-md5';

const greetMsg = ref("");
const name = ref("");

const { open } = dialog;

var select_files:string[] = [];

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  greetMsg.value = await invoke("greet", { name: name.value });
}

async function openFiles() {
  console.log("openFiles >>")
  const files: string[] = await open({ multiple: true }) as string[];
  // if (files != null && files.length > 0) {
  //   select_files = [];
  //   files.forEach(async filePath => {
  //     console.log("filepath = ", filePath);
  //     select_files[select_files.length] = filePath;
  // // 文件路径
  // const inputPath = await path.dirname(pathName);
  //   // 文件名
  //   const fileName = await path.basename(pathName);
  //   })
  //   console.log("file path >>> ", select_files);
  // }


  openNewWindowsForFiles(files);


}
function openNewWindowsForFiles(files:string[]) {
  files.forEach(async filePath => {
    console.log("filepath = ", filePath);

    
    
    const label = Md5.hashStr(filePath)
    const url = "#/markdown" + "?filepath=" + encodeURIComponent(filePath);
    
    let wins = new Windows();

    wins.createWin({
      label: label,
      title: 'markdown',
      url: url,
      width: 900,
      height: 450,
      minWidth: 640,
      minHeight: 320,
      decorations: true,
    })
  })


}

function openNewWindows() {

  let wins = new Windows();
  wins.createWin({
    label: 'markdown',
    title: 'markdown',
    url: '#/markdown',
    width: 900,
    height: 450,
    minWidth: 640,
    minHeight: 320,
    decorations: true,
  })

}



</script>

<template>






  
  <form class="row" @submit.prevent="greet">
    <input id="greet-input" v-model="name" placeholder="Enter a name..." />
    <button type="submit">Greet</button>
  </form>

  <p>{{ greetMsg }}</p>
  <div>
    <button @click="openFiles">打开文件</button>
    <button @click="openNewWindows">新建窗口</button>
  </div>


</template>
