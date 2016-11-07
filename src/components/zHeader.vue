<template lang="html">
  <div id="header-holder">
    <header id="header" class="navbar" :class="{ 'navbar-fixed': isFixedNavbar, 'navbar-fixed-show': isShowNavbar}">
      <div class="navbar-logo-container">
        <a href="//www.zhaoyuxiang.cn" target="_blank" class="logo icon-ic_zyx_logo" aria-label="首页">趙</a>
      </div>
      <div class="navbar-title-container clearfix anim show">
        <div class="img">
          <a>
            <z-imageinput
            :width=38
            :height=38
            :src="'static/images/avatar.jpg'"
            :alt="'作者头像'"
            :radius="'50%'"
            ></z-imageinput>
          </a>
        </div>
        <div class="titles oneline">
          <div class="main-title">
            <a>天道寺</a>
          </div>
        </div>
        <div class="functions">
          <z-button :text="'关注专栏'"></z-button>
        </div>
      </div>
      <div class="navbar-menu-container close">
        <a class="menu-button">
          <i class="icon iconfont icon-more"></i>
        </a>
      </div>
      <div class="navbar-write-container">
        <router-link to="/write">
          <i class="icon iconfont icon-edit"></i>
          写文章
        </router-link>
      </div>
    </header>
  </div>
</template>

<script>
import { zImageinput} from 'z-vue-components'
import { zButton } from 'z-vue-components'

export default {
  components: {
    zImageinput,
    zButton
  },
  data() {
    return {
      scrollTop: 0,
      isFixedNavbar: false,
      isShowNavbar: false
    };
  },
  mounted() {
    window.onscroll = () => {
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    }
  },
  computed: {

  },
  watch: {
    'scrollTop': function(newTop, oldTop) {
      if ( (newTop < oldTop) && (newTop != 0) ) {
        this.isShowNavbar = true
      }else {
        this.isFixedNavbar = false
        this.isShowNavbar = false
      }
      if ( (newTop > oldTop) && (newTop > 59) ) {
        this.isFixedNavbar = true
      }
    }
  }
};
</script>

<style lang="less" scpoed>

#header-holder {
  height: 59px;

  .navbar {
    position: relative;
    height: 58px;
    line-height: 58px;
    border-bottom: 1px solid transparent;
    background: rgba(255,255,255,.97);
    z-index: 500;

    .navbar-logo-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 58px;
      height: 58px;
      z-index: 1;

      .logo {
        display: inline-block;
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        line-height: 58px;
        text-align: center;
        color: gray;
        text-decoration: none;
        -webkit-transition: all .05s ease-in-out;
        -moz-transition: all .05s ease-in-out;
        -o-transition: all .05s ease-in-out;
        transition: all .05s ease-in-out;
        font-weight: bold;
        font-family: "楷体";
      }
    }

    .navbar-title-container {
      position: absolute;
      width: 660px;
      left: 50%;
      margin-left: -330px;
      color: #414243;
      line-height: 1;
      padding-top: 10px;
      opacity: 0;
      visibility: hidden;

      &>div {
        float: left;
      }

      .z-image-wraper {
        margin-right: 12px;
      }

      .titles.oneline {
        line-height: 34px;

        .main-title {
          font-size: 16px;
          padding-top: 3px;
          overflow: hidden;
          text-overflow: ellipsis;
          font-weight: 700;
          white-space: nowrap;
        }
      }

      .functions {
        margin-left: 32px;
        padding-top: 3px;

        .z-btn {
          width: 80px;
          height: 32px;
          padding: 0;
          min-height: 0;
          min-width: 0;
          line-height: 30px;
          box-sizing: border-box;
          border-color: #50C87E;
          color: #50C87E;
          border: 1px solid;
          border-radius: 4px;
          margin: 0;
          cursor: pointer;
          font-size: 14px;
          background-color: transparent;
          -webkit-transition: background ease-out .1s;
          transition: background ease-out .1s;
        }
      }
    }

    .navbar-title-container.show {
      opacity: 1;
      visibility: visible;
    }

    .navbar-title-container.anim {
      -webkit-transition: all .2s ease-out;
      -moz-transition: all .2s ease-out;
      -o-transition: all .2s ease-out;
      transition: all .2s ease-out;
    }

    .navbar-menu-container {
      position: relative;
      float: right;
      padding: 0 16px 0 10px;

      .menu-button {
        color: gray;
      }

      a:hover {
        color: #333;
      }
    }

    .navbar-write-container {
      position: relative;
      float: right;
      padding: 0 10px;

      &>a {
        height: 54px;
        top: 0;
        left: 0;
        color: gray;
        text-decoration: none;
        display: inline-block;

        &:hover {
          color: #333;
        }

        // i {
        //   margin-right: 3px;
        // }
      }
    }
  }

  .navbar-fixed {
    border-bottom-color: rgba(0,0,0,.08);
    position: fixed;
    left: 0;
    right: 0;
    top: -59px;
    -webkit-transition: all .2s ease-out;
    -moz-transition: all .2s ease-out;
    -o-transition: all .2s ease-out;
    transition: all .2s ease-out;
  }

  .navbar-fixed-show {
    top: 0;
  }
}

@media screen and (max-width: 760px) {
  #header-holder {
    .navbar {
      .navbar-title-container {
        left: 0;
        margin-left: 0;
        padding-left: 16px;
        width: auto;
        max-width: 62%;

        .z-image-wraper {
          display: none;
        }

        .functions {
          display: none;
        }

        .titles {
          width: e("calc(100% - 56px)");
          margin-left: 56px;
          position: relative;

          &:before {
            content: '';
            height: 24px;
            width: 1px;
            background: rgba(0,0,0,.16);
            position: absolute;
            left: -16px;
            top: 8px;
          }
        }
      }
    }
  }
}
</style>
