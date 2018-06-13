### babel插件
给方法名添加前缀

#### 全局安装babel-cli
```
npm i babel-cli -g
```

#### 运行
```
babel function.js
```

#### 实例
```
function a() {
    console.log('function a');
}
```
输出
```
function ast_a() {
    console.log('function a');
}
```

#### 查看AST在线工具
https://astexplorer.net/