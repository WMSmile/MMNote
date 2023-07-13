import { createRouter, createWebHashHistory } from 'vue-router'



// 1. 定义路由组件.
// 也可以从其他文件导入
import GreetVue from '../components/Greet.vue'
import User from '../pages/user/User.vue'

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
    { path: '/', name:"Home", component: GreetVue },
    { path: '/home', component: () => import('../components/Greet.vue') },
    { path: '/about', component: () => import('../components/Greet.vue') },
    { path: '/markdown', component: () => import('../pages/markdown/EditMarkDown.vue') },
    {
        path: '/user',
        name: "User",
        component: User,
        children: [
            {
                path: 'login',
                name: 'Login',
                component:  () => import('../pages/user/Login.vue')
            },
            {
                path: 'register',
                name: 'Register',
                component:  () => import('../pages/user/Register.vue')
            }
        ]
    }
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
})

// // 5. 创建并挂载根实例
// const app = Vue.createApp({})
// //确保 _use_ 路由实例使
// //整个应用支持路由。
// app.use(router)

// app.mount('#app')

// // 现在，应用已经启动了！



