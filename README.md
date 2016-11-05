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

## webpack配置

### less-loader

```js
{
  test: /\.less$/,
  loader: 'less'
}
```

## 该记住的点

网页被卷去的高： `document.documentElement.scrollTop || document.body.scrollTop`

使用LESS不能识别的属性：`width: calc(100% - 56px);`会变成`width: calc(44%);`应写成`width: e("calc(100% - 56px)");`


##兼容性问题

手机浏览器@blur无效：写文章页面的请输入标题和请输入正文的提示文案不一定能正常显示（只影响了视觉效果，不影响功能，日后看情况解决）
