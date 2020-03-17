<template>
  <div class="otherLeft">
    <div class="leftTop">
      <div class="line">
          <div v-if="user.imgid">
            <avatar :imgId="user.imgid" />
          </div>
          <div>{{user.username}}</div>
      </div>
      <div class="line btnWrap" v-if="user.id !== userInfo.id">
        <Button type="info" class="btn" @click="addAttention(user.id)" v-if="!type">关注</Button>
        <Button type="info" class="btn" @click="deleteAttention(user.id)" v-if="type">取消关注</Button>
        <Button type="info" @click="addLetter(user.id)" v-if="!letterType">私信他</Button>
      </div>
    </div>
    <div class="leftBottom">
      <Menu :active-name="cateId" :open-names="['4']">
          <Submenu name="4">
              <template slot="title">
                  <Icon type="ios-cog" />
                  全部标签
              </template>
              <MenuItem v-for="(cate,index) in cateList" :key="index" :name="cate.id">
                <div @click="goCateEssayList(cate.id)">
                  {{cate.id}}{{cate.name}}
                </div>
              </MenuItem>
              <Button v-if="!isEnd" type="dashed" size="small" @click="getCates(user.id)">展开更多标签</Button>
          </Submenu>
      </Menu>
    </div>
  </div>
</template>
<script>
import avatar from "@/components/utils/Avatar"
import { mapState } from 'vuex'
// import login from '@/api/loginApi'
export default {
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  data () {
    return {
      user: {},
      type: 0,
      cateList: [],
      catePage: 0,
      cateId: 0,
      isEnd: 0,
      // 0表示未建立私信, 1 表示已建立私信
      letterType: 0
    }
  },
  created () {
    var userId = parseInt(this.$route.query.userId)
    this.getUser(userId)
    this.getCates(userId)
    this.getLetter(userId)
  },
  methods: {
    getLetter (userId) {
      var letter_param = {
        userId1: this.userInfo.id,
        userId2: userId,
        success: (letter) => {
          if (letter) {
            this.letterType = 1
          }
        }
      }
      this.$store.dispatch("letter/getLetter", letter_param)
    },
    addAttention (userId) {
      var attention_param = {
        fromUserId: this.userInfo.id,
        toUserId: userId,
        success: () => {
          this.type = 1
        }
      }
      this.$store.dispatch("attention/addAttention", attention_param)
    },
    deleteAttention (userId) {
      var attention_param = {
        fromUserId: this.userInfo.id,
        toUserId: userId,
        success: () => {
          this.type = 0
        }
      }
      this.$store.dispatch("attention/deleteAttention", attention_param)
    },
    goCateEssayList (cateId) {
      this.$router.replace({ path: "/otheruser/essayList", query: { userId: this.user.id, cateId } })
    },
    getUser (userId) {
      var user_params = {
        userId,
        success: (res) => {
          this.user = res
          this.getAttention(this.user.id)
        }
      }
      this.$store.dispatch("user/getUserByUserId", user_params)
    },
    getAttention (userId) {
      var attention_params = {
        fromUserId: this.userInfo.id,
        toUserId: userId,
        success: (res) => {
          if (res) {
            this.type = 1
          } else {
            this.type = 0
          }
        }
      }
      this.$store.dispatch("attention/getAttention", attention_params)
    },
    getCates (userId) {
      var cate_params = {
        userId,
        page: ++this.catePage,
        success: (res) => {
          if (res.length < 10) {
            this.isEnd = 1
          }
          this.cateList = this.cateList.concat(res)
        }
      }
      this.$store.dispatch("cate/getCates", cate_params)
    },
    addLetter (userId) {
      var letter_param = {
        userId1: this.userInfo.id,
        userId2: userId,
        success: (letter) => {
          this.letterType = 1
        }
      }
      this.$store.dispatch("letter/addLetter", letter_param)
    }
  },
  components: {
    avatar
  }
}
</script>
<style scoped>
.otherLeft{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.otherLeft .btnWrap{
  margin-top:10px;
}
.otherLeft .btnWrap .btn:first-child{
  margin-right:20px;
}
.otherLeft .leftTop .line{
  text-align: center;
}
</style>
