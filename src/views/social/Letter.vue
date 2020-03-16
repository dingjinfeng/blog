<template>
  <div id="letter">
    <div :class="{ scrollFinish: isLetterFinish, userListWrap: !0 }">
      <Scroll :on-reach-bottom="!isLetterFinish ? bottomAddLetter : stopAddLetter" height="600">
        <div class="userList">
        <div class="item" v-for="(item, index) in letterList" :key="index" @click="showLetterMsgList(item.letter, item.user, index)">
            <div class="avatar mr10">
              <!-- <div class="noRead" v-if="item.noRead > 0"><span>{{+item.noRead > 99 ? "99+ : item.noRead}}</span></div> -->
              <div class="noRead"><span>99+</span></div>
              <avatar :imgId="item.user.imgid"/>
            </div>
            <div class="briefContent">
              <div class="line">
                <span class="mr10">{{item.user.username}}</span>
                <span v-if="item.latestLetterMsg">{{item.latestLetterMsg.createtime}}</span>
              </div>
              <div class="content" v-if="item.latestLetterMsg">{{item.latestLetterMsg.msg}}</div>
            </div>
        </div>
        </div>
      </Scroll>
    </div>
    <div class="drawer-letter" v-if="isShowDrawer">
      <Drawer
            :title="'与  '+current_user.username+'  的私信记录'"
            v-model="isShowDrawer"
            width="800"
            @on-close="resetData"
        >
        <div class="letterListWrap">
          <div :class="{ scrollFinish: isLetterMsgFinish, letterList: !0 }">
            <Scroll :on-reach-top="!isLetterMsgFinish ? topAddLetterMsg : stopAddLetterMsg" height="600">
              <div :class="{item: !0, leftLetter: userInfo.id === item.toUserId, rightLetter: userInfo.id === item.fromUserId}" :ref="'letterItem' + index" v-for="(item, index) in reversedLetterMsgList" :key="index">
                <div>
                  {{item.createtime}}
                </div>
                <div class="avatar" v-if="userInfo.id === item.toUserId"><avatar :imgId="current_user.imgid" /></div>
                <div class="avatar" v-if="userInfo.id === item.fromUserId"><avatar :imgId="userInfo.imgid" /></div>
                <div class="msg mr10 ml10">{{item.msg}}</div>
                <Checkbox v-if="userInfo.id === item.toUserId && !item.flag" v-model="item.flag" @on-change="flag => setLetterMsgFlag(flag, item, index)">{{item.flag? '已读': '未读'}}</Checkbox>
                <Icon v-if="userInfo.id === item.toUserId && !!item.flag" type="ios-checkmark" size="30"/>
              </div>
            </Scroll>

            <!-- <scroller :on-infinite="bottomAddLetter" height="70%">
              <div :class="{item: !0, leftLetter: item.left, rightLetter: item.right}" v-for="(item, index) in letterList" :key="index">
                <div class="avatar"><img src="@/assets/logo.png" width="30px" height="30px"></div>
                <div class="msg mr10 ml10">{{item.msg}}</div>
                <Checkbox v-model="item.isRead" :disabled="item.isRead">{{item.isRead? '已读': '未读'}}</Checkbox>
              </div>
            </scroller> -->
          </div>
        </div>
        <Form :model="formSend" label-colon>
          <FormItem label="回复私信" label-position="top">
            <Input type="textarea" v-model="formSend.msg" :rows="4" placeholder="请输入回复私信内容" />
          </FormItem>
        </Form>
        <div class="demo-drawer-footer">
          <Button style="margin-right: 8px" @click="isShowDrawer = false">取消</Button>
          <Button type="primary" @click="addLetterMsg">回复他</Button>
        </div>
      </Drawer>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
import avatar from "@/components/utils/Avatar"
export default {
  components: {
    avatar
  },
  data () {
    return {
      // 从state中获取
      isLetterFinish: !1,
      isLetterMsgFinish: !1,
      isShowDrawer: !1,
      letterList: [],
      letterPage: 0,
      letterMsgList: [],
      letterMsgPage: 0,
      current_user: {},
      current_letter: {},
      // userList: [{
      //   userInfo: {
      //     username: '哈哈'
      //   },
      //   noRead: 1000,
      //   letterList: [{
      //     left: !0,
      //     msg: '私信内容',
      //     date: '2019-09-12'
      //   }, {
      //     right: !0,
      //     msg: '私信内容私信内容私信内容私信内容私信内容私信内容私信内容私信内容私信内容私信内容私信内容私信内容私信内容私信内容私信内容',
      //     date: '2019-09-12'
      //   }]
      // }, {
      //   userInfo: {
      //     username: '哈哈'
      //   },
      //   letterList: [{
      //     left: !0,
      //     msg: '私信内容',
      //     date: '2019-09-12'
      //   }, {
      //     right: !0,
      //     msg: '私信内容',
      //     date: '2019-09-12'
      //   }]
      // }, {
      //   userInfo: {
      //     username: '哈哈'
      //   },
      //   letterList: [{
      //     left: !0,
      //     msg: '私信内容',
      //     date: '2019-09-12'
      //   }, {
      //     right: !0,
      //     msg: '私信内容',
      //     date: '2019-09-12'
      //   }]
      // }, {
      //   userInfo: {
      //     username: '哈哈'
      //   },
      //   letterList: [{
      //     left: !0,
      //     msg: '私信内容',
      //     date: '2019-09-12'
      //   }, {
      //     right: !0,
      //     msg: '私信内容',
      //     date: '2019-09-12'
      //   }]
      // }],
      formSend: {
        msg: ""
      }
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    }),
    reversedLetterMsgList: function () {
      var arr = new Array(...this.letterMsgList)
      return arr.reverse()
    }
  },
  created () {
    this.$store.commit("social/setLeftCurrent", 5)
    this.getLetterList()
  },
  methods: {
    setLetterMsgFlag (flag, letterMsg, index) {
      if (flag) {
        var letterMsg_param = {
          letterMsgId: letterMsg.id,
          success: () => {
            this.letterMsgList[index].flag = 1
          }
        }
        this.$store.dispatch("letterMsg/switchFlag", letterMsg_param)
      }
    },
    resetData () {
      this.isLetterMsgFinish = !1
      this.isShowDrawer = !1
      this.letterMsgList = []
      this.letterMsgPage = 0
      this.current_user = {}
      this.current_letter = {}
      this.formSend.msg = ""
    },
    getLetterList () {
      var letter_param = {
        userId: this.userInfo.id,
        page: ++this.letterPage,
        success: (letter) => {
          if (letter.list.length < 10) {
            this.isLetterFinish = !0
          }
          this.letterList = this.letterList.concat(letter.list)
        }
      }
      this.$store.dispatch("letter/getLetterList", letter_param)
    },
    getLetterMsgList (letterId) {
      var letter_param = {
        letterId,
        page: ++this.letterMsgPage,
        success: (letterMsgList) => {
          if (letterMsgList.list.length < 10) {
            this.isLetterMsgFinish = !0
          }
          this.letterMsgList = this.letterMsgList.concat(letterMsgList.list)
        }
      }
      this.$store.dispatch("letterMsg/getLetterMsgList", letter_param)
    },
    showLetterMsgList (current_letter, current_user, current_letter_index) {
      this.current_letter = current_letter
      this.current_user = current_user
      this.current_letter_index = current_letter_index
      this.getLetterMsgList(this.current_letter.id)
      this.isShowDrawer = !0
      // 滚动到最底部
      // this.$nextTick(()=>{
      // })
      // this.$refs['letterItem' + (this.essayList.length - 1)][0].scrollIntoView()
    },
    bottomAddLetter () {
      return new Promise(resolve => {
        this.getLetterList()
        resolve()
      })
    },
    stopAddLetter () {
      return new Promise(resolve => {
        resolve()
      })
    },
    topAddLetterMsg () {
      // 页面获取 page = (Math.floor(this.letterList/10))
      // 掉接口 (page + 1)
      // 接口但会数据 list
      // 头部添加 list.concat(this.letterList.slice(0, page *10))
      return new Promise(resolve => {
        this.getLetterMsgList(this.current_letter.id)
        resolve()
      })
    },
    stopAddLetterMsg () {
      return new Promise(resolve => {
        resolve()
      })
    },
    addLetterMsg () {
      // 发送一条私信
      // 私信内容 前后去空格 str.replace(/(^\s*)|(\s*$)/g,"") 校验表单 发送的内容是否为空
      var rep_msg = this.formSend.msg.replace(/(^\s*)|(\s*$)/g, "")
      // 掉接口
      var letterMsgParam = {
        msg: rep_msg,
        letterId: this.current_letter.id,
        fromUserId: this.userInfo.id,
        toUserId: this.current_user.id,
        success: (letterMsg) => {
          this.letterMsgList.unshift(letterMsg)
          this.letterMsgList.pop()
          this.formSend.msg = ""
          this.letterList[this.current_letter_index].latestLetterMsg = letterMsg
          this.$refs['letterItem' + (this.letterMsgList.length - 1)][0].scrollIntoView(false)
        }
      }
      this.$store.dispatch("letterMsg/addLetterMsg", letterMsgParam)
      // 接口成功之后 this.letterList.push()
      // 滚动到最底部
      // this.$nextTick(()=>{
      // })
    }
  }
}
</script>
<style scoped>
.mr10{
  margin-right: 10px;
}
.ml10{
  margin-left: 10px;
}
#letter{
  width: 100%;
}
.userListWrap{
  width: 100%;
  height: 400px;
  position: relative;
}
.item .avatar{
  border: 1px solid #2d8cf0;
  border-radius: 5px;
  flex-shrink: 0;
  position: relative;
}
.userList>.item{
  padding: 10px 5px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e8eaec;
}
.userList>.item .noRead{
  position: absolute;
  top: -10px;
  right: -10px;
  width:22px;
  height:22px;
  font-size:12px;
  text-align: center;
  border-radius: 50%;
  background-color: red;
  color: #fff;
  line-height: 22px;
  z-index: 100;
}
.userList>.item .briefContent{
  flex-grow: 1;
  overflow: hidden;
}
.userList>.item .briefContent .line {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.userList>.item .briefContent .content{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.letterListWrap{
  padding: 5px;
  width: 100%;
  border: 1px solid #2d8cf0;
}
.letterListWrap .letterList{
  position: relative;
  width: 100%;
  height:100%;
}
.letterList .item{
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.letterList .item.leftLetter{
  justify-content: flex-start;
}
.letterList .item.rightLetter{
  /* justify-content: flex-end; */
  flex-direction: row-reverse;
}
.letterList .item .msg{
  max-width: 74%;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
