<template>
  <div class="comment">
    <div class="top">
      <span>({{comment.createtime}}){{user.username}}</span>
      <span>评论了:</span>
      <Button @click="addReply">回复</Button>
      <Button type="dashed" size="small" @click="type = 1" v-if="type === 0">展开回复</Button>
      <Button type="dashed" size="small" @click="type = 0" v-if="type === 1">收起回复</Button>
    </div>
    <div class="bottom">
      <span>{{comment.msg}}</span>
    </div>
    <Divider />
    <div v-if="type">
      <div v-for="(item, index) in replyList" :key="index">
        <reply :reply="item" @getReplyItem="getAddReplyItem"></reply>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
import reply from "@/components/essay/Reply"
export default {
  components: {
    reply
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  data () {
    return {
      replyList: [],
      type: 0,
      isReply: 0,
      msg: '',
      user: {}
    }
  },
  props: ["comment"],
  created () {
    console.log("comment.vue......")
    this.getUser(this.comment.userId)
    this.getReply()
  },
  watch: {
    comment (newValue, oldValue) {
      console.log("watch comment.vue.....")
      this.comment = newValue
      this.replyList = []
      this.type = 0
      this.isReply = 0
      this.msg = ''
      this.user = {}
      this.getUser(this.comment.userId)
      this.getReply()
    }
  },
  methods: {
    getUser (userId) {
      var user_params = {
        userId,
        success: (res) => {
          console.log("getUser", res)
          this.user = res
        }
      }
      this.$store.dispatch("user/getUserByUserId", user_params)
    },
    getReply () {
      console.log("dkjfakljkdjflk;ajdslfjakjdslkfj", this.comment.id)
      var comment_param = {
        commentsId: this.comment.id,
        success: (list) => {
          console.log("list:dfnakdskfnakndskjfna", list)
          this.replyList = this.replyList.concat(list)
          console.log("replyList:adfadsfasdf", this.replyList)
        }
      }
      this.$store.dispatch("reply/getReplyByComment", comment_param)
    },
    addReply () {
      this.$Modal.confirm({
        render: (h) => {
          return h('Input', {
            props: {
              value: this.msg,
              autofocus: true,
              placeholder: '回复信息...'
            },
            on: {
              input: (val) => {
                this.msg = val
              }
            }
          })
        },
        onOk: () => {
          console.log(this.comment)
          var reply_param = {
            commentsId: this.comment.id,
            fromUserId: this.userInfo.id,
            toUserId: this.comment.userId,
            msg: this.msg,
            success: (reply) => {
              console.log(reply)
              this.replyList.unshift(reply)
              this.msg = ""
            }
          }
          this.$store.dispatch("reply/addReply", reply_param)
        }
      })
    },
    getAddReplyItem (reply) {
      console.log("reply:fdafadsfadfa", reply)
      this.replyList.unshift(reply)
    }
  }
}
</script>
