<template>
  <div class="essayList">
    <div :class="{ essayListWrapper: !0, scrollFinish: isFinish, noAvatar: essayListFrom }">
      <Scroll ref="scroll" :on-reach-bottom="!isFinish ? handleAddEssay : ()=>{}" height="700">
        <div class="item" v-for="(item, index) in essayList" :key="index">
          <div
            class="left"
            @click="goOtherUser(item.user.id)"
            v-if="!essayListFrom"
          >
            <div>
              <img src="@/assets/logo.png" width="50px" height="50px" />
            </div>
            <div>{{ item.user.username }}{{ index }}</div>
          </div>
          <div class="right">
            <essayBriefInfo :essay="item.essay"></essayBriefInfo>
          </div>
        </div>
      </Scroll>
    </div>
  </div>
</template>
<script>
import essayBriefInfo from "@/components/essay/EssayBriefInfo"
import { mapState } from "vuex"
export default {
  data () {
    return {
      isFinish: !1,
      page: 0,
      flag: 1,
      userId: 0,
      essayListAction: "essay/getEssayList"
    }
  },
  created () {
    console.log(this.userInfo.id)
    this.getEssayListFrom()
    this.getEssayByPage()
  },
  computed: {
    ...mapState({
      // 0 主页文章列表 1其他用户文章列表
      essayListFrom: state => state.essay.essayListFrom,
      essayList: state => state.essay.essayList,
      userInfo: state => state.user.userInfo,
      otherInfo: state => state.user.otherInfo
    })
  },
  components: {
    essayBriefInfo
  },
  methods: {
    getEssayListFrom () {
      var path = this.$route.path
      var essayListFrom = this.essayListFrom

      switch (path) {
        case "/":
          essayListFrom = 0
          this.flag = 1
          break
        case "/user/blogmanagement":
          essayListFrom = 1
          this.flag = 1
          this.userId = this.userInfo.id
          break
        case "/otheruser/essayList":
          essayListFrom = 2
          this.flag = 1
          this.userId = this.$route.query.userid
          break
        default:
          essayListFrom = 0
          this.flag = 1
      }
      this.$store.commit("essay/setEssayListFrom", essayListFrom)
    },
    // isMore 是否上拉加载更多
    getEssayByPage (isMore, done) {
      var param = {
        page: ++this.page,
        flag: this.flag,
        userId: this.userId,
        isMore,
        success: (list) => {
          this.isFinish = list.length < 10
        }
      }
      this.$store.dispatch(this.essayListAction, param)
    },
    handleAddEssay (done) {
      console.log("上拉加载更多")
      this.getEssayByPage(!0, done)
    },
    goOtherUser (userid) {
      console.log(userid)
      this.$store.dispatch("user/getOtherUser", {
        userId: userid,
        success: res => {
          this.$router.push({
            path: "/otheruser/essayList",
            query: { userid: res.id }
          })
        }
      })
    }
  }
}
</script>
<style scoped>
.essayList {
  width: 960px;
  margin: 0 auto;
}
.essayList .essayListWrapper{
  height: 700px;
}
.essayListWrapper .item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid skyblue;
  padding: 0 50px;
  margin-top: 20px;
}
.essayListWrapper .item:last-child {
  border: none;
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
