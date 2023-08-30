<script setup lang="ts">
import { ref } from "vue";
import { invoke } from "@tauri-apps/api/tauri";
import { path, dialog } from "@tauri-apps/api";
import Windows from "../../common/windows";

import { Md5 } from "ts-md5";

import { Menu as IconMenu, Message, Setting } from "@element-plus/icons-vue";

import EditMarkDown from "../markdown/EditMarkDown.vue";

const greetMsg = ref("");
const name = ref("");

const { open } = dialog;

var select_files: string[] = [];

async function greet() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  greetMsg.value = await invoke("greet", { name: name.value });
}

async function openFiles() {
  console.log("openFiles >>");
  const files: string[] = (await open({ multiple: true })) as string[];
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
function openNewWindowsForFiles(files: string[]) {
  files.forEach(async (filePath) => {
    console.log("filepath = ", filePath);

    const label = Md5.hashStr(filePath);
    const url = "#/markdown" + "?filepath=" + encodeURIComponent(filePath);

    let wins = new Windows();

    wins.createWin({
      label: label,
      title: "markdown",
      url: url,
      width: 1024,
      height: 768,
      minWidth: 640,
      minHeight: 320,
      decorations: false,
    });
    // wins.listen();
  });
}

function openNewWindows() {
  let wins = new Windows();
  wins.createWin({
    label: "markdown",
    title: "markdown",
    url: "#/markdown",
    width: 1024,
    height: 768,
    minWidth: 640,
    minHeight: 320,
    decorations: false,
  });
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <h1>您好，欢迎使用MMNote</h1>
      </el-header>
      <el-main>
        <el-row :gutter="24">
          <el-col :span="12" :offset="6" :justify-content="true">
            <el-button @click="openNewWindows">新建文件</el-button>
            <el-button @click="openFiles">打开文件</el-button>
          </el-col>
        </el-row>
      </el-main>
      <!-- <el-footer>Footer</el-footer> -->
    </el-container>
  </div>
</template>

<style lang="css">
.el-main {
  padding: 0rpx;
}
</style>
