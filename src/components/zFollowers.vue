<template lang="html">
  <div class="main receptacle column-followers-main">

    <h2 class="page-title">1314人关注专栏</h2>

    <div>
      <ul class="column-followers clearfix">
        <li class="ui-user-item" v-for="item in 10">
          <a class="user-avatar" href="http://havee.me/">
            <z-imageinput
            :width=48
            :height=48
            :src="'static/images/avatar.jpg'"
            :radius="'50%'"></z-imageinput>
          </a>
          <div class="user-intro">
            <a href="http://havee.me/" target="_blank">
              <strong>Havee's Space</strong>
            </a>
            <span class="bio">即使你走到再怎样深的低谷，我不会离你而去</span>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import { zImageinput } from 'z-vue-components'

export default {
  data() {
    return {
    };
  },
  components: {
    zImageinput
  }
};
</script>

<style lang="less" scoped>
.page-title {
  font-size: 17px;
  padding-bottom: 16px;
  font-weight: 400;
  margin-bottom: 16px;
}

.column-followers-main {
  .column-followers {
    li {
      width: 270px;
      margin-right: 60px;
      float: left;
    }

    .ui-user-item {
      list-style: none;
      height: 48px;
      margin-bottom: 40px;
      position: relative;

      .user-avatar {
        float: left;
      }

      a {
        color: #333;

        &:hover>strong {
          text-decoration: underline;
        }
      }

      .user-intro {
        margin-left: 64px;
      }

      strong {
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 6px;
        display: inline-block;
        line-height: 22px;
      }

      .bio {
        display: block;
        color: gray;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-right: 10px;
        line-height: 20px;
      }
    }
  }
}

@media screen and (max-width: 660px) {
  .column-followers-main {
    margin-top: 30px;

    .page-title {
      padding-left: 16px;
      padding-right: 16px;
    }

    .column-followers {
      padding-left: 16px;
      padding-right: 16px;

      li {
        width: 100%;
      }
    }
  }
}
</style>
