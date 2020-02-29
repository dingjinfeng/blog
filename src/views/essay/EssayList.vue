<template>
  <div :class="{'essayListWrapper': !0, 'noAvatar':essayListFrom }" >
    <div class="item" v-for="(item,index) in essayList" :key="index">
      <div class="left" @click="goOtherUser(item.user.id)" v-if="!essayListFrom">
        <div id=usernameandprofile>
          <div>
            <img src="@/assets/logo.png" width="50px" height="50px">
          </div>
          <div>{{item.user.username}}</div>
        </div>
      </div>
      <div class="right">
        <essayBriefInfo :essay="item.essay"></essayBriefInfo>
      </div>
    </div>
  </div>
</template>
<script>
import essayBriefInfo from '@/components/essay/EssayBriefInfo'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      currentPage: 1
    }
  },
  created () {
    var type = 0
    var path = this.$route.path
    var action = 'essay/getEssayList'
    var flag = 1
    var userId
    switch (path) {
      case '/':
        type = 0
        userId = 0
        flag = 1
        break
      case '/user/blogmanagement':
        type = 1
        flag = 1
        userId = this.userInfo.id
        this.$store.commit("user/setLeftCurrent", 2)
        break
      case '/otheruser/essayList':
        type = 2
        flag = 1
        userId = this.$route.query.userid
        break
      default:
        type = 0
        flag = 1
        userId = 0
    }
    this.$store.commit('essay/setEssayListFrom', type)
    var param = {
      page: this.currentPage,
      flag,
      userId,
      success: (res) => {
        this.currentPage = res
        this.$store.commit('switchLoading', !1)
      }
    }
    this.$store.dispatch(action, param)
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
    goOtherUser (userId) {
      console.log(userId)
      this.$store.commit("switchLoading", !0)
      this.$store.dispatch('essay/getEssayList', {
        userId: userId,
        flag: 1,
        page: 1,
        success: res => {
          this.$router.push({ path: '/otheruser/essayList', query: { userid: res.id } })
        }
      })
    }
  }
}
</script>
<style scoped>
.essayListWrapper{
  width: 960px;
  margin:0 auto;
}
.item{
  display: flex;
  align-items: center;
  border: 1px solid skyblue;
  padding:0 120px;
  margin-top:20px;
}
.item .left{
  margin-right:50px;
}
.item .right{
  max-width: 100%;
}
.noAvatar{
  width: 700px;
}
.noAvatar .item{
  padding: 0;
}
</style>
