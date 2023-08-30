use std::fs::File;
// use std::io::prelude::*;

// use serde::{ser::Serializer, Serialize};
use tauri::{
    command,
    plugin::{Builder as PluginBuilder, TauriPlugin},
    Runtime,
};

// use std::{
//     path::PathBuf,
//     time::{SystemTime, UNIX_EPOCH},
// };


#[command]
fn file_create(path: &str) -> bool{
    // 如果文件已存在，则文件内容会被清空
    let path = path;
    //创建文件，mut让文件可以写入
    let _f = File::create(path);
    return  true;
}


#[command]
fn hello(name: &str)->String{
    format!("Hello, {}! You've been greeted from Rust!", name)
}
// use demo
// let hello = await invoke('plugin:fs_ex|hello', { name:"小明" });
// console.log("hello ",hello);

pub fn init<R: Runtime>() -> TauriPlugin<R> {
    PluginBuilder::new("fs_ex")
        .invoke_handler(tauri::generate_handler![file_create, hello])
        .build()
}

