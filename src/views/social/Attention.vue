<template>
  <div class="attention">
    <div class="attentionList">
      <div class="item" v-for="(item, index) in attentionList" :key="index">
        <div class="line">
          <img src="@/assets/logo.png" width="50px" height="50px">
        </div>
        <div class="line">username</div>
        <div class="line">
          <Button size="small" type="dashed">取消关注</Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      attentionList: new Array(100)
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
