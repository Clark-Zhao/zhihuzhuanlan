<template>
  <div id="app">
    <z-progress></z-progress>
    <z-header></z-header>
    <main class="main-container">
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import zHeader from './components/zHeader'

import { zProgress } from 'z-vue-components'

export default {
  name: 'app',
  components: {
    zHeader,

    zProgress
  }
}
</script>

<style lang="less">
  html,body,h1,p,ul,menu {
    margin: 0;
    padding: 0;
  }

  body,textarea,input {
    word-wrap: break-word;
    color: #333;
    font-size: 16px;
    line-height: 1;
    font-weight: 400;
    font-family: -apple-system,"Helvetica Neue",Arial,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
  }

  .clearfix:before, .clearfix:after {
    display: table-cell;
    content: '';
  }
  .clearfix:after {
    clear: both;
  }

  .holdertext {
    color: #b3b3b3;
    pointer-events: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
  }

  .icon {
    width: 1em; height: 1em;
    vertical-align: text-bottom;
    fill: currentColor;
    overflow: hidden;
  }

  [class^=icon-], [class*=" icon-"] {
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 24px;
    position: relative;
    top: 4px;
  }

  .main-container {
    min-height: 660px;

    .main {
      margin: 47px 0 0;
      padding: 0 0 55px;
    }

    .receptacle {
      width: 660px;
      margin-left: auto;
      margin-right: auto;
      position: relative;
    }
  }

  .post-view {
    .entry-content {
      p+p {
        margin: 20px 0;
      }
    }
  }

@media screen and (max-width: 660px) {
  .main-container {
    .receptacle {
      width: auto;
    }
  }
}
</style>
