<template>
  <div class="addEssay">
     <Form ref="formAddEssay" :model="formAddEssay" :rules="ruleAddEssay" hide-required-mark>
        <FormItem prop="title" :label-width = "70" label="标题">
            <i-input type="text" v-model="formAddEssay.title" :maxlength="100" placeholder="输入博文标题"></i-input>
        </FormItem>
        <FormItem :label-width = "70" label="博文标签">
            <Select v-model="formAddEssay.cate" multiple style="width:296px">
                <Option v-for="item in cates" :value="item.name" :key="item.id">{{ item.name }}</Option>
            </Select>
            <i-input v-model="formAddEssay.newCate" placeholder="新增博文标签" :maxlength="20" class="input"/>
        </FormItem>
        <FormItem :label-width = "70" label="博文内容">
        </FormItem>
        <editor v-model="formAddEssay.contentObj"></editor>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formAddEssay')">Signin</Button>
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
        title: "",
        cate: [],
        newCate: "",
        contentObj: {
          txt: "",
          slot: ""
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
        name: "vue"
      }, {
        id: 7,
        userId: 3,
        name: "vue"
      }, {
        id: 8,
        userId: 3,
        name: "vue"
      }, {
        id: 9,
        userId: 3,
        name: "vue"
      }, {
        id: 10,
        userId: 3,
        name: "vue"
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
      this.$refs[name].validate((valid) => {
        if (valid) {
          console.log(this.formAddEssay)
        //   this.$Message.success('Success!')
        } else {
        //   this.$Message.error('Fail!')
        }
      })
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
