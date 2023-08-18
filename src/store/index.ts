// store.ts
import { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'
// 引入tab模块
import tabs, { TabsState } from './modules/tabs'
// 引入menu模块
import menu, { MenuState } from './modules/menu'
// 引入vuex-ts自定义类型推断类，代码提示的核心
import { CommonStore } from './vue_ts'
 
 
// 定义根级State类型
export type RootState = {
    tabs: TabsState,
    menu: MenuState
}
 
 
// 把多个模块聚合在一起
export const modules = {
    tabs: tabs,
    menu: menu
}
 
 
export const key: InjectionKey<Store<RootState>> = Symbol()
export const store = createStore<RootState>({
    modules
}) as CommonStore
 
 
// 定义自己的 `useStore` 组合式函数
export function useStore(): CommonStore {
    return baseUseStore(key);
}



// 如何使用实例

// <template>
// </template>
 
 
// <script setup lang='ts'>
// // 这里要注意，引入的是我们自定义的useStore，不是vuex里面的useStore
// import { useStore } from './store';
// const store = useStore()
// store.getters['menu/getCount']
// store.dispatch('menu/setAsyncCount')
// store.commit('menu/setCount')
// </script>