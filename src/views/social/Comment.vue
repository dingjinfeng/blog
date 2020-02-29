<template>
    <div class="comment">
        <div class="commentList">
            <div class="item">
                <div class="line">
                    <div class="left">
                        <span class="mr10">2019-01-11:</span>
                        <span class="mr10">你在</span>
                        <a @click="goOtherEssayDetail" class="mr10 essaylink">文章标题链接</a>
                        <span>评论了：</span>
                    </div>
                    <div class="right">
                        <Button type="dashed">删除评论</Button>
                    </div>
                </div>
                <div class="line">
                    <Poptip trigger="hover" title="当前评论内容" content="content32131231231">
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
    }
  }
}
</script>
<style scoped>
.commentList{
    font-size: 16px;
}
.commentList .mr10{
    margin-right: 10px;
}
.commentList .essaylink{
    color: red;
    text-decoration: underline;
}
.commentList .line:first-child{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.commentList .line:first-child .right{
    width: 20%;
    text-align: right;
}
.commentList .content{
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
.commentList .item{
    border-bottom: 1px dashed #2d8cf0;
    padding-bottom: 10px;
    margin-bottom: 10px;
}
.commentList .item:last-child{
    border-bottom:none;
}
</style>
