<template>
  <div class="comment">
    <div class="commentList">
      <Scroll :on-reach-bottom="!isCommentFinish ? bottomAddComment : stopAddComment" height="600">
        <div class="item" v-for="(item, index) in commentList" :key="index">
          <div class="line">
            <div class="left">
              <span class="mr10">({{item.comment.createtime}})</span>
              <span class="mr10">您在</span>
              <a @click="goOtherEssayDetail" class="mr10 essaylink">{{item.essay.title}}</a>
              <span>文章中评论了：</span>
            </div>
            <div class="right">
              <Button type="dashed" size="small" @click="deleteComment(item.comment.id, index)">删除评论</Button>
            </div>
          </div>
          <div class="line">
            <Poptip trigger="hover" title="当前评论内容" :content="item.comment.msg">
              <div class="content">
                {{item.comment.msg}}
              </div>
            </Poptip>
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
  data () {
    return {
      commentList: [],
      commentPage: 0,
      isCommentFinish: 0
    }
  },
  created () {
    this.getCommentsByUserId()
    this.$store.commit("social/setLeftCurrent", 1)
    this.$store.commit("switchLoading", !1)
  },
  methods: {
    goOtherEssayDetail () {
      this.$router.push('/otheruser/essaydetail')
    },
    getCommentsByUserId () {
      var comment_params = {
        userId: this.userInfo.id,
        page: ++this.commentPage,
        success: (list) => {
          console.log("getCommentsByUserId jdfhjahkdjhfjahkdfja")
          console.log(list)
          if (list.length < 10) {
            this.isCommentFinish = 1
          }
          this.commentList = this.commentList.concat(list)
        }
      }
      this.$store.dispatch("comment/getCommentsByUserId", comment_params)
    },
    deleteComment (commentId, commentIndex) {
      var comment_params = {
        commentId,
        success: () => {
          console.log("删除成功")
          this.$router.go(0)
        }
      }
      this.$store.dispatch("comment/deleteComment", comment_params)
    },
    bottomAddComment () {
      return new Promise(resolve => {
        this.getCommentsByUserId()
        resolve()
      })
    },
    stopAddComment () {
      return new Promise(resolve => {
        resolve()
      })
    }
  }
}
</script>
<style scoped>
.commentList{
  font-size: 16px;
  width: 100%;
  height: 600px;
  position: relative;
}
.commentList .mr10{
    margin-right: 10px;
}
.commentList .essaylink{
    color: red;
    text-decoration: underline;
}
.commentList .line:first-child{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.commentList .line:first-child .right{
    width: 20%;
    text-align: right;
}
.commentList .content{
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
.commentList .item{
    border-bottom: 1px dashed #2d8cf0;
    padding-bottom: 10px;
    margin-bottom: 10px;
}
.commentList .item:last-child{
    border-bottom:none;
}
</style>
