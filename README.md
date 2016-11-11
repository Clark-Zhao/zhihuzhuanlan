# blog

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
## 使用技术
1. Vue2.0
2. ES6

## 脚手架
vue-cli

## UI
知乎专栏

## 依赖
1. vue-router
2. vuex
3. vue-resource
3. z-vue-components
4. less
5. less-loader
6. markdown-it
7. highlight.js
8. js-md5

## webpack配置

### less-loader

```js
{
  test: /\.less$/,
  loader: 'less'
}
```

## 该记住的点

1. 网页被卷去的高： `document.documentElement.scrollTop || document.body.scrollTop`

2. 使用LESS不能识别的属性：`width: calc(100% - 56px);`会变成`width: calc(44%);`应写成`width: e("calc(100% - 56px)");`

3.       
```
  var imgData = new FormData();
  var imgFile = document.getElementById('js-title-img-input').files[0]
  imgData.append('smfile', imgFile)
```
这样子直接`console.log(imgData)`拿到的东西似乎是没用的，imgData中的数据也不能通过imgData.smfile来获取，要使用`imgData.get('smfile')`


## 兼容性问题

手机浏览器@blur无效：写文章页面的请输入标题和请输入正文的提示文案不一定能正常显示（只影响了视觉效果，不影响功能，日后看情况解决）

## z-vue-components可以改进的点
1. 进度条可以增加一个判断是否完全载入的props，让进度条更加真实。
