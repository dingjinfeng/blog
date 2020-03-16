<template>
  <div :class="{essayList:!0, isWidthShow: !isWidth}">
    <div :class="{ essayListWrapper: !0, scrollFinish: isFinish, noAvatar: essayListFrom }">
      <Scroll ref="scroll" :on-reach-bottom="!isFinish ? handleAddEssay : stopAddEssay" height="700">
        <div :class="{item: !0, isPaddingShow: !isWidth}" v-for="(item, index) in essayList" :key="index">
          <div
            class="left"
            @click="goOtherUser(item.user.id)"
            v-if="!essayListFrom"
          >
            <div>
              <avatar :imgId="item.user.imgid"/>
            </div>
            <div>{{ item.user.username }}{{ index }}</div>
          </div>
          <div class="right">
            <essayBriefInfo :essay="item.essay" :userId="item.user.id" :essayListFrom="essayListFrom"></essayBriefInfo>
          </div>
        </div>
        <Divider v-if="isFinish" :dashed="true">已经到底了</Divider>
      </Scroll>
    </div>
  </div>
</template>
<script>
import essayBriefInfo from "@/components/essay/EssayBriefInfo"
import avatar from "@/components/utils/Avatar"
export default {
  data () {
    return {
      isFinish: !1,
      isWidth: 1,
      page: 0,
      flag: [1],
      userId: 0,
      essayListAction: "essay/getEssayList",
      essayList: [],
      // 0表示不在博文管理中获取文章列表,1表示在博文管理中获取列表
      essayListFrom: 0,
      // cate为0表示查询所有分类的文章
      cateId: 0
    }
  },
  created () {
    this.getEssayListFrom()
    this.getEssayByPage()
    this.$store.commit("switchLoading", !1)
  },
  components: {
    essayBriefInfo,
    avatar
  },
  beforeRouteUpdate (to, from, next) {
    this.getEssayListFrom()
    this.getEssayByPage()
    this.$store.commit("switchLoading", !1)
    next()
  },
  methods: {
    getEssayListFrom () {
      var path = this.$route.path
      this.isFinish = !1
      this.isWidth = 1
      this.page = 0
      this.userId = 0
      this.essayListAction = "essay/getEssayList"
      this.essayList = []
      // cate为0表示查询所有分类的文章
      this.cateId = 0
      switch (path) {
        case "/":
          this.essayListFrom = 0
          this.isWidth = 0
          this.flag = [1]
          break
        case "/user/blogmanagement":
          this.essayListFrom = 1
          this.flag = [-1, 0, 1]
          this.isWidth = 1
          this.userId = this.$store.state.user.userInfo.id
          this.$store.commit("user/setLeftCurrent", 2)
          break
        case "/otheruser/essayList":
          this.essayListFrom = 1
          this.flag = [1]
          this.userId = parseInt(this.$route.query.userId)
          var cateId = this.$route.query.cateId
          if (cateId) {
            this.cateId = parseInt(cateId)
          }
          break
        default:
          this.essayListFrom = 0
          this.flag = [1]
          this.isWidth = 0
      }
    },
    // isMore 是否上拉加载更多
    // getEssayByPage (isMore, done) {
    getEssayByPage () {
      var param = {
        page: ++this.page,
        flag: this.flag,
        userId: this.userId,
        cateId: this.cateId,
        // isMore,
        success: (list) => {
          this.essayList = this.essayList.concat(list)
          this.isFinish = list.length < 10
        }
      }
      this.$store.dispatch(this.essayListAction, param)
    },
    handleAddEssay () {
      return new Promise(resolve => {
        this.getEssayByPage()
        resolve()
      })
    },
    stopAddEssay () {},
    goOtherUser (userId) {
      this.$store.dispatch("user/getOtherUser", {
        userId,
        success: res => {
          this.$router.push({
            path: "/otheruser/essayList",
            query: { userId: res.id }
          })
        }
      })
    }
  }
}
</script>
<style scoped>
.essayList {
  margin: 0 auto;
}
.isWidthShow {
  width: 960px;
}
.essayList .essayListWrapper{
  height: 700px;
}
.essayListWrapper .item {
  display: flex;
  align-items: left;
  border-bottom: 1px solid #2d8cf0;
  margin-top: 20px;
}
.essayListWrapper .item:last-child {
  border: none;
}
.essayListWrapper .isPaddingShow {
  padding: 0 50px;
}
.essayListWrapper .item .left {
  margin-right: 50px;
  flex-shrink: 0;
  flex-grow: 0;
  width: 50px;
}
.essayListWrapper .item .right {
  max-width: 92%;
  flex-shrink: 1;
  flex-grow: 1;
}
.essayListWrapper .noAvatar {
  width: 700px;
}
.essayListWrapper .noAvatar .item {
  padding: 0;
}
</style>
