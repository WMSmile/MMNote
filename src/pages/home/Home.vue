<script setup lang="ts">
import { ref } from "vue";
import { invoke } from "@tauri-apps/api/tauri";
import { path, dialog } from "@tauri-apps/api";
import Windows from "../../common/windows";

import { Md5 } from "ts-md5";

import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'

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
      width: 900,
      height: 450,
      minWidth: 640,
      minHeight: 320,
      decorations: true,
    });
    wins.listen();
  });
}

function openNewWindows() {
  let wins = new Windows();
  wins.createWin({
    label: "markdown",
    title: "markdown",
    url: "#/markdown",
    width: 900,
    height: 450,
    minWidth: 640,
    minHeight: 320,
    decorations: true,
  });
}

let tabIndex = 2;
const editableTabsValue = ref("1");
const editableTabs = ref([
  {
    title: "Tab 1",
    name: "1",
    content: "Tab 1 content",
  },
  // {
  //   title: "Tab 2",
  //   name: "2",
  //   content: "Tab 2 content",
  // },
]);

const addTab = (targetName: string) => {
  const newTabName = `${++tabIndex}`;
  editableTabs.value.push({
    title: "New Tab",
    name: newTabName,
    content: "New Tab content",
  });
  editableTabsValue.value = newTabName;
};
const removeTab = (targetName: string) => {
  const tabs = editableTabs.value;
  let activeName = editableTabsValue.value;
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.name === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1];
        if (nextTab) {
          activeName = nextTab.name;
        }
      }
    });
  }

  editableTabsValue.value = activeName;
  editableTabs.value = tabs.filter((tab) => tab.name !== targetName);
};
</script>

<template>
  <el-container>
    <el-aside width="200px">
      <!-- <el-button @click="openFiles">打开文件</el-button>
      <el-button @click="openNewWindows">新建窗口</el-button>
      <el-button size="small" @click="addTab(editableTabsValue)">
        add tab
      </el-button> -->
      <el-scrollbar>
        <el-menu :default-openeds="['1', '3']">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><message /></el-icon>导航
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="1-1" @click="openFiles"
                >打开文件</el-menu-item
              >
              <el-menu-item index="1-2" @click="openNewWindows"
                >新建窗口</el-menu-item
              >
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="1-3" @click="addTab(editableTabsValue)"
                >add tab</el-menu-item
              >
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title>Option4</template>
              <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><icon-menu /></el-icon>Navigator Two
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="2-1">Option 1</el-menu-item>
              <el-menu-item index="2-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="2-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="2-4">
              <template #title>Option 4</template>
              <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><setting /></el-icon>Navigator Three
            </template>
            <el-menu-item-group>
              <template #title>Group 1</template>
              <el-menu-item index="3-1">Option 1</el-menu-item>
              <el-menu-item index="3-2">Option 2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group 2">
              <el-menu-item index="3-3">Option 3</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="3-4">
              <template #title>Option 4</template>
              <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>
    <el-main>
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
          <!-- {{ item.content }} -->
          <EditMarkDown path="/Users/wumeng/Desktop/test.md"></EditMarkDown>

        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<style lang="css">

.el-main{
  padding: 0rpx;
}

</style>