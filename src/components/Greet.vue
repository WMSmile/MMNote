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
    wins.listen();
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



let tabIndex = 2
const editableTabsValue = ref('2')
const editableTabs = ref([
  {
    title: 'Tab 1',
    name: '1',
    content: 'Tab 1 content',
  },
  {
    title: 'Tab 2',
    name: '2',
    content: 'Tab 2 content',
  },
])

const addTab = (targetName: string) => {
  const newTabName = `${++tabIndex}`
  editableTabs.value.push({
    title: 'New Tab',
    name: newTabName,
    content: 'New Tab content',
  })
  editableTabsValue.value = newTabName
}
const removeTab = (targetName: string) => {
  const tabs = editableTabs.value
  let activeName = editableTabsValue.value
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1]
        if (nextTab) {
          activeName = nextTab.name
        }
      }
    })
  }

  editableTabsValue.value = activeName
  editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
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

  <div>
    <div style="margin-bottom: 20px">
    <el-button size="small" @click="addTab(editableTabsValue)">
      add tab
    </el-button>
  </div>
  <el-tabs
    v-model="editableTabsValue"
    type="card"
    class="demo-tabs"
    closable
    @tab-remove="removeTab"
  >
    <el-tab-pane
      v-for="item in editableTabs"
      :key="item.name"
      :label="item.title"
      :name="item.name"
    >
      {{ item.content }}
    </el-tab-pane>
  </el-tabs>
  </div>


</template>
