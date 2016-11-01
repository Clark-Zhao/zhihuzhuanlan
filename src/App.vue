<template>
  <div id="app">
    <z-header></z-header>
    <main class="main-container">
      <z-index></z-index>
    </main>
  </div>
</template>

<script>
import zHeader from './components/zHeader'
import zIndex from './components/zIndex'
export default {
  name: 'app',
  components: {
    zHeader,
    zIndex
  }
}
</script>

<style lang="less">
  html,body,ul,menu {
    margin: 0;
    padding: 0;
  }

  body {
    word-wrap: break-word;
    color: #333;
    font-size: 16px;
    line-height: 1;
    font-weight: 400;
    font-family: -apple-system,"Helvetica Neue",Arial,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
  }

  .icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }

  .main-container {
    min-height: 660px;
  }
</style>
