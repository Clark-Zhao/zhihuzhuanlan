<template lang="html">
  <div class="main receptacle post-view">
    <article class="entry">
      <header>
        <div class="entry-title-image" v-if="titleImg != ''">
          <img :src="titleImg" alt="题图" />
        </div>
        <h1 class="multiline1 entry-title">{{title}}</h1>
        <div class="entry-meta">
          <a>
            <z-imageinput
            :width=36
            :height=36
            :src="$store.state.authorAvatar"
            :alt="'作者头像'"
            :radius="'50%'"></z-imageinput>{{author}}
          </a>
          <span class="bull">·</span>
          <time>{{publishedTime}}</time>
        </div>
      </header>

      <z-loading v-if="isShowLoading"></z-loading>

      <section class="entry-content" v-html='content'></section>

      <footer>
        <div class="entry-exinfo clearfix"></div>
        <div class="entry-controls clearfix">
          <!-- <div class="right-section">
            <div class="post-share-button post-menu-button menu-button-no-arrow ui-menu-button close">
              <a href="javascript:;" class="menu-button control-item share"><i class="icon iconfont icon-share"></i>分享</a>
              <menu class="menu">

              </menu>
            </div>
            <a href="javascript:;" class="control-item report"><i class="icon iconfont icon-report"></i>举报</a>
          </div> -->
          <div class="left-section">
            <div class="votes">
              <a href="javascript:;" class="control-item" :class="{'active': isZan}" @click="like"><i class="icon iconfont icon-appreciatefill"></i>{{likesCount}}</a>
            </div>
          </div>
        </div>
        <z-comments></z-comments>
      </footer>
    </article>
  </div>
</template>

<script>
import 'highlight.js/styles/github.css'
var hljs = require('highlight.js'); // https://highlightjs.org/
// Actual default values
var md = require('markdown-it')({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>';
      } catch (__) {}
    }
    return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
  }
});

import { zImageinput } from 'z-vue-components'
import zLoading from './_zLoading.vue'
import zComments from './_zComments.vue'

export default {
  data() {
    return {
      title: '',
      titleImg: '',
      author: '',
      publishedTime: '',
      content: '',
      likesCount: 0,
      isZan: false,
      commentsCount: 0,
      isShowLoading: false
    };
  },
  mounted() {
    this.getPost()
  },
  methods: {
    getPost: function() {
      this.isShowLoading = true;

      this.$http.get(__apiBase + 'post',
        {
          params: {
            'id': this.$route.params.id
          }
        }
      ).then((response) => {
        let data = response.data

        this.title = data.title
        this.$store.commit('changeTitle', this.title)
        this.titleImg = data.titleImg
        this.author = data.author
        this.publishedTime = _utils.getLocalTime(data.publishedTime)
        this.content = md.render(data.content)
        this.likesCount = data.likesCount
        this.commentsCount = data.commentsCount

        this.isShowLoading = false;
      }, (response) => {
        // error callback
      });
    },
    like: function() {
      this.$http.get(__apiBase + 'likes',
        {
          params: {
            'id': this.$route.params.id
          }
        }
      ).then((res) => {
        if (res.data.message == 'success') {
          this.likesCount++
        }
      }, (res) => {
        // error callback
      });
    }
  },
  components: {
    zImageinput,
    zComments,
    zLoading
  }
};
</script>

<style lang="less" scoped>
.post-view {
  margin-top: 0;
  padding-top: 22px;
  padding-bottom: 0;

  .entry-title-image {
    margin-bottom: 22px;
    position: relative;

    img {
      width: 100%;
    }
  }

  .entry-title {
    font-size: 32px;
    line-height: 45px;
    font-weight: 700;
  }

  .entry-meta {
    margin: 22px 0 0;
    height: 36px;
    line-height: 36px;
    color: gray;
    font-size: 14px;

    .z-image-wraper {
      margin-right: 12px;
      margin-top: -4px;
      vertical-align: middle;
    }

    .bull {
      margin: 0 3px;
    }
  }

  .entry-content {
    margin: 30px 0;
    line-height: 1.7;
    font-weight: 400;

    p+p {
      margin: 20px 0;
    }
  }

  footer {
    line-height: 24px;
    margin-bottom: 48px;

    .entry-controls {
      margin: 40px 0;
      text-align: right;
      line-height: 36px;

      .right-section {
        float: right;

        .post-menu-button {
          padding-bottom: 10px;
        }

        .ui-menu-button, .ui-pop-button {
          position: relative;
          display: inline-block;
        }
      }

      .control-item {
        margin-left: 15px;
        color: gray;
        font-size: 15px;
        opacity: 1;
        -webkit-transition: all .05s ease-in-out;
        -moz-transition: all .05s ease-in-out;
        -o-transition: all .05s ease-in-out;
        transition: all .05s ease-in-out;
      }

      .votes {
        text-align: left;

        a {
          margin-left: 0;
          display: inline-block;
          color: #50C87E;
          border: 1px solid #50C87E;
          height: 34px;
          line-height: 34px;
          padding: 0 20px;
          text-align: center;
          border-radius: 4px;
          font-size: 14px;

          &:hover {
            background: rgba(77,190,46,.06);
            color: #50C87E;
          }

          i {
            position: relative;
            top: 5px;
            left: -2px;
            margin-right: 6px;
          }
        }

        a.active {
          background: #50C87E;
          color: #fff;

          &:hover {
            background: rgba(77,190,46,.06);
            color: #50C87E;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 660px) {
  .post-view {
    .entry {
      margin-top: -18px;
    }

    header, .entry-content {
      padding-left: 16px;
      padding-right: 16px;
    }

    .entry-controls {
      padding-left: 16px;
      padding-right: 16px;
    }
  }
}
</style>
