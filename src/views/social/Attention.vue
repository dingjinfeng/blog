<template>
  <div class="attention">
    <div class="attentionList">
      <div class="item" v-for="(item, index) in attentionList" :key="index">
        <div class="line">
          <avatar :imgId="item.imgid"/>
        </div>
        <div class="line">{{item.username}}</div>
        <div class="line">
          <Button size="small" type="dashed" @click="deleteAttention(item.id, index)">取消关注</Button>
        </div>
        <Divider type="vertical" dashed/>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex"
import avatar from "@/components/utils/Avatar"
export default {
  data () {
    return {
      attentionList: []
    }
  },
  created () {
    this.getAttention()
    this.$store.commit("social/setLeftCurrent", 3)
    this.$store.commit("switchLoading", !1)
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  components: {
    avatar
  },
  methods: {
    getAttention () {
      var attention_param = {
        userId: this.userInfo.id,
        success: (list) => {
          this.attentionList = this.attentionList.concat(list)
        }
      }
      this.$store.dispatch("attention/getAttentions", attention_param)
    },
    deleteAttention (userId, index) {
      var attention_param = {
        fromUserId: this.userInfo.id,
        toUserId: userId,
        success: () => {
          this.$storer.go(0)
        }
      }
      this.$store.dispatch("attention/deleteAttention", attention_param)
    }
  }
}
</script>
<style scoped>
.attentionList{
    display: flex;
    justify-content:space-between;
    align-items: center;
    flex-wrap: wrap;
}
.attention .item{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right:10px;
    margin-bottom: 10px;
    width: 70px;
    flex-grow: 0;
    flex-shrink: 0;
}
</style>
