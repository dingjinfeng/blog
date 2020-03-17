<template>
  <div class="comment">
    <div class="top">
      <span>({{comment.createtime}}){{user.username}}</span>
      <span>评论了:</span>
      <Button @click="addReply">回复</Button>
      <div v-if="replyList.length">
        <Button type="dashed" size="small" @click="type = 1; getReply()" v-if="type === 0">展开回复</Button>
        <Button type="dashed" size="small" @click="type = 0" v-if="type === 1">收起回复</Button>
      </div>
    </div>
    <div class="bottom">
      <span>{{comment.msg}}</span>
    </div>
    <Divider />
    <div v-if="type && replyList.length">
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
    this.replyList = []
    this.type = 0
    this.isReply = 0
    this.msg = ''
    this.getUser(this.comment.userId)
  },
  methods: {
    getUser (userId) {
      var user_params = {
        userId,
        success: (res) => {
          this.user = res
        }
      }
      this.$store.dispatch("user/getUserByUserId", user_params)
    },
    getReply () {
      var comment_param = {
        commentsId: this.comment.id,
        success: (list) => {
          this.replyList = this.replyList.concat(list)
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
          var reply_param = {
            commentsId: this.comment.id,
            fromUserId: this.userInfo.id,
            toUserId: this.comment.userId,
            msg: this.msg,
            success: (reply) => {
              this.replyList.unshift(reply)
              this.msg = ""
            }
          }
          this.$store.dispatch("reply/addReply", reply_param)
        }
      })
    },
    getAddReplyItem (reply) {
      this.replyList.unshift(reply)
    }
  }
}
</script>
