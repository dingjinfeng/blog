<template>
  <div id="letter">
    <div class="left">
      <Scroll :on-reach-bottom="handleAddUser"  height="500">
        <div class="userList">
          <div class="item" v-for="(item, index) in userList" :key="index" @click="showLetterList(index)">
            <div class="avatar mr10">
              <div class="noRead" v-if="item.noRead > 0"><span>{{+item.noRead > 99 ? "99+" : item.noRead}}</span></div>
              <img src="@/assets/logo.png" width="50px" height="50px">
            </div>
            <div class="briefContent">
              <div class="line">
                <span class="mr10">{{item.userInfo.username}}</span>
                <span>{{item.letterList[item.letterList.length-1].date}}</span>
              </div>
              <div class="content">{{item.letterList[item.letterList.length-1].msg}}</div>
            </div>
          </div>
        </div>
      </Scroll>
    </div>
    <div class="right" v-if="letterList.length">
      <div class="letterListWrap">
        <div class="top">昵称</div>
        <div class="center">
          <Scroll :on-reach-bottom="handleAddLetterList"  height="370">
            <div class="letterList" v-for="(item, index) in letterList" :key="index">
              <div :class="{item: !0, leftLetter: item.left, rightLetter: item.right}">
                <div class="avatar"><img src="@/assets/logo.png" width="30px" height="30px"></div>
                <div class="msg mr10 ml10">{{item.msg}}</div>
                <Checkbox v-model="item.isRead" disabled>{{item.isRead? '已读': '未读'}}</Checkbox>
              </div>
            </div>
          </Scroll>
        </div>
        <div class="bottom"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      isShowLetterList: false,
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
      }]
    }
  },
  methods: {
    showLetterList (index) {
      this.letterList = this.userList[index].letterList
    },
    handleAddUser () {
      return new Promise(resolve => {
        setTimeout(() => {
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
          resolve()
        }, 2000)
      })
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
  display: flex;
}
#letter>.left{
  flex-shrink: 0;
  width: 35%;
  margin-right: 10px;
}
.userList>.item{
  padding: 10px 5px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e8eaec;
}
#letter .item .avatar{
  border: 1px solid #2d8cf0;
  width: 50px;
  height: 50px;
  border-radius: 5px;
  flex-shrink: 0;
  position: relative;
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
  border: 1px solid #2d8cf0;
  height: 500px;
  max-width: 100%;
  padding: 0 5px;
}
.letterListWrap .top{
  text-align: center;
  font-size: 16px;
  padding:2px;
  font-weight: bold;
}
.letterListWrap .center{
  height:400px;
  padding: 10px 0 ;
  border:1px solid #e8eaec;
  border-left-color: transparent;
  border-right-color: transparent;
}
.letterListWrap .letterList .item{
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.letterListWrap .letterList .item.leftLetter{
  justify-content: flex-start;
}
.letterListWrap .letterList .item.rightLetter{
  justify-content: flex-end;
  flex-direction: row-reverse;
}
#letter .letterList .avatar{
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
