<template>
  <div id="app">
    <z-progress ref="progress"></z-progress>
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
  },
  watch: {
    '$route': function(to, from) {
      this.startProgress()
      scrollTo(0,0)

      if (to.path == '/write' && this.$store.state.auth == false) {
        this.$router.push('/login')
      } else if (to.path == '/login' && this.$store.state.auth == true) {
        this.$router.push(from.path)
      }
    }
  },
  methods: {
    startProgress: function() {
      this.$refs.progress.startProgress()
    },
    isLogin: function() {
      this.$http.get('http://' + this.$store.state.urlBase +':3000/api/islogin',
        {
          params: {
            token: this.getCookie('token')
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
            this.$store.state.auth = true
            console.log("已登录！");
          }
        }, function(res) {

      })
    },
    getCookie: function(key) {
      var arr,reg = new RegExp("(^| )" + key + "=([^;]*)(;|$)");
      if(arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
      } else {
        return null;
      }
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

    .post-view {
      .entry-title-image {
        margin-left: -16px;
        margin-right: -16px;
        background: gray;
      }
    }
  }
}
</style>
