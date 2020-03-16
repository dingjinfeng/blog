<template>
    <div class="reply">
      <div class="replyListWrap">
        <Scroll :on-reach-bottom="!isReplyFinish ? bottomAddReply : stopAddReply" height="600">
          <div class="replyList" v-for="(item,index) in replyList" :key="index">
              <div class="item">
                  <div class="line">
                      <div class="left">
                          <span class="mr10">({{item.reply.createtime}}):</span>
                          <span class="mr10">您在</span>
                          <a @click="goOtherEssayDetail" class="mr10 essaylink">{{item.essay.title}}</a>
                          <span class="mr10">向</span>
                          <a @click="goOtherIndex" class="mr10 essaylink">{{item.touser.username}}</a>
                          <span>回复了：</span>
                      </div>
                      <div class="right">
                          <Button type="dashed">删除回复</Button>
                      </div>
                  </div>
                  <div class="line">
                      <Poptip trigger="hover" title="当前回复内容" :content="item.reply.msg">
                          <div class="content">
                            {{item.reply.msg}}
                          </div>
                      </Poptip>
                  </div>
              </div>
          </div>
        </Scroll>
      </div>
    </div>
</template>
<script>
import { mapState } from "vuex"
export default {
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  created () {
    this.getReplyByUserId()
    this.$store.commit("social/setLeftCurrent", 2)
    this.$store.commit("switchLoading", !1)
  },
  methods: {
    goOtherEssayDetail () {
      this.$router.push('/otheruser/essaydetail')
    },
    goOtherIndex (index) {
    },
    getReplyByUserId () {
      var reply_param = {
        userId: this.userInfo.id,
        page: ++this.replyPage,
        success: (list) => {
          console.log(list)
          this.replyList = this.replyList.concat(list)
        }
      }
      this.$store.dispatch("reply/getReplyByUserId", reply_param)
    },
    bottomAddReply () {
      return new Promise(resolve => {
        this.getReplyByUserId()
        resolve()
      })
    },
    stopAddReply () {
      return new Promise(resolve => {
        resolve()
      })
    }
  },
  data () {
    return {
      replyList: [],
      replyPage: 0,
      isReplyFinish: 0
    }
  }
}
</script>
<style scoped>
.replyList{
    font-size: 16px;
}
.replyListWrap{
  width: 100%;
  height: 600px;
  position: relative;
}
.replyList .mr10{
    margin-right: 10px;
}
.replyList .essaylink{
    color: red;
    text-decoration: underline;
}
.replyList .line:first-child{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.replyList .line:first-child .right{
    width: 20%;
    text-align: right;
}
.replyList .content{
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
.replyList .item{
    border-bottom: 1px dashed #2d8cf0;
    padding-bottom: 10px;
    margin-bottom: 10px;
}
.replyList .item:last-child{
    border-bottom:none;
}
</style>
