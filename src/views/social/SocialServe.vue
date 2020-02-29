<template>
    <div class="socialServeWrap">
        <socialLeft class="left" :current="current"></socialLeft>
        <div class="right">
          <router-view></router-view>
        </div>
    </div>
</template>
<script>
import socialLeft from './SocialLeft'
export default {
  data () {
    return {
      current: 1
    }
  },
  components: {
    socialLeft
  },
  created () {
    this.current = this.$route.query.current
  },
  beforeUpdate () {
    this.current = this.$route.query.current
  }
}
</script>
<style scoped>
  .socialServeWrap{
    display: flex;
  }
  .socialServeWrap .left{
    min-width: 240px;
    flex-grow: 0;
    flex-shrink: 1;
  }
  .socialServeWrap .right{
    width: 75%;
    padding: 20px;
  }
</style>
