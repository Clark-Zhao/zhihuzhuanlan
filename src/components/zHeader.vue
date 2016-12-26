<template lang="html">
  <div id="header-holder" v-if="$route.path != '/login'">
    <header id="header" class="navbar" :class="{ 'navbar-fixed': isFixedNavbar, 'navbar-fixed-show': isShowNavbar}" :style="{'border-bottom-color': $route.path=='/followers' ? 'rgba(0, 0, 0, 0.08)' : ''}">
      <div class="navbar-logo-container">
        <a href="http://zhaoyuxiang.cn" class="logo icon-ic_zyx_logo" aria-label="首页" target="_blank">趙</a>
      </div>
      <div class="navbar-title-container clearfix anim" :class="{'show': scrollTop > 270 || $route.path != '/'}">
        <div class="img">
          <router-link to="/">
            <z-imageinput
            :width=38
            :height=38
            :src="$store.state.authorAvatar"
            :alt="'作者头像'"
            :radius="'50%'"
            ></z-imageinput>
          </router-link>
        </div>
        <div class="titles oneline">
          <div class="main-title">
            <router-link to="/">天道寺</router-link>
          </div>
        </div>
        <div class="functions" v-if="$route.path === '/followers'">
          <z-button :text="'交个 ♂ 朋友'" class="makefriends" @click.native="isShowAside = true"></z-button>
        </div>
      </div>
      <div class="navbar-menu-container close">
        <a class="menu-button" v-if="$store.state.auth">
          <i class="icon iconfont icon-more"></i>
        </a>
      </div>
      <!-- <router-link to="/login" v-if="!$store.state.auth">
        <z-button :text="'登录'" class="login"></z-button>
      </router-link>
      <div class="navbar-write-container">
        <router-link to="/write">
          <i class="icon iconfont icon-edit"></i>
          写文章
        </router-link>
      </div> -->
    </header>

    <z-aside
    :show="isShowAside"
    :title="'友链申请'"
    class="submit-link"
    @close-aside="isShowAside = false">
      <div class="">
        <p>你已将本网站的友链放置在：</p>
        <input type="text" v-model="reviewUrl" placeholder="必填（网址）">
      </div>
      <div class="">
        <p>你想要在友链中显示的名字：</p>
        <input type="text" v-model="name" placeholder="必填">
      </div>
      <div class="">
        <p>你的网站地址：</p>
        <input type="text" v-model="profileUrl" placeholder="必填（网址）">
      </div>
      <div class="">
        <p>你想要在友链中显示的简介：</p>
        <input type="text" v-model="bio" placeholder="选填">
      </div>
      <div class="">
        <p>你想要在友链中显示的头像链接：</p>
        <input type="text" v-model="avatar" placeholder="选填（网址）">
      </div>

      <z-button
      :text="'提交'"
      :type="'info'"
      @click.native="submitLink"
      ></z-button>
    </z-aside>

    <z-modal
    :show="isShowAlert"
    :content="alertMessage"
    @close-modal="isShowAlert = false">
    <z-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scrollTop: 0,
      isFixedNavbar: false,
      isShowNavbar: false,
      reviewUrl: '',
      name: '',
      profileUrl: '',
      bio: '',
      avatar: '',
      isShowAside: false,
      isShowAlert: false,
      alertMessage: ''
    };
  },
  mounted() {
    var self = this
    addEventListener('scroll', function() {
      self.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    })
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
  },
  methods: {
    submitLink: function() {
      if (!this.reviewUrl) {
        alert('请填写你放置本网站友链的网址')
        return
      } else if (!this.name) {
        alert('请填写你想要在友链中显示的名字')
        return
      } else if (!this.profileUrl) {
        alert('请填写你的网站链接')
        return
      }
      this.$http.post(
        __apiBase +'submitlink',
        {
          'reviewUrl': this.reviewUrl,
          'name': this.name,
          'profileUrl': this.profileUrl,
          'bio': this.bio,
          'avatar': this.avatar
        }
      ).then((res) => {
        this.isShowAside = false
        this.isShowAlert = true
        this.alertMessage = res.data.data.message
      })
    }
  }
};
</script>

<style lang="less" scpoed>
.submit-link {

  .z-aside-content {
    div {
      margin-bottom: 10px;
    }

    p {
      font-size: 16px;
    }

    input {
      margin-top: 10px;
      padding: 9px 13px;
      font-size: 15px;
      min-height: 26px;
      line-height: 26px;
      white-space: pre-wrap;
      cursor: text;
      border: 1px solid rgba(0,0,0,.16);
      border-radius: 4px;
      width: 100%;
      resize: none;
      box-sizing: border-box;
      margin-bottom: 10px;
      outline: 0;

      &:focus {
        border: 1px solid rgba(0,128,255,.5);
      }
    }

    .z-btn {
      margin: auto;
      display: block;
    }
  }
}

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

          a {
            color: #333;
            text-decoration: none;
          }
        }
      }

      .functions {
        margin-left: 32px;
        padding-top: 3px;

        .makefriends {
          height: 32px;
          padding: 0 5px;
          min-height: 0;
          min-width: 0;
          line-height: 30px;
          box-sizing: border-box;
          border-color: #50C87E;
          border: 1px solid;
          border-radius: 4px;
          margin: 0;
          cursor: pointer;
          font-size: 14px;
          -webkit-transition: background ease-out .1s;
          transition: background ease-out .1s;

          background-color: #6861C0;
          color: #fff;
          font-weight: bold;

          &:hover {
            color: #6861C0;
            background-color: #fff;
          }
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
      }
    }

    .login {
      float: right;
      margin: 13px 16px 0 6px;
      width: 72px;
      height: 32px;
      padding: 0;
      min-height: 0;
      min-width: 0;
      line-height: 30px;
      box-sizing: border-box;
      border-color: #0080ff;
      color: #0080ff;

      &:hover {
        background-color: rgba(0,128,255,.06);
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

@media screen and (max-width: 420px) {
  .navbar-write-container {
    display: none;
  }
}
</style>
