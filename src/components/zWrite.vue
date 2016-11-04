<template lang="html">
  <div class="main post-write">
    <section class="receptacle">
      <div class="title-img">
        <div class="upload-controls empty">
          <div class="preview-wrapper fileinput-button">
            <img class="preview" />
            <i class="upload-icon icon-ic_phot_camera_alt"></i>
            <input type="file" accept=".jpeg, .jpg, .png" name="upload_file" id="js-title-img-input" @change="uploadImage">
          </div>
          <div class="img-edit-options">
          </div>
        </div>
      </div>
      <div class="title-input-container">
        <textarea id="js-textarea" ui-textarea-autogrow="" required="" ng-model="draft.title" name="title" class="title" ui-placeholder="请输入标题" ui-tab-trigger="" autofocus="" word-min="2" word-max="50" :placeholder="isShowPlaceHolder ? '请输入标题' : ''" style="height: 46px;" @focus="hidePlaceHolder" @blur="showPlaceHolder"></textarea>
      </div>
    </section>
    <div class="editable-container">
      <div id="js-entry-content" class="entry-content editable editable" name="content" contenteditable="true" holdertext="请输入正文" content-required="" ui-clean-paste="" ui-scraper="" ui-mention="" ui-editor="" editor-toolbar="js-editor-toolbar" word-min="2" g_editable="true" @focus="hideHolderText" @blur="showHolderText" @keyup="markdownIt"></div>
    </div>
    <div class="viewable-container">
      <div class="entry-content editable editable" name="content" v-html="content"></div>
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

export default {
  data() {
    return {
      title: '',
      content: '',
      isShowHolderText: true,
      isShowPlaceHolder: true,
      holderText: "<span class='holdertext' holdertext='1' contenteditable='false'>请输入正文</span>"
    };
  },
  mounted() {
    document.getElementById('js-entry-content').innerHTML = this.holderText
  },
  methods: {
    hidePlaceHolder: function() {
      this.isShowPlaceHolder = false
    },
    showPlaceHolder: function() {
      this.isShowPlaceHolder = true
    },
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
      console.log(md.render(document.getElementById('js-entry-content').innerText))
      this.content = md.render(document.getElementById('js-entry-content').innerText)
    },
    uploadImage: function() {
      console.log("上传图片");
    }
  },
  components: {}
};
</script>

<style lang="less" scoped>
::selection {
    background-color: #dddedf;
}
.post-write {
  min-width: 660px;
  margin-top: 16px;

  .title-input-container {
    margin: 16px 0;
  }

  .editable-container {
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

  .upload-controls.empty {
    height: 192px;
  }

  .preview {
    width: 100%;
    display: block;
    margin: 0 auto;
  }

  .upload-icon {
    font-size: 42px;
    color: rgba(0,0,0,.2);
    top: 12px;
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
  }
}
</style>
