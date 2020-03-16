<template>
  <div class="essayDetail">
    <div>
      <span>{{essay.title}}</span>
      <span>{{essay.createtime}}</span>
    </div>
    <div>{{user.username}}</div>
    <div>
    <Tag v-for="(cate, index) in cateListOfEssay" :key="index" type="border" color="success">{{cate.name}}</Tag>
    </div>
    <div v-if="content.html">
      <editor v-model="content"></editor>
    </div>
    <Icon type="ios-thumbs-up" size="24"/>(10)|<Icon type="ios-thumbs-down" size="24"/>(4)
    <Divider />
    <div>
      <Button type="primary" shape="circle" @click="addComments(essay.id)">发表评论</Button>
      <Divider />
      <div v-for="(item, index) in commentList" :key="index">
        <comment :comment="item"></comment>
      </div>
      <Page :current="commentPage" :total="commentTotalCount" @on-change="getCommentsByEssayId" simple />
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
import comment from "@/components/essay/Comment"
import editor from "@/components/editor/Editor"
export default {
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  data () {
    return {
      essay: {},
      user: {},
      commentList: [],
      commentTotalCount: 0,
      commentPage: 1,
      cateListOfEssay: [],
      msg: '',
      content: {
        txt: "",
        html: "",
        isEditable: false
      }
    }
  },
  created () {
    var essayId = parseInt(this.$route.query.essayId)
    this.getEssayDetail(essayId)
    this.getCatesByEssay(essayId)
    var userId = parseInt(this.$route.query.userId)
    this.getUser(userId)
    this.$store.commit("switchLoading", !1)
  },
  components: {
    comment,
    editor
  },
  methods: {
    getEssayDetail (essayId) {
      var essay_params = {
        essayId,
        success: (res) => {
          this.essay = res
          this.content.txt = this.essay.msg
          this.content.html = this.essay.htmlmsg
          this.getCommentsByEssayId(this.commentPage)
        }
      }
      this.$store.dispatch("essay/getEssayByEssayId", essay_params)
    },
    getCommentsByEssayId (pageIndex) {
      var comments_param = {
        essayId: this.essay.id,
        page: pageIndex,
        success: (pageMsg) => {
          this.commentTotalCount = pageMsg.totalCount
          this.commentPage = pageMsg.currentPage
          this.commentList = pageMsg.list
        }
      }
      this.$store.dispatch("comment/getCommentsByEssayId", comments_param)
    },
    getUser (userId) {
      var user_params = {
        userId,
        success: (res) => {
          this.user = res
        }
      }
      this.$store.dispatch("user/getUserByUserId", user_params)
    },
    getCatesByEssay (essayId) {
      var cate_params = {
        essayId,
        success: (list) => {
          this.cateListOfEssay = this.cateListOfEssay.concat(list)
        }
      }
      this.$store.dispatch("cate/getCatesByEssay", cate_params)
    },
    addComments (essayId) {
      this.$Modal.confirm({
        render: (h) => {
          return h('Input', {
            props: {
              value: "",
              autofocus: true,
              placeholder: '评论内容......'
            },
            on: {
              input: (val) => {
                this.msg = val
              }
            }
          })
        },
        onOk: () => {
          var comment_param = {
            msg: this.msg,
            userId: this.userInfo.id,
            essayId,
            success: (comment) => {
              this.msg = ""
              this.commentList.unshift(comment)
              if (!this.commentList.length <= 10) {
                this.commentList.pop()
              }
              console.log(this.commentList)
            }
          }
          this.$store.dispatch("comment/addComments", comment_param)
        }
      })
    }
  }
}
</script>
