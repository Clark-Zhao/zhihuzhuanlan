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

        <!-- <div class="more-funcs">
          <span class="menu-button">
            <i class="icon iconfont icon-unfold"></i>
          </span>
          <menu class="menu navbar-menu">
            <a class="menu-item">关于</a>
          </menu>
        </div> -->
      </div>

      <div class="followers">
        <a>1314 人关注</a>
      </div>
    </div>

    <!-- 文章列表开始 -->
    <div class="items-container">
      <div class="block-title">
        <span>
          <span>最新文章</span>
        </span>
      </div>

      <ul class="items">
        <li class="item" v-for="item in items">
          <article class="hentry">
            <router-link class="entry-link" :to="{ name: 'post', params: { id: item.slug } }">
              <h1 class="entry-title">{{item.title}}</h1>
              <section class="entry-summary">
                <p>
                  {{item.content}}
                  <span class="read-all">查看全文 &gt;</span>
                </p>
              </section>
            </router-link>
            <footer>
              <div class="entry-meta">
                <a>{{item.author}}</a>
                <span class="bull">·</span>
                <time>{{item.publishedTime}}</time>
              </div>
              <div class="entry-func">
                <a>{{item.likesCount}}<span> 赞</span></a>
                <span class="bull">·</span>
                <a>{{item.commentsCount}}<span> 条评论</span></a>
              </div>
            </footer>
          </article>
        </li>
      </ul>

      <div class="posts-end">
        <i class="icon iconfont icon-endstatus"></i>
      </div>
    </div>
    <!-- 文章列表结束 -->

  </div>
</template>

<script>
import { zImageinput } from 'z-vue-components'
import { zButton } from 'z-vue-components'

export default {
  data() {
    return {
      items: []
    };
  },
  components: {
    zImageinput,
    zButton
  },
  mounted() {
    this.getPostList()
  },
  methods: {
    getPostList: function() {
      this.$http.get('static/api/posts.json').then((response) => {
        // success callback
        let data = response.data.data
        for (var i = 0; i < data.posts.length; i++) {
          let item = data.posts[i]

          this.items.push({
            author: item.author,
            publishedTime: item.publishedTime,
            tags: item.tags,
            title: item.title,
            content: item.content,
            likesCount: item.likesCount,
            commentsCount: item.commentsCount,
            slug: item.slug
          })
        }
      }, (response) => {
        // error callback
      });
    }
  }
};
</script>

<style lang="less" scoped>
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

  .more-funcs {
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -16px 0 0 70px;

    &:hover {
      .menu-button {
        transform: rotate(180deg);
      }

      .menu {
        opacity: 1;
      }
    }

    .menu-button {
      display: block;
      width: 32px;
      height: 32px;
      line-height: 32px;
      border-radius: 50%;
      border: 1px solid #b3b3b3;
      background: #fff;
      cursor: pointer;
      -webkit-transition: transform .1s ease-out;
      -moz-transition: transform .1s ease-out;
      -o-transition: transform .1s ease-out;
      transition: transform .1s ease-out;

      i {
        color: #b3b3b3;
        top: 7px;
      }
    }

    .menu {
      opacity: 0;
      width: 128px;
      margin-top: 8px!important;
      right: -20px;
      position: absolute;
      z-index: 30;
      border: 1px solid rgba(0,0,0,.08);
      border-radius: 4px;
      box-shadow: 0 8px 18px rgba(0,0,0,.05);
      background-color: #fff;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      -webkit-transition: opacity .5s ease-out;
      -moz-transition: opacity .5s ease-out;
      -o-transition: opacity .5s ease-out;
      transition: opacity .5s ease-out;

      .menu-item {
        cursor: pointer;
        padding: 0 16px;
        display: block;
        white-space: nowrap;
        line-height: 54px;
        color: #333;
        border: 0;
        background: 0 0;
        text-align: left;
        width: 100%;
        box-sizing: border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 14px;

        &:hover {
          background: #f7f8f9;
        }
      }
    }

    .navbar-menu {
      left: auto!important;
      margin-right: -26px;
    }
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

  .posts-end {
    margin: 80px auto;
    text-align: center;
    position: relative;

    &:before {
      content: '';
      position: absolute;
      top: 16px;
      width: 340px;
      height: 1px;
      left: 50%;
      margin-left: -170px;
      background: rgba(0,0,0,.1);
    }

    .icon-endstatus {
      color: rgba(0,0,0,.1);
      background: #fff;
      padding: 0 12px;
    }
  }

  .item+.item {
    margin-top: 56px;
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
        color: #333;
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

@media screen and (max-width: 660px) {
  .title {
    margin-bottom: 12px;
  }

  .description {
    width: auto;
  }

  .title, .description {
    padding-left: 16px;
    padding-right: 16px;
  }

  .items-container{
    .block-title {
      padding-left: 16px;

      &:after {
        left: 96px;
      }
    }
  }

  .item {
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>
