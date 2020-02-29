<template>
  <div id="letter">
    <div :class="{ scrollFinish: isUserFinish, userListWrap: !0 }">
      <Scroll :on-reach-bottom="!isUserFinish ? bottomAddUser : ()=>{}" height="300">
        <div class="userList">
        <div class="item" v-for="(item, index) in userList" :key="index" @click="showLetterList(index)">
            <div class="avatar mr10">
              <div class="noRead" v-if="item.noRead > 0"><span>{{+item.noRead > 99 ? "99+" : item.noRead}}</span></div>
              <img src="@/assets/logo.png" width="50px" height="50px">
            </div>
            <div class="briefContent">
              <div class="line">
                <span class="mr10">{{item.userInfo.username}}{{index}}</span>
                <span>{{item.letterList[item.letterList.length-1].date}}</span>
              </div>
              <div class="content">{{item.letterList[item.letterList.length-1].msg}}</div>
            </div>
        </div>
        </div>
      </Scroll>
    </div>
    <div class="drawer-letter" v-if="isShowDrawer">
      <Drawer
            title="昵称"
            v-model="isShowDrawer"
            width="800"
        >
        <div class="letterListWrap">
          <div :class="{ scrollFinish: isLetterFinish, letterList: !0 }">
            <Scroll :on-reach-top="!isLetterFinish ? topAddLetterMsg : ()=>{}" height="250">
              <div :class="{item: !0, leftLetter: item.left, rightLetter: item.right}" :ref="'letterItem' + index" v-for="(item, index) in reversedLetterList" :key="index">
                <div class="avatar"><img src="@/assets/logo.png" width="30px" height="30px"></div>
                <div class="msg mr10 ml10">{{item.msg}}</div>
                <Checkbox v-model="item.isRead" :disabled="item.isRead">{{item.isRead? '已读': '未读'}}</Checkbox>
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
          <Button style="margin-right: 8px" @click="isShowDrawer = false">Cancel</Button>
          <Button type="primary" @click="isShowDrawer = false">Submit</Button>
        </div>
      </Drawer>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      otherUser: {},
      // 从state中获取
      selfUser: {},
      isFinishLetterMsg: !1,
      isUserFinish: !1,
      isLetterFinish: !1,
      isShowDrawer: !1,
      letterList: [],
      userList: [{
        userInfo: {
          username: '哈哈'
        },
        noRead: 1000,
        letterList: [{
          left: !0,
          msg: '私信内容',
          date: '2019-09-12'
        }, {
          right: !0,
          msg: '私信内容私信内容私信内容私信内容私信内容私信内容私信内容私信内容私信内容私信内容私信内容私信内容私信内容私信内容私信内容',
          date: '2019-09-12'
        }]
      }, {
        userInfo: {
          username: '哈哈'
        },
        letterList: [{
          left: !0,
          msg: '私信内容',
          date: '2019-09-12'
        }, {
          right: !0,
          msg: '私信内容',
          date: '2019-09-12'
        }]
      }, {
        userInfo: {
          username: '哈哈'
        },
        letterList: [{
          left: !0,
          msg: '私信内容',
          date: '2019-09-12'
        }, {
          right: !0,
          msg: '私信内容',
          date: '2019-09-12'
        }]
      }, {
        userInfo: {
          username: '哈哈'
        },
        letterList: [{
          left: !0,
          msg: '私信内容',
          date: '2019-09-12'
        }, {
          right: !0,
          msg: '私信内容',
          date: '2019-09-12'
        }]
      }],
      formSend: {
        msg: ""
      }
    }
  },
  computed: {
    reversedLetterList: function () {
      var arr = new Array(...this.letterList)
      return arr.reverse()
    }
  },
  methods: {
    showLetterList (index) {
      this.letterList = this.userList[index].letterList
      this.isShowDrawer = !0
      // 滚动到最底部
      // this.$nextTick(()=>{
      // })
      // this.$refs['letterItem' + (this.essayList.length - 1)][0].scrollIntoView()
    },
    bottomAddUser () {
      this.userList = this.userList.concat({
        userInfo: {
          username: '12312哈哈'
        },
        letterList: [{
          left: !0,
          msg: '私信内容',
          date: '2019-09-12'
        }, {
          right: !0,
          msg: '私信内容',
          date: '2019-09-12'
        }]
      })
    },
    topAddLetterMsg () {
      var arr = [1, 2, 3, 5]
      // 页面获取 page = (Math.floor(this.letterList/10))
      // 掉接口 (page + 1)
      // 接口但会数据 list
      // 头部添加 list.concat(this.letterList.slice(0, page *10))
      this.letterList = arr.concat(this.letterList)
    },
    sendLetter () {
      // 发送一条私信
      // 私信内容 前后去空格 str.replace(/(^\s*)|(\s*$)/g,"") 校验表单 发送的内容是否为空
      // 掉接口
      // 接口成功之后 this.letterList.push()

      // 滚动到最底部
      // this.$nextTick(()=>{
      // })
      // this.$refs['letterItem' + (this.essayList.length - 1)][0].scrollIntoView()
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
  width: 50px;
  height: 50px;
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
  height:100%;
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
.letterList .avatar{
  width: 30px;
  height: 30px;
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
