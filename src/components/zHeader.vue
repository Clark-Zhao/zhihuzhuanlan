<template lang="html">
  <div id="header-holder">
    <header id="header" class="navbar" :class="{ 'navbar-fixed': isFixedNavbar, 'navbar-fixed-show': isShowNavbar}">
      <div class="navbar-logo-container">
        <a href="//www.zhaoyuxiang.cn" target="_blank" class="logo icon-ic_zyx_logo" aria-label="首页">趙</a>
      </div>
    </header>
  </div>
</template>

<script>
export default {
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
[class^=icon-], [class*=" icon-"] {
    font-size: 24px;
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
  }

  .navbar-fixed {
    border-bottom-color: rgba(0,0,0,.08);
    position: fixed;
    left: 0;
    right: 0;
    // -webkit-transform: translateY(-59px);
    // -ms-transform: translateY(-59px);
    // transform: translateY(-59px);
    top: -59px;
    -webkit-transition: all .2s ease-out;
    -moz-transition: all .2s ease-out;
    -o-transition: all .2s ease-out;
    transition: all .2s ease-out;
  }

  .navbar-fixed-show {
    // -webkit-transform: translateY(0);
    // -ms-transform: translateY(0);
    // transform: translateY(0);
    top: 0;
  }
}
</style>
