<template>
  <div class="otherLeft">
    <div class="leftTop">
      <div class="line">
          <div>
            <img src="@/assets/logo.png" width="50px" height="50px">
          </div>
          <div>username</div>
      </div>
      <div class="line btnWrap">
        <Button type="info" class="btn">关注</Button>
        <Button type="info">私信</Button>
      </div>
    </div>
    <div class="leftBottom">
      <Menu active-name="1-2" :open-names="['1']">
          <Submenu name="4">
              <template slot="title">
                  <Icon type="ios-cog" />
                  全部标签
              </template>
              <MenuItem name="4-1">Option 9</MenuItem>
              <MenuItem name="4-2">Option 10</MenuItem>
              <MenuItem name="4-3">Option 11</MenuItem>
              <MenuItem name="4-4">Option 12</MenuItem>
          </Submenu>
      </Menu>
    </div>
  </div>
</template>
<script>
// import login from '@/api/loginApi'
export default {
  data () {
    return {
      current: 1
    }
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
