<template>
  <div class="addEssay">
    <!-- <div v-html="formAddEssay.contentObj.html"></div> -->
     <Form ref="formAddEssay" :model="formAddEssay" :rules="ruleAddEssay" hide-required-mark>
        <FormItem prop="title" :label-width = "70" label="标题">
            <i-input type="text" v-model="formAddEssay.title" :maxlength="100" placeholder="输入博文标题"></i-input>
        </FormItem>
        <FormItem :label-width = "70" label="博文标签">
            <Select v-model="formAddEssay.cate" multiple style="width:296px">
                <Option v-for="item in cates" :value="item.id" :key="item.id">{{ item.name }}</Option>
            </Select>
            <i-input v-model="formAddEssay.newCate" placeholder="新增博文标签" :maxlength="20" class="input"/>
        </FormItem>
        <FormItem :label-width = "70" label="博文内容">
        </FormItem>
        <editor v-model="formAddEssay.contentObj"></editor>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formAddEssay')">提交博文</Button>
        </FormItem>
    </Form>
  </div>
</template>
<script>
import editor from "@/components/editor/Editor"
export default {
  created () {
    this.$store.commit("user/setLeftCurrent", 1)
    this.$store.commit("switchLoading", !1)
  },
  data () {
    return {
      formAddEssay: {
        title: "title",
        cate: ["cateid1", "cate433333"],
        newCate: "cate4",
        contentObj: {
          txt: "",
          html: ""
        }
      },
      cates: [{
        id: 1,
        userId: 3,
        name: "java"
      }, {
        id: 2,
        userId: 3,
        name: "javascript"
      }, {
        id: 3,
        userId: 3,
        name: "html"
      }, {
        id: 4,
        userId: 3,
        name: "css"
      }, {
        id: 5,
        userId: 3,
        name: "vue"
      }, {
        id: 6,
        userId: 3,
        name: "vue1"
      }, {
        id: 7,
        userId: 3,
        name: "vue2"
      }, {
        id: 8,
        userId: 3,
        name: "vue3"
      }, {
        id: 9,
        userId: 3,
        name: "vue4"
      }, {
        id: 10,
        userId: 3,
        name: "vue5"
      }],
      ruleAddEssay: {
        title: [
          { required: true, message: '请输入博文标签', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    editor
  },
  methods: {
    handleSubmit (name) {
      console.log("哈哈哈")
      console.log(this.formAddEssay)
      // this.$store.dispatch("essay/addEssay", {
      //   userId: 3,
      //   oldCateId: [1, 3, 5],
      //   newCateName: "dingjajdf",
      //   title: "title--sss",
      //   msg: this.formAddEssay.contentObj.txt,
      //   htmlMsg: this.formAddEssay.contentObj.html
      // })
      // this.$refs[name].validate((valid) => {
      //   if (valid) {
      //   //   this.$Message.success('Success!')
      //   } else {
      //   //   this.$Message.error('Fail!')
      //   }
      // })
    }
  }
}
</script>
<style scoped>
.addEssay .input{
    width: 296px;
    margin-left: 15px;
}
</style>
