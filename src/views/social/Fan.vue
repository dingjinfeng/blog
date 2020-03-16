<template>
  <div class="fan">
    <div class="fanList">
      <div class="item" v-for="(item, index) in fanList" :key="index">{{item}}
        <div class="line">
          <avatar :imgId="item.imgid"/>
        </div>
        <div class="line">username</div>
      </div>
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
      fanList: []
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  created () {

  },
  methods: {
    getFans () {
      var fan_param = {
        userId: this.userInfo.id,
        success: (list) => {
          this.fanList = list
        }
      }
      this.$store.dispatch("fan/getFans", fan_param)
    }
  }
}
</script>
<style scoped>
.fanList{
    display: flex;
    justify-content:space-between;
    align-items: center;
    flex-wrap: wrap;
}
.fan .item{
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
