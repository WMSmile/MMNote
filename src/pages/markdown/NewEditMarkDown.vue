<script setup lang="ts">
import { onMounted, ref } from "vue";
import {path, dialog, fs } from "@tauri-apps/api";
import { appWindow } from "@tauri-apps/api/window";

import Cherry from "cherry-markdown/dist/cherry-markdown.core";
import "cherry-markdown/dist/cherry-markdown.css";

import { useRouter, useRoute } from "vue-router";
import Header from "../../components/windows/Header.vue";

import { onBeforeRouteLeave, onBeforeRouteUpdate } from "vue-router";

import { ElMessageBox } from "element-plus";

// 添加一个导航守卫，在当前组件将要离开时触发。
onBeforeRouteLeave((to, from, next) => {
  console.log("onBeforeRouteLeave >>>> ");
});

// 添加一个导航守卫，在当前组件更新时触发。
// 在当前路由改变，但是该组件被复用时调用。
onBeforeRouteUpdate((to, from, next) => {
  console.log("onBeforeRouteUpdate >>>> ");
});

var cherryInstance: Cherry;

// const router = useRouter()
const route = useRoute();

var filepath: string | null = null;

onMounted(() => {
  console.log("onMounted >>>>>");

  cherryInstance = new Cherry({
    id: "markdown-container",
    value: "",
  });

  console.log(route.query["filepath"]);
  const tFilePath: string = route.query["filepath"] as string;
  if (tFilePath) {
    filepath = decodeURIComponent(tFilePath);
    openFile(filepath);
  }
});

async function openFile(filepath: string) {
  const content = await fs.readTextFile(filepath);
  console.log("content = ", content.toString());
  cherryInstance.setValue(content);
}

function autoSaveFile() {
  setTimeout(() => {
    console.log("auto save >>>>", filepath);
    const contentStr = cherryInstance.getMarkdown();
    console.log("contentStr = ", contentStr);

    saveFile(filepath || "", contentStr);

    autoSaveFile();
  }, 10 * 1000);
}

async function saveFile(filepath: string, content: string) {
  await fs.writeTextFile(filepath, content);
}

// let screenHeight = window.innerHeight;
// console.log(screenHeight);

// autoSaveFile();

async function w_close() {
  // await dialog.message('Tauri is awesome', 'Tauri');

  // const confirmed = await confirm('确认保存吗?', '通知');
  // if (confirmed) {
  //   console.log("save");
  // } else {
  //   console.log("not save");
  // }

  ElMessageBox.confirm("是否保存文件？")
    .then(async () => {
      if (filepath) {
        console.log("save");
        const contentStr = cherryInstance.getMarkdown();
        console.log("contentStr = ", contentStr);

        saveFile(filepath || "", contentStr);
      } else {
        // const defaultPath = await path.downloadDir();
        const filePath = await dialog.save({
          // title: "保存文件到：",
          // defaultPath: defaultPath,
          filters: [
            {
              name: "text",
              extensions: ["md"],
            },
          ],
        });
        console.log("filePath", filePath);
        
        
        console.log("save");
        const contentStr = cherryInstance.getMarkdown();
        console.log("contentStr = ", contentStr);
        saveFile(filepath || "", contentStr);
       
      }

      //关闭窗口
      // await appWindow.close();
    })
    .catch(async (err) => {
      console.log("not save",err);
      //关闭窗口
      // await appWindow.close();
    });

  //关闭窗口
  // await appWindow.close();
}
</script>

<template>
  <!-- <Header></Header> -->
  <div class="edit_bg">
    <Header :is-custom-close="true" @close="w_close"></Header>
    <div class="md_header"></div>
    <div class="m_container">
      <div id="markdown-container" class="markdown-container"></div>
    </div>
    <!-- <div class="md_footer">底部啊</div> -->
  </div>
</template>

<style type="scss">
.edit_bg {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.m_container {
  /* height:calc(100vh - 90px); */
  height: calc(100vh - 30px);
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  /* flex: 1; */
}

.md_header {
  height: 30px;
  min-height: 30px;
  flex-shrink: 0;
}

.markdown-container {
  flex: 1;
}
.md_footer {
  height: 30px;
  min-height: 30px;
  flex-shrink: 0;
}
</style>
