<script setup lang="ts">
import { onMounted, ref } from "vue";
import { invoke } from "@tauri-apps/api/tauri";
import { path, dialog, fs } from "@tauri-apps/api";

import Cherry from 'cherry-markdown/dist/cherry-markdown.core';
import 'cherry-markdown/dist/cherry-markdown.css';

import { useRouter,useRoute } from 'vue-router'
import { setInterval } from "timers";

var cherryInstance: Cherry

const router = useRouter()
const route = useRoute()

var filepath: string|null = null

onMounted(() => { 
  console.log("onMounted >>>>>")

  cherryInstance = new Cherry({
    id: 'markdown-container',
    value: "",
  });

  console.log(route.query["filepath"])
  const tFilePath:string = route.query["filepath"] as string
  if (tFilePath) {
    filepath = decodeURIComponent(tFilePath)
    openFile(filepath)
  }
  
  

})

async function openFile(filepath:string) {
  const content = await fs.readTextFile(filepath);
  console.log("content = ", content.toString());
  cherryInstance.setValue(content);


}

function autoSaveFile(){

  setTimeout(() => {
    
    console.log("auto save >>>>",filepath);
    const contentStr = cherryInstance.getMarkdown();
    console.log("contentStr = ",contentStr)

    saveFile(filepath || "",contentStr);

    autoSaveFile();

  }, 10*1000)

}

async function saveFile(filepath:string,content:string) {
   await fs.writeTextFile(filepath,content)
}

autoSaveFile();


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