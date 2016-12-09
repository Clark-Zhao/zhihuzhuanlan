<template lang="html">
  <div class="index-main">
    <div class="index-main-body">
      <div class="sign-flow">
        <div class="index-tab-navs">
          <div class="navs-slide">
            <a href="#" v-if="false">注册</a>
            <a>登录</a>
          </div>
        </div>
        <div class="view">
          <div class="group-inputs">
            <div class="input-wraper">
              <input type="text" name="username" placeholder="用户名" v-model="login.username" />
            </div>
            <div class="input-wraper">
              <input type="password" name="password"  placeholder="密码" v-model="login.password" />
            </div>
          </div>
          <div class="button-wrapper command">
            <z-button :text="'登录'" @click.native="login"></z-button>
          </div>
          <div class="register" v-if="false">
            <input type="text" name="username" v-model="register.username" />
            <input type="password" name="password" v-model="register.password" />
            <button @click="register">注册</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var md5 = require('js-md5');

export default {
  data() {
    return {
      login: {
        username: '',
        password: ''
      },
      register: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    login: function() {
      this.$http.post(
        this.$store.state.apiBase + 'login',
        {
          'username': this.login.username,
          'password': md5(this.login.password)
        }
      ).then(function(res) {
        if (res.data.message == 'error') {
          console.log(res.data.data.message);
        } else {
          // 登录成功处理
          console.log(res.data.data.message);
          this.setCookie('token', res.data.data.token)
          this.$store.state.auth = true
          this.$router.go(-1)
        }
      }, function(res) {
        console.log(res);
      })
    },
    register: function() {
      this.$http.post(
        'http://localhost:3000/api/register',
        {
          'username': this.register.username,
          'password': md5(this.register.password)
        }
      ).then(function(res) {
        if (res.data.message == 'error') {
          console.log(res.data.data.message);
        } else {
          console.log(res.data.data.message);
        }
      }, function(res) {
        console.log(res);
      })
    },
    setCookie: function(key, value) {
      var Days = 30;
      var exp = new Date();
      exp.setTime(exp.getTime() + Days*24*60*60*1000);
      document.cookie = key + "="+  escape(value) + ";expires=" + exp.toGMTString();
    }
  }
};
</script>

<style lang="less">
.main-container {
  min-height: inherit;
}
.index-main {
  min-height: 100%;
  margin-bottom: -42px;

  .index-main-body {
    margin: auto;
    padding: 30px 0 102px;
    width: 300px;

    .index-header {
      text-align: center;
    }

    .sign-flow {
      text-align: center;

      .index-tab-navs {
        margin-bottom: 10px;
        font-size: 18px;
        text-align: center;

        .navs-slide {
          position: relative;
          display: inline-block;

          a {
            float: left;
            width: 4em;
            line-height: 35px;
            opacity: 1;
            color: #0f88eb;
            -ms-filter: "alpha(Opacity=70)";
            -webkit-transition: opacity .15s,color .15s;
            transition: opacity .15s,color .15s;
          }
        }
      }

      .view {
        float: none;
        margin: auto;
        width: 300px;
        text-align: left;
        font-size: 14px;

        .button-wrapper {
          margin-top: 18px;

          .z-btn {
            display: block;
            padding: 0;
            width: 100%;
            font-size: 15px;
            text-align: center;
            text-shadow: 0 1px 1px rgba(0,0,0,.2);
            background: #80c3f7;
            background: -webkit-linear-gradient(top,#80c3f7,#6bbaf8);
            background: linear-gradient(to bottom,#80c3f7,#6bbaf8);
            outline: 0;
            cursor: pointer;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
            background: #0f88eb;
            box-shadow: none;
            border: 0;
            border-radius: 3px;
            line-height: 41px;
            color: #fff;
          }
        }

        .group-inputs {
          padding: 1px 0;
          border: 1px solid #d5d5d5;
          border-radius: 3px;

          .input-wraper {
            position: relative;
            margin: 0;
            overflow: hidden;

            input {
              padding: 1em .8em;
              width: 100%;
              display: inline-block;
              box-sizing: border-box;
              border: 0;
              border-radius: 0;
              box-shadow: none;
              background: #fff;
              line-height: 19px;
              color: #555;
              margin: 0;

              &:focus {
                border: 0;
                border-radius: 0;
                box-shadow: none;
                background: #fff;
                outline: 0;
              }
            }
          }

          .input-wraper+.input-wraper {
            border-top: 1px solid #e8e8e8;
          }
        }
      }
    }
  }
}

@media (max-width: 740px) {
  .index-main {
    margin-bottom: -102px;
  }

  .sign-flow {
    .view {
      float: none;
      margin: 0 auto;
      width: 248px;

      .button-wrapper {
        margin-top: 22px;
      }
    }
  }
}
</style>
