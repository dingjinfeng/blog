<template>
  <div class="fan">
    <div class="fanList">
      <div class="item" v-for="(item, index) in fanList" :key="index">
        <div class="line">
          <img src="@/assets/logo.png" width="50px" height="50px">
        </div>
        <div class="line">username</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      fanList: new Array(100)
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
