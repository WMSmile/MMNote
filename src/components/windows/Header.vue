<template>
  <div data-tauri-drag-region class="titlebar">
    <div data-tauri-drag-region class="tb_l">
      <div data-tauri-drag-region style="flex: 1"></div>
      <div
        class="titlebar-button"
        id="titlebar-minimize"
        @click="minimizeClick()"
      >
        <img
          src="https://api.iconify.design/mdi:window-minimize.svg"
          alt="minimize"
        />
      </div>
      <div
        class="titlebar-button"
        id="titlebar-maximize"
        @click="maximizeClick()"
      >
        <img
          src="https://api.iconify.design/mdi:window-maximize.svg"
          alt="maximize"
        />
      </div>
      <div class="titlebar-button" id="titlebar-close">
        <img
          src="https://api.iconify.design/mdi:close.svg"
          alt="close"
          @click="close()"
        />
      </div>
    </div>
    <div data-tauri-drag-region class="tb_m">
      <label>{{ props.name || "未命名" }}</label>
    </div>
    <div data-tauri-drag-region class="tb_r"></div>
  </div>
</template>

<script lang="ts" setup>
import Vue from "vue";
import { appWindow } from "@tauri-apps/api/window";

let props = defineProps({
  name: {
    type: String, //接受的数据类型
    default: "未命名", //接受默认数据
  },
  isCustomClose: {
    type: Boolean,
    default: false,
  },
  isCustomMax: {
    type: Boolean,
    default: false,
  },
  isCustomMin: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["close", "toggleMaximize", "minimize"]);

const close = () => {
  if (props.isCustomClose) {
    emit("close", {});
  } else {
    appWindow.close();
  }
};
const maximizeClick = () => {
  if (props.isCustomMax) {
    emit("toggleMaximize", {});
  } else {
    appWindow.toggleMaximize();
  }
};
const minimizeClick = () => {
  if (props.isCustomMin) {
    emit("minimize", {});
  } else {
    appWindow.minimize();
  }
};
</script>

<style type="scss">
.titlebar {
  width: 100%;
  height: 30px;
  background: #329ea3;
  user-select: none;
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
}
.tb_l {
  flex: 1;
  display: flex;
  flex-direction: row-reverse;
}
.tb_m {
  flex: 1;
  text-align: center;
  font: 15px;
  height: 30px;
  line-height: 30px;
}
.tb_r {
  flex: 1;
}
.titlebar-button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
}
.titlebar-button:hover {
  background: #5bbec3;
}
</style>
