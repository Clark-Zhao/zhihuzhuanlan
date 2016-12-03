<template lang="html">
  <div class="main post-write">
    <z-modal
    :show="isImgUploadFail"
    :content="'图片上传失败！请重新选择图片上传。'"
    @close-modal="isImgUploadFail = false"
     ></z-modal>
    <section class="receptacle">
      <div class="title-img">
        <div class="upload-controls" :class="{'empty': titleImg ==''}">
          <div class="preview-wrapper fileinput-button">
            <img v-show="titleImg != ''" class="preview" :src="titleImg"/>
            <i v-show="isShowLoading == false && titleImg == ''" class="icon iconfont icon-camera"></i>
            <input v-show="titleImg == ''" type="file" accept=".jpeg, .jpg, .png" name="upload_file" id="js-title-img-input" @change="uploadImage">
            <span class="icon-loading-wraper"><i class="icon iconfont icon-loading" v-show="isShowLoading"></i></span>
          </div>
          <!-- 题图编辑工具栏开始 -->
          <div class="img-edit-options" v-show="titleImg != ''">
            <button class="action-button change fileinput-button" @click="changeTitleImg">
              <i class="icon iconfont icon-camera"></i>
            </button>
            <button class="action-button delete" @click="deleteTitleImg">
              <i class="icon iconfont icon-delete"></i>
            </button>
          </div>
          <!-- 题图编辑工具栏结束 -->
        </div>
      </div>
      <div class="title-input-container">
        <textarea id="js-textarea" ui-textarea-autogrow="" required="" ng-model="draft.title" name="title" class="title" ui-placeholder="请输入标题" ui-tab-trigger="" autofocus="" word-min="2" word-max="50" placeholder="请输入标题" style="height: 46px;" v-model="title"></textarea>
      </div>

      <z-button
      :text="previewBtnText"
      @click.native="toggleViewableContainer"
      ></z-button>

      <z-button
      :text="'发布'"
      @click.native="publish"
      ></z-button>

    </section>
    <div class="editable-container" v-show="isShowEditableContainer">
      <div id="js-entry-content" class="entry-content editable editable" name="content" contenteditable="true" holdertext="请输入正文" content-required="" ui-clean-paste="" ui-scraper="" ui-mention="" ui-editor="" editor-toolbar="js-editor-toolbar" word-min="2" g_editable="true" @focus="hideHolderText" @blur="showHolderText" @keyup="markdownIt"></div>
    </div>
    <div class="viewable-container" v-show="isShowViewableContainer">
      <div class="entry-content editable" name="content" v-html="content"></div>
    </div>
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

import { zButton } from 'z-vue-components'
import { zModal } from 'z-vue-components'

export default {
  data() {
    return {
      title: '',
      titleImg: '',
      content: '',
      previewBtnText: '点击预览',
      isImgUploadFail: false,
      isShowLoading: false,
      isShowHolderText: true,
      isShowEditableContainer: true,
      isShowViewableContainer: false,
      holderText: "<span class='holdertext' holdertext='1' contenteditable='false'>请输入正文</span>"
    };
  },
  mounted() {
    document.getElementById('js-entry-content').innerHTML = this.holderText
  },
  methods: {
    hideHolderText: function() {
      if (document.getElementById('js-entry-content').getElementsByClassName('holdertext')[0]) {
        document.getElementById('js-entry-content').innerHTML = ''
      }
    },
    showHolderText: function() {
      if (document.getElementById('js-entry-content').innerHTML == '') {
        document.getElementById('js-entry-content').innerHTML = this.holderText
      }
    },
    markdownIt: function() {
      this.content = md.render(document.getElementById('js-entry-content').innerText)
    },
    uploadImage: function() {
      this.isShowLoading = true
      let imgData = new FormData()
      let imgFile = document.getElementById('js-title-img-input').files[0]
      imgData.append('smfile', imgFile)

      this.$http.post(
        'https://sm.ms/api/upload',
        imgData
      ).then(function(res) {
        this.isShowLoading = false
        if (res.data.code == 'success') {
          this.titleImg = res.data.data.url
        } else {
          this.isImgUploadFail = true
          document.getElementById('js-title-img-input').value = ''
        }
        }, function(res) {

        })
    },
    toggleViewableContainer: function() {
      this.isShowEditableContainer = !this.isShowEditableContainer
      this.isShowViewableContainer = !this.isShowViewableContainer
      this.isShowViewableContainer ? (this.previewBtnText = "关闭预览") : (this.previewBtnText = "点击预览")
    },
    changeTitleImg: function(){
      document.getElementById('js-title-img-input').click()
    },
    deleteTitleImg: function() {
      this.titleImg = ''
      document.getElementById('js-title-img-input').value = ''
    },
    publish: function() {
      if (document.getElementById('js-entry-content').innerText == '请输入正文') {
        document.getElementById('js-entry-content').innerText = ''
      }
      this.$http.post(
        'http://localhost:3000/api/drafts/publish',
        {
          'title': this.title,
          'titleImg': this.titleImg,
          'author': '天道',
          'content': document.getElementById('js-entry-content').innerText
        }
      ).then(function(res) {
        console.log("发布成功");
        }, function(res) {

        })
    }
  },
  components: {
    zButton,
    zModal
  }
};
</script>

