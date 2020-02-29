<template>
  <div class="cateManagement">
    <div class="line" v-for="(cate, cateIndex) in cateList" :key="cateIndex">
      <span>{{cate.name}}</span>
      <div>
        <Button class="btn" size="small" type="primary" @click="changeShow(1,cate.id)">添加博文</Button>
        <Button class="btn" size="small"  type="primary" @click="changeShow(2,cate.id)">删除博文</Button>
        <Button class="btn" size="small" type="primary">删除标签</Button>
        <Drawer title="添加博文" :closable="true" :scrollable="true" v-model="isShow">
          <div v-for="(essay,essayIndex) in essayList" :key="index">
            <div class="essayInfo">
              <div class="title mgr20">{{essay.title}}</div>
              <div class="date mgr20">时间:{{essay.createtime}}</div>
            </div>
            <div class="btn">
              <Button class="btn" size="small" type="primary" v-if="isShow == 1" @click="addEssay(essay.id, cate.id, essayIndex)">添加</Button>
              <Button class="btn" size="small" type="primary" v-if="isShow == 2" @click="delEssay(essay.id, cate.id, essayIndex)">删除</Button>
            </div>
          </div>
        </Drawer>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
export default {
  created () {
    this.$store.commit("user/setLeftCurrent", 3)
    this.$store.dispatch("cate/getCates", {
      userId: this.userInfo.id,
      page: 1,
      success: (res) => {
        this.currentPage = res
        console.log(res)
      }
    })
    console.log(this.cateList)
    this.$store.commit("switchLoading", !1)
  },
  data () {
    return {
      currentPage: 1,
      isShow: 0,
      essayPage: 1
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
      cateList: state => state.cate.cateList,
      essayList: state => state.essay.essayList
    })
  },
  methods: {
    changeShow (isShow, cateId) {
      if(isShow === 1) {
        this.$store.dispatch("essay/getEssayByCateId", {
          cateId,
          page: 1,
          flag: 1,// 1表示查询所有具备该标签的文章,2 表示查询所有不具备该标签的文章
          success: (res) => {
            this.essayPage = res
          }
        })
      }
      this.isShow = isShow
    },
    addEssay (essayId, cateId, essayIndex) {
      this.$store.commit("switchLoading", !0)
      this.$store.dispatch("essay/addEssayCate", {
        cateId,
        essayId,
        success: () => {
          this.essayList.splice(essayIndex, 1)
        }
      })
    },
    delEssay
  },
  components: {}
}
</script>
<style scoped>
.cateManagement {
  margin-left: 30px;
  display: flex;
  flex-direction: column;
}
.cateManagement .line{
  display: flex;
  justify-content: space-around;
  padding: 10px;
}
.cateManagement .line span:first-child {
  display: inline-block;
  width: 150px;
}
.cateManagement .line {
  display: flex;
  font-size: 16px;
}
.cateManagement .btn {
  margin-left: 10px;
}
</style>
