<template>
  <div id="essayBriefInfo">
    <div class="essayItem">
      <div class="line header">
        <div class="title mgr20" @click="showEssay(userId,essay.id)">
          {{essay.title}}
        </div>
        <div class="date mgr20">
          时间:{{essay.createtime}}
        </div>
        <div class="goodnum mgr20">
          点赞数:5
        </div>
        <div class="checkStatus" v-if="essayListFrom === 1">
          <div v-if="essay.flag == 0">审核中</div>
          <div v-if="essay.flag == 1">审核成功</div>
          <div v-if="essay.flag == -1">{{essay.checkmsg}}</div>
        </div>
        <div v-if="essayListFrom === 1" class="rightAlign">
          <Button size="small" type="dashed" @click="showEssay(userId, essay.id)">查看文章</Button>
          <Button size="small" type="dashed" @click="editEssay(essay.id)">编辑文章</Button>
          <Button size="small" type="dashed" @click="deleteEssay(essay.id, index)">删除文章</Button>
        </div>
      </div>
      <div class="line content">
        {{essay.msg}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['essay', 'userId', 'essayListFrom'],
  created () {
  },
  methods: {
    editEssay (essayId) {
      // this.$store.dispatch("essay/getEssayByEssayId", {
      //   essayId,
      //   success: () => {
      //     this.$router.push("user/")
      //   }
      // })
      this.$store.commit("switchLoading", !0)
      this.$router.push({ path: "/user/editessay", query: { essayId } })
    },
    showEssay (userId, essayId) {
      this.$store.commit("switchLoading", !0)
      this.$router.push({ path: "/otheruser/essaydetail", query: { userId, essayId } })
    },
    deleteEssay (essayId) {
      this.$store.dispatch("essay/deleteessay", {
        essayId,
        success: res => {
        }
      })
    }
  }
}
</script>
<style scoped>
.mgr20{
  margin-right: 20px;
}
#essayBriefInfo .rightAlign{
  text-align: right
}
#essayBriefInfo .checkStatus{
  margin-right: 40px;
}
#essayBriefInfo .essayItem{
  height:60px;
}
#essayBriefInfo .line{
  margin-bottom:10px;
}
#essayBriefInfo .line:last-child{
  margin-bottom:10px;
}
#essayBriefInfo .header{
  display: flex;
  align-items: center;
}
#essayBriefInfo .title{
  font-size:20px;
}
#essayBriefInfo .content{
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