<style lang="less" scoped>
.post-write {
  min-width: 660px;
  margin-top: 16px;

  .title-input-container {
    margin: 16px 0;
  }

  .editable-container, .viewable-container {
    position: relative;
    overflow: hidden;
  }

  .editable {
    min-height: 88px;
    background: #fff;
    cursor: text;
  }

  .entry-content {
    margin: 30px 0;
    line-height: 1.7;
    font-weight: 400;
    padding: 0 50% 200px;
    min-width: 660px;
    margin-left: -330px;
    min-height: 300px;
    outline: 0;
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

  .title {
    height: 44px;
    min-height: 44px;
    display: block;
    width: 100%;
    border: 0;
    font-size: 32px;
    line-height: 1.4;
    font-weight: 400;
    resize: none;
    overflow: hidden;
    outline: 0;
    box-shadow: none;
    font-weight: 700;
  }
}
.title-img {
  position: relative;
  display: block;
  background-color: #f7f8f9;
  line-height: 192px;
  color: gray;
  text-align: center;
  border: 0;
  font-size: 1em;
  min-height: 192px;
  -webkit-transition: all .05s ease-in-out;
  -moz-transition: all .05s ease-in-out;
  -o-transition: all .05s ease-in-out;
  transition: all .05s ease-in-out;

  .upload-controls {
    .img-edit-options {
      position: absolute;
      height: 42px;
      right: 0;
      bottom: 0;
      z-index: 1;
      -webkit-transition: all .05s ease-in-out;
      -moz-transition: all .05s ease-in-out;
      -o-transition: all .05s ease-in-out;
      transition: all .05s ease-in-out;
      background-color: #000;
      background-color: rgba(0,0,0,.75);
      border-radius: 4px 0 0;
      pointer-events: auto;

      &>button {
        float: left;
        line-height: 42px;
        height: 42px;
        width: 48px;
        opacity: .9;
        border: 0;
        background: 0 0;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -o-user-select: none;
        user-select: none;
        outline: 0;
        cursor: pointer;
      }

      &>button:first-child {
        border-radius: 4px 0 0;
      }

      &>button+button {
        border-left: 1px solid #323334;
        border-left: 1px solid rgba(255,255,255,.12);
      }

      i {
        font-size: 18px;
        color: #fff;
        -webkit-text-stroke-width: 0px;
        text-stroke-width: 0px;
      }

      i.icon-camera {
        font-size: 16px;
        top: 3px;
      }
    }
  }

  .upload-controls.empty {
    height: 192px;
  }

  .preview {
    width: 100%;
    display: block;
    margin: 0 auto;
  }

  input {
    width: 100%;
    height: 100%;
    z-index: 1;
  }

  .fileinput-button {
    display: inline-block;
    position: relative;
    overflow: hidden;
    input {
      position: absolute;
      top: 0;
      right: 0;
      margin: 0;
      opacity: 0;
      filter: alpha(opacity=0);
      transform: translate(-300px,0) scale(4);
      font-size: 23px;
      direction: ltr;
      cursor: pointer;
    }
  }

  .preview-wrapper {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;

    &>.icon-camera {
      font-size: 42px;
      color: rgba(0,0,0,.2);
      top: 12px;
    }

    .icon-loading-wraper {
      position: absolute;
      z-index: 9999;
      transform: translate(-12px, -12px);
      top: 50%;
      left: 50%;

      &>.icon-loading {
        color: #50C87E;
        font-size: 24px;
        display: inline-block;
        -webkit-animation: spriteSpin .8s steps(12) infinite;
        animation: spriteSpin .8s steps(12) infinite;
      }
    }
  }
}
@keyframes spriteSpin
{
0%   {transform:rotate(0deg);}
25%  {transform:rotate(90deg);}
50%  {transform:rotate(180deg);}
75%  {transform:rotate(270deg);}
100% {transform:rotate(360deg);}
}

@-moz-keyframes spriteSpin /* Firefox */
{
  0%   {transform:rotate(0deg);}
  25%  {transform:rotate(90deg);}
  50%  {transform:rotate(180deg);}
  75%  {transform:rotate(270deg);}
  100% {transform:rotate(360deg);}
}

@-webkit-keyframes spriteSpin /* Safari 和 Chrome */
{
  0%   {transform:rotate(0deg);}
  25%  {transform:rotate(90deg);}
  50%  {transform:rotate(180deg);}
  75%  {transform:rotate(270deg);}
  100% {transform:rotate(360deg);}
}

@-o-keyframes spriteSpin /* Opera */
{
  0%   {transform:rotate(0deg);}
  25%  {transform:rotate(90deg);}
  50%  {transform:rotate(180deg);}
  75%  {transform:rotate(270deg);}
  100% {transform:rotate(360deg);}
}

@media screen and (max-width: 660px) {
  .main.post-write {
    padding-left: 16px;
    padding-right: 16px;
  }

  .post-write {
    min-width: initial;

    .entry-content {
      min-width: initial;
      padding-left: initial;
      padding-right: initial;
      margin-left: initial;
    }
  }
}
</style>
