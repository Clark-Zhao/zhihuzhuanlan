<template lang="html">
  <div class="main receptacle column-followers-main">

    <h2 class="page-title">{{total}} 人关注</h2>

    <div>
      <ul class="column-followers clearfix">
        <li class="ui-user-item" v-for="item in items">
          <a class="user-avatar" :href="item.profileUrl">
            <z-imageinput
            :width=48
            :height=48
            :src="item.avatar"
            :radius="'20px'"></z-imageinput>
          </a>
          <div class="user-intro">
            <a :href="item.profileUrl" target="_blank">
              <strong>{{item.name}}</strong>
            </a>
            <span class="bio">{{item.bio}}</span>
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
      items: [],
      total: 0
    };
  },
  mounted() {
    this.$store.state.title = '关注者'
    this.$http.get(this.$store.state.apiBase +'followers').then((res) => {
      let data = res.data
      this.total = data.length
      for (var i = 0; i < data.length; i++) {
        let item = data[i]

        this.items.push({
          avatar: item.avatar || 'static/images/avatarholder.jpg',
          bio: item.bio,
          description: item.description,
          name: item.name,
          profileUrl: item.profileUrl
        })
      }
    })
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
