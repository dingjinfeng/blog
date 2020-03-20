<template>
<div class="reply">
  <div>
    <span>({{reply.createtime}})</span>
    <span class="mr10 ml10">{{fromUser.username}}</span>
    <span>对</span>
    <span class="mr10 ml10">{{toUser.username}}</span>
    <span>回复了:</span>
    <div class="showReply">
      <Button type="dashed" size="small" shape="circle" @click="addReply">回复</Button>
    </div>
  </div>
  <div>
    <span>{{reply.msg}}</span>
  </div>
</div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      fromUser: {},
      toUser: {},
      msg: ""
    }
  },
  props: {
    reply: {
      required: true
    }
  },
  created () {
    // 0表示from,1表示to
    this.getUser(this.reply.fromUserId, 0)
    this.getUser(this.reply.toUserId, 1)
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  methods: {
    getUser (userId, userIndex) {
      var user_params = {
        userId,
        success: (user) => {
          if (userIndex === 0) {
            this.fromUser = user
          } else if (userIndex === 1) {
            this.toUser = user
          }
        }
      }
      this.$store.dispatch("user/getUserByUserId", user_params)
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
            commentsId: this.reply.commentsId,
            fromUserId: this.userInfo.id,
            toUserId: this.reply.toUserId,
            msg: this.msg,
            success: (reply) => {
              this.$emit("getReplyItem")
              this.msg = ""
            }
          }
          this.$store.dispatch("reply/addReply", reply_param)
        }
      })
    }
  }
}
</script>
<style scoped>
.reply .showReply{
  display: inline-block;
}
.mr10{
  margin-right: 10px;
}
.ml10{
  margin-left: 10px;
}
.mt10{
  margin-top: 10px;
}
.mb10{
  margin-bottom: 10px;
}
</style>
