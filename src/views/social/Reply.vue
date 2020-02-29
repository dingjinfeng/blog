<template>
    <div class="reply">
        <div class="replyList">
            <div class="item">
                <div class="line">
                    <div class="left">
                        <span class="mr10">2019-01-11:</span>
                        <span class="mr10">你在</span>
                        <a @click="goOtherEssayDetail" class="mr10 essaylink">文章标题链接</a>
                        <span class="mr10">向</span>
                        <a @click="goOtherIndex" class="mr10 essaylink">评论或者回复的作者</a>
                        <span>回复了：</span>
                    </div>
                    <div class="right">
                        <Button type="dashed">删除回复</Button>
                    </div>
                </div>
                <div class="line">
                    <Poptip trigger="hover" title="当前回复内容" content="content32131231231">
                        <div class="content">
                            超过三行 ...查看全部sdfakdfkjakjfkjadjkfja反反复复反反复复反反复复反反复复反反复复反反复复反反复复反反复复反反复复反反复复反反复复反反复复反反复复方法反反复复反反复复反反复复反反复复反反复复反反复复反反复复反反复复反反复复反反复复反反复复反反复复反反复复反反复复反反复复反反复复反反复复反反复复反反复复反反复复方法
                        </div>
                    </Poptip>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  methods: {
    goOtherEssayDetail () {
      this.$router.push('/otheruser/essaydetail')
    },
    goOtherIndex (index) {
    }
  }
}
</script>
<style scoped>
.replyList{
    font-size: 16px;
}
.replyList .mr10{
    margin-right: 10px;
}
.replyList .essaylink{
    color: red;
    text-decoration: underline;
}
.replyList .line:first-child{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.replyList .line:first-child .right{
    width: 20%;
    text-align: right;
}
.replyList .content{
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
.replyList .item{
    border-bottom: 1px dashed #2d8cf0;
    padding-bottom: 10px;
    margin-bottom: 10px;
}
.replyList .item:last-child{
    border-bottom:none;
}
</style>
