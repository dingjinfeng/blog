<template>
    <div class="search">
        <div class="searchWrap">
            <i-input v-model="txt" enter-button placeholder="输入文章标题搜索文章">
                <Button slot="append" icon="ios-search"></Button>
            </i-input>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      key: '0',
      txt: ''
    }
  }
}
</script>
<style>
.searchWrap .ivu-select,
.searchWrap .ivu-select-arrow,
.searchWrap .ivu-select-single .ivu-select-selection .ivu-select-placeholder{
    color:#fff;
}
</style>
<style scoped>
.searchWrap .ivu-select,
.searchWrap .ivu-select-single .ivu-select-selection .ivu-select-placeholder{
    background-color: #2d8cf0;
}
</style>
