<template>
  <div class="cateManagement">
    <Button class="btn" type="dashed" @click="addCate">添加分类</Button>
    <Scroll ref="scroll" :on-reach-bottom="!isFinish ? handleAddCate : stopAddCate" height="436">
      <div class="line" v-for="(cate, cateIndex) in cateList" :key="cateIndex">
        <span class="catename">{{cate.name}}</span>
        <div>
          <Button class="btn" size="small" type="primary" @click="changeShow(1, cate.id)">添加博文</Button>
          <Button class="btn" size="small"  type="primary" @click="changeShow(2, cate.id)">删除博文</Button>
          <Button class="btn" size="small" type="primary" @click="deleteCate(cate.id, cateIndex)">删除标签</Button>
        </div>
      </div>
      <Divider v-if="isFinish" size="small" class="fs10" :dashed="true">已经到底了</Divider>
    </Scroll>
    <div>
      <Drawer :title="isShow === 1?'添加博文':'删除博文'" :closable="true" :scrollable="true" :value="!!isShow" @on-close="initEssayData">
        <div v-for="(essay,essayIndex) in essayList" :key="essayIndex">
          <div class="essayInfo">
            <div class="title mgr20">{{essay.title}}</div>
            <div class="date mgr20">时间:{{essay.createtime}}</div>
          </div>
          <div class="btn">
            <Button class="btn" size="small" type="primary" v-if="isShow == 1" @click="addEssayCate(essay.id, current_cate, essayIndex)">添加</Button>
            <Button class="btn" size="small" type="primary" v-if="isShow == 2" @click="deleteEssayCate(essay.id, current_cate, essayIndex)">删除</Button>
          </div>
        </div>
      </Drawer>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
export default {
  created () {
    this.$store.commit("user/setLeftCurrent", 3)
    this.getCates()
    this.$store.commit("switchLoading", !1)
  },
  data () {
    return {
      page: 0,
      cateList: [],
      isShow: 0,
      essayPage: 0,
      essayList: [],
      cate_name: "",
      current_cate: 0,
      isFinish: 0
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  methods: {
    getCates () {
      var cate_param = {
        userId: this.userInfo.id,
        page: ++this.page,
        success: (list) => {
          this.isFinish = list.length < 10
          this.cateList = this.cateList.concat(list)
        }
      }
      this.$store.dispatch("cate/getCates", cate_param)
    },
    changeShow (isShow, cateId) {
      // 1表示查询所有具备该标签的文章,2 表示查询所有不具备该标签的文章
      this.essayPage = 0
      this.essayList = []
      var param = {
        cateId,
        flag: 1,
        userId: this.userInfo.id,
        success: (list) => {
          console.log(list.length)
          this.essayList = this.essayList.concat(list)
          this.current_cate = cateId
          this.isShow = isShow
        }
      }
      if (isShow === 1) {
        param.flag = 2
      }
      this.$store.dispatch("essay/getAllEssayByCateId", param)
    },
    addEssayCate (essayId, cateId, essayIndex) {
      this.$store.dispatch("essay/addEssayCate", {
        cateId,
        essayId,
        success: () => {
          this.essayList.splice(essayIndex, 1)
          this.$store.commit("switchLoading", !1)
        }
      })
    },
    deleteEssayCate (essayId, cateId, essayIndex) {
      this.$store.dispatch("essay/deleteEssayCate", {
        cateId,
        essayId,
        success: () => {
          this.essayList.splice(essayIndex, 1)
          this.$store.commit("switchLoading", !1)
        }
      })
    },
    addCate () {
      this.$Modal.confirm({
        render: (h) => {
          return h('Input', {
            props: {
              value: this.cate_name,
              placeholder: '请输入标签名...'
            },
            on: {
              input: (val) => {
                this.cate_name = val
              }
            }
          })
        },
        onOk: () => {
          this.$store.dispatch("cate/addCate", {
            name: this.cate_name,
            userId: this.userInfo.id,
            success: (cate) => {
              this.$router.go(0)
            }
          })
        },
        onCancel: () => {
          this.cate_name = ""
        }
      })
    },
    initEssayData () {
      this.essayList = []
      this.isShow = 0
      this.current_cate = 0
    },
    deleteCate (cateId, cateIndex) {
      var cate_param = {
        cateId,
        success: () => {
          this.$router.go(0)
        }
      }
      this.$store.dispatch("cate/deleteCate", cate_param)
    },
    stopAddCate () {
    },
    handleAddCate () {
      return new Promise(resolve => {
        this.getCates()
        resolve()
      })
    },
    handleAddEssay () {
      return new Promise(resolve => {
        this.changeShow(this.isShow, this.current_cate)
        resolve()
      })
    },
    stopAddEssay () {
    }
  }
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.cateManagement .line {
  display: flex;
  font-size: 16px;
}
.cateManagement .btn {
  margin-left: 10px;
}
.ivu-scroll-wrapper {
  width: 100% !important;
}
.fs10{
  font-size: 10px;
}
</style>
