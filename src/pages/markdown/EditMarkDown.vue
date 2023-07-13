<script setup lang="ts">
import { onMounted, ref } from "vue";
import { invoke } from "@tauri-apps/api/tauri";
import { path, dialog, fs } from "@tauri-apps/api";

import Cherry from 'cherry-markdown/dist/cherry-markdown.core';
import 'cherry-markdown/dist/cherry-markdown.css';

import { useRouter,useRoute } from 'vue-router'

const greetMsg = ref("");
const name = ref("");

const { open } = dialog;

var cherryInstance: Cherry;


var select_files: string[] = [];


const router = useRouter()
const route = useRoute()


async function greet() {
  // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
  greetMsg.value = await invoke("greet", { name: name.value });
}

async function openFiles() {
  console.log("openFiles >>")
  const files: string[] = await open({ multiple: true }) as string[];
  if (files != null && files.length > 0) {
    select_files = [];
    files.forEach(async filePath => {
      console.log("filepath = ", filePath);
      select_files[select_files.length] = filePath;
    })
    console.log("file path >>> ", select_files);
  }
}




onMounted(() => { 
  console.log("onMounted >>>>>")

  cherryInstance = new Cherry({
    id: 'markdown-container',
    value: "",
  });

  console.log(route.query["filepath"])
  const tFilePath:string = route.query["filepath"] as string
  if (tFilePath) {
    const filepath = decodeURIComponent(tFilePath)
    openFile(filepath)
  }
  
  

})

async function openFile(filepath:string) {
  const content = await fs.readTextFile(filepath);
  console.log("content = ", content.toString());
  cherryInstance.setValue(content);


}



</script>


<template>
    <div class="m_container">
        <div id="markdown-container"></div>
    </div>
</template>

<style>
.m_container{
    height: 100%;
    width:100%;
}

</style>