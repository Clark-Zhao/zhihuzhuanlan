<template>
  <div id="app">
    <z-progress ref="progress"></z-progress>
    <z-backtop
    :scroll-top="270"
    ></z-backtop>
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
  },
  mounted() {
    this.startProgress()
    this.isLogin()
    this.$store.dispatch('getVisitorNumbers')
  },
  watch: {
    '$route': function(to, from) {
      this.startProgress()

      if (to.path == '/write' && this.$store.state.auth == false) {
        this.$router.push('/login')
      } else if (to.path == '/login' && this.$store.state.auth == true) {
        this.$router.push(from.path)
      }
    },
    '$store.state.title': function() {
      document.title = this.$store.state.title
    }
  },
  methods: {
    startProgress: function() {
      this.$refs.progress.startProgress()
    },
    isLogin: function() {
      this.$http.get(__apiBase +'islogin',
        {
          params: {
            token: _utils.getCookie('token')
          }
        }
      ).then(
        function(res) {
          if (res.data.message == 'error') {
            this.$store.state.auth = false
            console.log("未登录！");
            if (this.$route.path == '/write') {
              this.$router.push('/login')
            }
          } else {
            this.$store.commit('isLogin')
            console.log("已登录！");
          }
        }, function(res) {

      })
    }
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

  img {
    max-width: 100%;
    width: auto\9;
    height: auto;
    vertical-align: middle;
    border: 0;
    -ms-interpolation-mode: bicubic;
  }

  a {
    text-decoration: none;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
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

  .z-image-wraper {
    img {
      max-width: none;
    }
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

    .post-view {
      .entry-title-image {
        margin-left: -16px;
        margin-right: -16px;
        background: gray;
      }
    }
  }

  .z-backtop-wrapper.show-top {
    right: 10px;
    bottom: 20px;
  }
}
</style>
