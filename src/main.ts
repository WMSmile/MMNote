import { createApp } from "vue";
import "./styles.css";
import App from "./App.vue";
import { router } from "./router/index"


// createApp(App).mount("#app");
const app = createApp(App)
//确保 _use_ 路由实例使
//整个应用支持路由。
app.use(router)

app.mount('#app')