<template lang="html">
  <div class="entry-comments post-comments comment-box" id="comments">
    <!-- 评论头 -->
    <div class="box-header">
      <div class="">
        <div class="block-title">
          <span>
            <span>{{commentsTotal}} 条评论</span>
          </span>
        </div>
      </div>
    </div>
    <!-- 评论头结束 -->
    <div class="">
      <form class="comment-form comment-box-ft">
        <input type="text" name="name" placeholder="你的名字(必填)" class="editable editable-s" v-model="commentName" />
        <input type="text" name="email" placeholder="你的邮箱(必填,不公开)" class="editable editable-s" v-model="commentEmail"/>
        <input type="text" name="url" placeholder="你的网站(选填,广告链接会被删除哦~)" class="editable editable-s" v-model="commentUrl" />
        <div class="editable" v-if="this.commentToName != ''">
          <z-button
          :text="'回复' + this.commentToName + '：' + this.commentToContent"
          :type="'info'"
          @click.native="cancelReply"
          ></z-button>
        </div>
        <div class="editable" contenteditable="true" id="comment" @blur="showPlaceholder" @focus="hidePlaceholder"></div>
        <z-button
        :text="'提交评论'"
        :type="'primary'"
        @click.native="checkComment"
        ></z-button>
        <z-modal
        :show="isAlertShow"
        :content="alertContent"
        @close-modal="isAlertShow=false"
        ></z-modal>
      </form>
      <div class="comment-list-container ui-pagination">
        <ul class="comment-list">
          <li class="comment-item" v-for="(item, index) in items">
            <div class="comment-item-inner-normal">
              <!-- <a :href="item.url" class="avatar-link" target="_blank" v-if="item.url != ''">
                <z-imageinput
                :height=36
                :width=36
                :src="item.avatar"
                :radius="'50%'"
                ></z-imageinput>
              </a>
              <a class="avatar-link" v-else>
                <z-imageinput
                :height=36
                :width=36
                :src="item.avatar"
                :radius="'50%'"
                ></z-imageinput>
              </a> -->
              <div class="comment-body">
                <div class="comment-hd">
                  <a class="link" :href="item.url" target="_blank" v-if="item.url != 'http://'">{{item.name}}</a>
                  <a class="nolink" v-else>{{item.name}}</a>
                  <span class="in-reply-to" v-if="item.toName != ''">
                    回复 <a class="link" :href="item.toUrl" target="_blank" v-if="item.toUrl != 'http://'">{{item.toName}}</a><a class="nolink" v-else>{{item.toName}}</a>
                  </span>
                </div>
                <div class="comment-content">{{item.content}}</div>
                <div class="comment-ft clearfix">
                  <time class="date hover-title">{{item.createdTime}}</time>
                  <span class="like-num liked" v-if="item.likesCount != 0">
                    <span>{{item.likesCount}}</span>
                    <span>赞</span>
                  </span>
                  <a class="reply op-link" @click="reply(item.name, item.content, item.url)">
                    <i class="icon iconfont icon-reply"></i>
                    回复
                  </a>
                  <a class="like op-link" @click="like(item.comment_id, index)">
                    <i class="icon iconfont icon-appreciate"></i>
                    赞
                  </a>
                  <a class="report op-link" v-if="false">
                    <i class="icon iconfont icon-report"></i>
                    举报
                  </a>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { zImageinput } from 'z-vue-components'
import { zButton } from 'z-vue-components'
import { zModal } from 'z-vue-components'

