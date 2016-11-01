<template lang="html">
  <div class="main receptacle">
    <div>
      <div class="avatar-link">
        <z-imageinput
        :src="'static/images/avatar.jpg'"
        :width=100
        :height=100
        :alt="'作者头像'"
        :radius="'50%'"
        ></z-imageinput>
      </div>

      <div class="title">天道寺</div>

      <div class="functions">
        <z-button
        :text="'关注专栏'"
        ></z-button>

        <div class="more-funcs">
          <span class="menu-button"></span>
          <menu class="menu">

          </menu>
        </div>
      </div>

      <div class="followers">
        <a>1314 人关注</a>
      </div>
    </div>

    <div class="items-container">
      <div class="block-title">
        <span>
          <span>最新文章</span>
        </span>
      </div>

      <ul class="items">
        <li class="item">
          <article class="hentry">
            <a class="entry-link">
              <h1 class="entry-title">信140318</h1>
              <section class="entry-summary">
                <p>
                  一下子你就长蛮大了，长蛮大了以后我和你当面交流的机会就越来越多。虽然我认为你对我的态度……似乎还是有点问题的。比如说，你怎么可以说，我会游泳，爸爸会游泳，妈妈不会游泳，人不会游…
                  <span class="read-all">查看全文 &gt;</span>
                </p>
              </section>
            </a>
            <footer>
              <div class="entry-meta">
                <a>天道</a>
                <span class="bull">·</span>
                <time>3年前</time>
              </div>
              <div class="entry-func">
                <a>543<span> 赞</span></a>
                <span class="bull">·</span>
                <a>51<span> 条评论</span></a>
              </div>
            </footer>
          </article>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { zImageinput } from 'z-vue-components'
import { zButton } from 'z-vue-components'

export default {
  data() {
    return {
    };
  },
  components: {
    zImageinput,
    zButton
  }
};
</script>

<style lang="less">
.main {
  margin: 47px 0 0;
  padding: 0 0 55px;

  .avatar-link {
    width: 100px;
    height: 100px;
    margin: 0 auto 22px;
  }

  .title {
    font-size: 20px;
    line-height: 28px;
    margin-bottom: 12px;
    display: block;
    text-align: center;
  }

  .functions {
    text-align: center;
    position: relative;
    margin-bottom: 18px;

    .z-btn {
      border-color: #50C87E;
      color: #50C87E;
      width: 90px;
      height: 36px;
      line-height: 34px;
      box-sizing: border-box;
      padding: 0;
    }
  }

  .followers {
    font-size: 14px;
    text-align: center;
    margin-bottom: 20px;

    a {
      color: gray;
      text-decoration: none;
    }
  }

  .items-container {
    min-height: 400px;

    .block-title {
      line-height: 22px;
      font-weight: 700;
      position: relative;
      margin: 0 0 32px;
      font-size: 16px;

      &>span {
        background: #fff;
        position: relative;
        z-index: 1;
        padding-right: 16px;
      }

      &:after {
        content: '';
        position: absolute;
        height: 1px;
        left: 0;
        right: 0;
        top: 11px;
        background: #f0f0f0;
      }
    }

    .item {
      list-style: none;

      article {
        position: relative;
        padding-bottom: 14px;
      }

      .entry-link {
        text-decoration: none;

        .entry-title {
          font-size: 20px;
          line-height: 1.5;
          font-weight: 700;
          margin: 0;
          overflow: hidden;
          max-height: 60px;
        }

        .entry-summary {
          margin: 10px 0;
          line-height: 1.7;
          max-height: 84px;
          overflow: hidden;
          color: #666;

          p {
            margin: 0;
            word-break: break-all;

            .read-all {
              color: #b3b3b3;
            }
          }
        }
      }

      footer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;

        .entry-meta {
          color: gray;
          font-size: 14px;

          .bull {
            margin: 0 3px;
          }
        }

        .entry-func {
          position: absolute;
          top: 0;
          right: 0;
          color: gray;
          font-size: 14px;
        }
      }
    }
  }
}

.receptacle {
  width: 660px;
  margin-left: auto;
  margin-right: auto;
  position: relative;
}
</style>
