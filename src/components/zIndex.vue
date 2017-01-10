<template lang="html">
  <div class="main receptacle">
    <div>
      <div class="avatar-link">
        <z-imageinput
        :src="$store.state.authorAvatar"
        :width=100
        :height=100
        :alt="'作者头像'"
        ></z-imageinput>
      </div>

      <div class="title">天道寺</div>

      <div class="functions">
        <a href="http://weibo.com/zhaoyuxiang" target="_blank">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-social-weibo"></use>
          </svg>
        </a>
        <a href="https://github.com/Clark-Zhao" target="_blank">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-social-github"></use>
          </svg>
        </a>
        <a href="static/images/weixin.jpg" target="_blank">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-social-wechat"></use>
          </svg>
        </a>
        <!-- <z-button
        :text="'成为友人'">
        </z-button> -->

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
        <router-link to="/followers">{{followers}} 人关注</router-link>
        <!-- <br />
        <span class="visitor-numbers">独立访客数: {{$store.state.visitorNumbers}}</span> -->
      </div>

      <div class="tags">
        <span class="tag" :class="{'current': !$route.query.tag}" @click="$router.push({ query: {}})"><b>全部</b>{{total}}</span>
        <span class="tag" v-for="(tag, index) in tags" v-if="index < 3 || isShowAllTags === true" @click="$router.push({ query: { tag: tag.name }})" :class="{'current': $route.query.tag === tag.name}"><b>{{tag.name | capitalize}}</b>{{tag.postsCount}}</span>
        <span class="more" @click="isShowAllTags = true" v-if="!isShowAllTags">更多</span>
      </div>
    </div>

    <!-- 文章列表开始 -->
    <div class="items-container">
      <div class="block-title">
        <span>
          <span>{{ $route.query.tag ? $route.query.tag : '最新文章' | capitalize}}</span>
        </span>
      </div>

      <ul class="items">
        <li class="item" v-for="item in items" :class="{'item-with-title-img': item.titleImg != ''}">
          <article class="hentry">
            <router-link class="entry-link" :to="{ name: 'post', params: { id: item.id } }">
              <h1 class="entry-title">{{item.title}}</h1>
              <div class="title-img-container" v-if="item.titleImg != ''">
                <div class="title-img-preview" :style="{'background-image': 'url(' + item.titleImg + ')'}"></div>
              </div>
              <section class="entry-summary">
                <p>
                  {{item.content}}...
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
                <router-link :to="{ name: 'post', params: { id: item.id } }">{{item.likesCount}}<span> 赞</span></router-link>
                <span class="bull">·</span>
                <router-link :to="{ name: 'post', params: { id: item.id } }">{{item.commentsCount}}<span> 条评论</span></router-link>
              </div>
            </footer>
          </article>
        </li>
      </ul>

      <div class="posts-end" v-show="(page === last_page) && !isShowLoading">
        <i class="icon iconfont icon-endstatus"></i>
      </div>

      <z-loading v-show="isShowLoading"></z-loading>

    </div>
    <!-- 文章列表结束 -->

  </div>
</template>

<script>
import zLoading from './_zLoading.vue'

export default {
  data() {
    return {
      items: [],
      tags: [],
      followers: 0,
      page: 1,
      last_page: 0,
      total: 0,
      isShowLoading: false,
      isShowAllTags: false
    };
  },
  components: {
    zLoading
  },
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  mounted() {
    this.getPostList()
    this.$store.commit('changeTitle', '博客 - 天道寺')

    this.$http.get(__apiBase +'followers').then((res) => {
      this.followers = res.data.length
    })

    this.$http.get(__apiBase +'get_post_tags').then((res) => {
      this.tags = res.data
    })

    let self = this
    addEventListener('scroll', function() {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      var offsetHeight = document.body.offsetHeight
      var windowHeight = window.innerHeight;

      if (((offsetHeight - windowHeight) - scrollTop <= 180) && (self.page < self.last_page) && (self.isShowLoading === false) && (self.$route.path == '/')) {
        self.getPostList(++self.page)
      }
    })
  },
  watch: {
    '$route.query': function() {
      this.items = []
      this.getPostList()
    }
  },
  methods: {
    getPostList: function() {
      this.isShowLoading = true

      this.$http.get(__apiBase +'posts',
      {
        params: {
          'page': this.page,
          'tag': this.$route.query.tag
        }
      }
    ).then((response) => {
      // this.$http.get('static/api/posts.json').then((response) => {
        // success callback
        let data = response.data

        this.last_page = data.last_page
        this.total = data.total

        for (var i = 0; i < data.list.length; i++) {
          let item = data.list[i]

          item.content = item.content.replace(/```js+/g, '').replace(/```css+/g, '').replace(/```scss+/g, '').replace(/```html+/g, '').replace(/```bash+/g, '').replace(/```+/g, '').replace(/\#+/g, '').replace(/\*+/g, '').replace(/(\!\[\]\().*?(\))/g,' ').replace(/\s+/g,' ')

          this.items.push({
            author: item.author,
            publishedTime: _utils.getLocalTime(item.publishedTime),
            tags: item.tags,
            title: item.title,
            titleImg: item.titleImg,
            content: _utils.getRealStr(item.content, 176),
            likesCount: item.likesCount,
            commentsCount: item.commentsCount,
            id: item._id
          })

          this.isShowLoading = false
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

  .z-image-wraper {
    border-radius: 50%;
  }
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

  a {
    display: inline-block;

    .icon {
      font-size: 36px;
      margin: 0 10px;
      cursor: pointer;
    }
  }

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

    &:hover {
      color: #333;
    }
  }

  .visitor-numbers {
    color: gray;
    display: inline-block;
    margin-top: 10px;
  }
}

.tags {
  margin-bottom: 48px;
  line-height: 30px;
  font-size: 14px;
  text-align: center;

  .tag {
    height: 30px;
    padding: 0 15px;
    color: #b3b3b3;
    border-radius: 15px;
    border: 1px solid rgba(0,0,0,.1);
    display: inline-block;
    margin: 8px;
    cursor: pointer;

    b {
      margin-right: 3px;
      font-weight: 400;
      color: gray;
    }
  }

  .tag.current {
    background: rgba(0,0,0,.06);
    border-color: transparent;
  }

  .more {
    padding: 0 10px;
    color: gray;
    display: inline-block;
    margin: 8px;
    cursor: pointer;
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

      .title-img-container {
        position: absolute;
      }

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

        a {
          text-decoration: none;
          color: gray;

          &:hover {
            color: #333;
          }
        }
      }
    }
  }

  .item.item-with-title-img {
    min-height: 180px;
    padding-bottom: 0;

    .entry-title, .entry-summary, .entry-meta {
      margin-left: 260px;
    }

    .title-img-container {
      top: 0;
      left: 0;
      width: 240px;
      height: 180px;

      .title-img-preview {
        height: 100%;
        background-color: #f7f8f9;
        background-size: cover;
        background-position: center;
        border-radius: 4px;
        overflow: hidden;
        position: relative;
        z-index: 1;
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

    .item.item-with-title-img {
      article {
        padding-top: 230px;
      }

      .entry-title, .entry-summary, .entry-meta {
        margin-left: 0;
      }

      .title-img-container {
        width: 100%;
        height: 220px;
      }
    }
  }

  .item {
    padding-left: 16px;
    padding-right: 16px;
  }
}
</style>
