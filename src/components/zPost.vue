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
            :src="'static/images/avatar.jpg'"
            :alt="'作者头像'"
            :radius="'50%'"></z-imageinput>{{author}}
          </a>
          <span class="bull">·</span>
          <time>{{publishedTime}}</time>
        </div>
      </header>

      <section class="entry-content" v-html='content'>
        <!-- <p>一下子你就长蛮大了，长蛮大了以后我和你当面交流的机会就越来越多。虽然我认为你对我的态度……似乎还是有点问题的。</p>
        <p>比如说，你怎么可以说，我会游泳，爸爸会游泳，妈妈不会游泳，人不会游泳，不是笨蛋嘛？</p>
        <p>你这种说法让我很纠结，我一方面觉得呀你还会反问了，一方面会想臭丫头，你套个救生圈还求我拉你在池子里转来转去这么快就忘恩负义了！</p>
        <p>凭良心说，你和我想象中的女儿，还是有差距的。比如我们楼下有个小妹妹，她爷爷长的很帅啊爸爸会不会更帅啊？哦，不对，这不是重点……重点是我们楼下有个小妹妹，见到我就会喊，阿姨你好，阿姨再见。天使一样，还想和你手拉手。而你呢，见到别人就说，我没电了。然后头一低不吭声。小妹妹失去了和你手拉手的机会，我失去了和人家帅爷爷搭讪的机会……我们都有点失望。</p>
        <p>不过这也不怪你，我小时候也不是人见人爱花见花开的主，我现在也不是这种人。我的成长过程中一直伴随着不爱说话，不给人面子这种评语，我也还活着，这又不是大问题。</p>
        <p>我从来不觉得人有必要讨整个世界的喜欢，如果一直想着要人见人爱，那早晚要抑郁。酷一点也没问题，只要你乐意。</p>
        <p>但是有一个事实也得告诉你，乐意这个事情，也不是那么简单。许多人，打着我乐意的旗号，其实是害怕这个世界，逃避这个世界——世界这玩意是逃避不了的，你越害怕，你越想逃，你就会接着更害怕，更想逃。你身处食物链的顶端，一直在逃未免会可惜，所以如果要过自己乐意的生活，也得更有担当才行。</p>
        <p>有一句话是说，人要会舍弃，人也要勤奋，舍弃是为了让自己的勤奋不浪费，勤奋是为了让自己可以不用舍弃更多——快乐和担当也是这样，快乐的生活会让你愿意担当，而敢于担当会让你更快乐。</p>
        <p>所以说，有许多时候，我并不希望你止步于只要高兴有人疼就好。在我看来，许多高兴并不是真正的高兴，许多疼爱是为了要你原地踏步，这种小玩意类似于糖水，不解渴，还会让你发胖——比如若干年后，若有一个男人大把大把的给你钱花，夸你好看，说你的一辈子他包了圆，你最好现在什么都不要干，你听着也许会高兴，但如果容我说一句，我觉得你可以告诉他，我们在一起高兴我们就一起玩，我们互相顺眼我们就一起睡，但你的钱你拿回去，这种每天都在印，毫不稀奇的玩意，买不下我的时间。我的时间独一无二，我的时间没有人能包了圆。</p>
        <p>这就是担当，你选择你自己的生活，你不幻想你的时间被任何人包圆，你干你想干的事情，你干你想干的人，干好，干砸，你敢认，你乐意认，然后你拍拍尘土再来，你一次比一次干的好，你看见每天的自己都有不一样，你不会在原地转圈。</p>
        <p>这就是快乐，这也是担当。</p>
        <p>祝你变成这样的人，祝你找到这样的同伴。</p> -->
      </section>

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
      commentsCount: 0
    };
  },
  mounted() {
    this.getPost()
  },
  methods: {
    getPost: function() {
      this.$http.get(this.$store.state.apiBase + 'post',
        {
          params: {
            'id': this.$route.params.id
          }
        }
      ).then((response) => {
        let data = response.data

        this.title = data.title
        this.$store.state.title = this.title
        this.titleImg = data.titleImg
        this.author = data.author
        this.publishedTime = data.publishedTime.replace('T', ' ').replace(/.[\d]{3}Z/,'')
        this.content = md.render(data.content)
        this.likesCount = data.likesCount
        this.commentsCount = data.commentsCount
      }, (response) => {
        // error callback
      });
    },
    like: function() {
      this.$http.get('http://192.168.10.50:3000/api/likes',
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
    zComments
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
