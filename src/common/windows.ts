/**
 * @desc    tauri窗口创建器
 * @author: wumeng
 * @time    2023.07
 */

import { WebviewWindow, appWindow, getAll, getCurrent } from '@tauri-apps/api/window'
import { relaunch, exit } from '@tauri-apps/api/process'
import { emit, listen } from '@tauri-apps/api/event'


export const windowConfig = {
    label: null,            // 窗口唯一label
    title: '',              // 窗口标题
    url: '',                // 路由地址url
    width: 900,             // 窗口宽度
    height: 640,            // 窗口高度
    minWidth: null,         // 窗口最小宽度
    minHeight: null,        // 窗口最小高度
    x: null,                // 窗口相对于屏幕左侧坐标
    y: null,                // 窗口相对于屏幕顶端坐标
    center: true,           // 窗口居中显示
    resizable: true,        // 是否支持缩放
    maximized: false,       // 最大化窗口
    decorations: false,     // 窗口是否无边框及导航条
    alwaysOnTop: false,     // 置顶窗口
}

class Windows {
    mainWin: null
    
    constructor() {
        this.mainWin = null
    }

    getWin(label: string) {
        return WebviewWindow.getByLabel(label)
    }

    getAllWin() {
        return getAll()
    }

    // 创建新窗口
    async createWin(options: any) {
        const args = Object.assign({}, windowConfig, options)

        // 判断窗口是否存在
        const existWin = getAll().find(w => w.label == args.label)
        if(existWin) {
            if(existWin.label.indexOf('main') == -1) {
                await existWin?.unminimize()
                await existWin?.setFocus()
                return
            }
            await existWin?.close()
        }

        // 创建窗口对象
        let win = new WebviewWindow(args.label, args)
        
        // 是否最大化
        if(args.maximized && args.resizable) {
            win.maximize()
        }

        // 窗口创建完毕/失败
        win.once('tauri://created', async() => {
            console.log('window create success!')
        })

        win.once('tauri://error', async() => {
            console.log('window create error!')
        })
    }

    // 开启主进程监听事件
    async listen() {
        // 创建新窗体
        await listen('win-create', (event) => {
            console.log("win-create >>> ",event)
            const content: string = event.payload as string;
            this.createWin(JSON.parse(content))
        })

        // 显示窗体
        await listen('win-show', async(event) => {
            console.log("win-show >>> ",event)
            if(appWindow.label.indexOf('main') == -1) return
            await appWindow.show()
            await appWindow.unminimize()
            await appWindow.setFocus()
        })

        // 隐藏窗体
        await listen('win-hide', async(event) => {
            console.log("win-hide >>> ",event)
            if(appWindow.label.indexOf('main') == -1) return
            await appWindow.hide()
        })

        // 退出应用
        await listen('win-exit', async(event) => {
            console.log("win-exit >>> ",event)
            console.log("win-exit >>>> ");
            await exit()
        })

        // 重启应用
        await listen('win-relaunch', async(event) => {
            console.log("win-relaunch >>> ",event)
            await relaunch()
        })

        // 主/渲染进程传参
        await listen('win-setdata', async (event) => {
            const content: string = event.payload as string;
            await emit('win-postdata', JSON.parse(content))
        })
    }
}

export default Windows


/*
const createManageWin = async() => {
    createWin({
        label: 'Manage',
        title: '管理页面',
        url: '/manage',
        width: 600,
        height: 450,
        minWidth: 300,
        minHeight: 200
    })
}

const createAboutWin = async() => {
    createWin({
        label: 'About',
        title: '关于页面',
        url: '/about',
        width: 500,
        height: 500,
        resizable: false,
        alwaysOnTop: true
    })
}


import { appWindow } from '@tauri-apps/api/window';
await appWindow.emit('window-loaded', { loggedIn: true, token: 'authToken' });

*/