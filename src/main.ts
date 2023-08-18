import { createApp } from "vue";
import "./styles/styles.css";
import App from "./App.vue";
import { router } from "./router/index"

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import { store } from "./store";


// createApp(App).mount("#app");
const app = createApp(App)
//确保 _use_ 路由实例使
//整个应用支持路由。
app.use(router)
app.use(store)
app.use(ElementPlus)


app.mount('#app')
