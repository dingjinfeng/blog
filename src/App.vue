<template>
  <div>
    <div id="loading" v-if="loading">
      <loading></loading>
    </div>
    <div id="headerWrap">
      <myheader></myheader>
    </div>
    <div id="contentWrap">
      <router-view></router-view>
    </div>
    <div id="footerWrap">
      我的尾部
    </div>
  </div>
</template>
<script>
import { sstorage } from '@/store/storage'
import loading from '@/views/utils/loading'
import myheader from './views/nav/myheader'
import { mapState } from "vuex"

export default {
  computed: {
    ...mapState({
      loading: state => state.loading
    })
  },
  components: {
    loading,
    myheader
  },
  created () {
    console.log('App---created')
    var userInfo = JSON.parse(sstorage.getItem('user')) || {}
    this.$store.commit('user/setUserInfo', userInfo)
  }
}
</script>
<style scoped>
#loading{
  width:100px;
  height:100px;
  margin: auto;
  position: fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
}
#contentWrap{
  width: 960px;
  margin: 0 auto;
  border:1px solid #2d8cf0;
}
#footerWrap{
  height: 100px;
}
#contentWrap,
#footerWrap{
  border: 1px solid #2d8cf0;
  margin-top: 20px;
}
</style>
<style>
.scrollFinish .ivu-scroll-loader{
  display: none;
}
.scrollFinish .ivu-scroll-content{
  opacity: 1;
}
</style>