export default {
  data() {
    return {
      isAlertShow: false,
      alertContent: '',
      commentName: '',
      commentAvatar: '',
      commentToName: '',
      commentToContent: '',
      commentToUrl: '',
      commentEmail: '',
      commentUrl: '',
      commentContent: '',
      items: [],
      holderText: "<span class='holdertext' contenteditable='false' holdertext='1'>写下你的评论(必填)</span>",
      commentsTotal: 0
    };
  },
  mounted() {
    this.getComments()
    this.showPlaceholder()
  },
  methods: {
    getComments() {
      this.items = []
      this.$http.get(this.$store.state.apiBase + 'comments',
        {
          params: {
            'id': this.$route.params.id
          }
        }
      ).then((res) => {
        let info = res.data
        this.commentsTotal = info.length

        for (var i = 0; i < info.length; i++) {
          let item = info[i]

          this.items.push({
            comment_id: item._id,
            name: item.name,
            avatar: item.avatar || 'static/images/avatarholder.jpg',
            createdTime: _utils.getLocalTime(item.createdTime),
            url: item.url,
            content: item.content,
            toName: item.toName,
            toUrl: item.toUrl,
            likesCount: item.likesCount
          })
        }
      })
    },
    checkComment() {
      const regName = /^[\u4E00-\u9FA5A-Za-z0-9]{1,8}$/
      const regEmail = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/
      if (this.commentName.trim() === '') {
        this.alertContent = '请填写名字！'
        this.isAlertShow = true
      } else if (!regName.test(this.commentName.trim())) {
        this.alertContent = '名字格式错误(支持汉字，大小写字母和阿拉伯数字,最长8位)！'
        this.isAlertShow = true
      } else if (this.commentEmail.trim() === '') {
        this.alertContent = '请填写邮箱！'
        this.isAlertShow = true
      } else if (!regEmail.test(this.commentEmail.trim())) {
        this.alertContent = '请填写正确的邮箱！'
        this.isAlertShow = true
      } else if (document.getElementById('comment').getElementsByClassName('holdertext')[0] || document.getElementById('comment').innerHTML.trim() == '') {
        this.alertContent = '请填写评论内容！'
        this.isAlertShow = true
      } else {
        this.commentContent = document.getElementById('comment').innerText
        this.$http.post(this.$store.state.apiBase + 'comments',
          {
            post_id: this.$route.params.id,
            name: this.commentName,
            avatar: this.commentAvatar,
            toName: this.commentToName,
            toContent: this.commentToContent,
            toUrl: this.commentToUrl,
            email: this.commentEmail,
            url: (this.commentUrl.indexOf('http') == -1) ? ('http://' + this.commentUrl) : this.commentUrl,
            content: this.commentContent
          }
        ).then((res) => {
          this.alertContent = '评论成功！'
          this.isAlertShow = true

          let info = res.data

          this.getComments()

          this.commentToName = ''
          document.getElementById('comment').innerHTML = ''
        }, (res) => {
          this.alertContent = '评论失败！请重新提交。'
          this.isAlertShow = true
        })
      }
    },
    showPlaceholder() {
      if (document.getElementById('comment').innerHTML.trim() == '') {
        document.getElementById('comment').innerHTML = this.holderText
      }
    },
    hidePlaceholder() {
      if (document.getElementById('comment').getElementsByClassName('holdertext')[0]) {
        document.getElementById('comment').innerHTML = ''
      }
    },
    reply(name, content, url) {
      document.getElementById('comment').focus()
      this.commentToName = name
      this.commentToContent = content
      this.commentToUrl = url
    },
    cancelReply() {
      this.commentToName = ''
      this.commentToContent = ''
      this.commentToUrl = ''
    },
    like(comment_id, index) {
      this.$http.get(this.$store.state.apiBase + 'comments/like',
        {
          params: {
            'id': comment_id
          }
        }
      ).then((res) => {
          if (res.data.message == 'success') {
            this.items[index].likesCount++
          }
        }
      )
    }
  },
  components: {
    zImageinput,
    zButton,
    zModal
  }
};
</script>

<style lang="less" scoped>
.comment-box {
  .box-header {
    padding: 42px 0 0;
    position: relative;

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
  }

  .comment-box-ft {
    position: relative;
    margin-top: 24px;
  }

  .comment-form {
    &>.editable {
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

      .z-btn {
        position: relative;
        max-width: 100%;
        box-sizing: border-box;
        white-space: pre-wrap;
        text-align: left;

        &:after {
          position: absolute;
          content: 'X';
          width: 16px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          background-color: #ccc;
          font-size: 10px;
          color: #333;
          border-radius: 100%;
          border: 1px solid #333;
          top: -8px;
          right: -8px;
        }
      }
    }

    &>.editable-s {
      width: 50%;
    }
  }

  .comment-list-container.ui-pagination {
    position: relative;
    width: 100%;
    top: 0;
    bottom: 0;
    background: rgba(255,255,255,.7);

    .comment-item {
      position: relative;
      list-style: none;
      outline: 0;
      margin-top: 32px;
      zoom: 1;
      overflow: hidden;

      .avatar-link {
        float: left;
      }

      a.link {
        color: #259;
        text-decoration: underline;
      }

      .nolink:hover {
        text-decoration: none;
      }

      .comment-body {
        margin: 0 0 0 60px; //显示头像用
        margin: 0px;
      }

      .comment-hd, .comment-ft {
        color: gray;
      }

      .comment-hd {
        a {
          color: #333;
          font-weight: 700;
        }
      }

      .comment-content {
        min-height: 22px;
        margin: 8px 0;
        font-size: 15px;
        word-wrap: break-word;
      }

      .comment-ft {
        font-size: 14px;
        position: relative;
      }

      time {
        float: left;
        position: relative;
      }

      .like-num {
        position: absolute;
        right: 0;
      }

      a.op-link {
        color: gray;
        font-size: 14px;
        margin-left: 12px;
        text-decoration: none;
        top: -4px;
        position: relative;
        visibility: hidden;
        cursor: pointer;

        &:hover {
          color: #333;
        }
      }

      &:hover {
        .op-link {
          visibility: visible;
        }
      }
    }
  }
}

@media screen and (max-width: 660px) {
  .comment-box {
    .box-header {
      .block-title {
        padding-left: 16px;

        &:after {
          left: 96px;
        }
      }
    }

    .comment-list-container.ui-pagination {
      .comment-item {
        a.op-link {
          vertical-align: text-top;
          margin-left: 5px;
          line-height: 24px;
          visibility: visible;

          i {
            display: none;
          }
        }
      }
    }

    .comment-form {
      padding-left: 16px;
      padding-right: 16px;

      &>.editable-s {
        width: 100%;
      }
    }

    .comment-item {
      padding-left: 16px;
      padding-right: 16px;
    }
  }
}
</style>
