<template>
  <div class="editEssay">
    <!-- <div v-html="formAddEssay.contentObj.html"></div> -->
     <Form ref="formEditEssay" :model="formEditEssay" :rules="ruleEditEssay" hide-required-mark>
        <FormItem prop="title" :label-width = "70" label="标题">
            <i-input type="text" v-model="formEditEssay.title" :maxlength="100" placeholder="输入博文标题"></i-input>
        </FormItem>
        <FormItem :label-width = "70" label="博文内容">
        </FormItem>
        <editor v-model="formEditEssay.contentObj"></editor>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formEditEssay')">提交博文</Button>
        </FormItem>
    </Form>
  </div>
</template>
<script>
import { mapState } from "vuex"
import editor from "@/components/editor/Editor"
export default {
  data () {
    return {
      essay: {},
      formEditEssay: {
        title: "",
        contentObj: {
          txt: "",
          html: "",
          isEditable: true
        }
      },
      ruleEditEssay: {
        title: [
          { required: true, message: '请输入博文标签', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.$store.commit("switchLoading", !1)
    this.$store.commit("user/setLeftCurrent", 2)
    this.getEssay()
  },
  methods: {
    getEssay () {
      var essayId = this.$route.query.essayId
      var essay_param = {
        essayId,
        success: (essay) => {
          console.log(essay)
          this.essay = essay
          this.formEditEssay.title = essay.title
          this.formEditEssay.contentObj.txt = essay.msg
          this.formEditEssay.contentObj.html = essay.htmlmsg
        }
      }
      this.$store.dispatch("essay/getEssayByEssayId", essay_param)
    },
    handleSubmit (name) {
      if (!this.userInfo.id) {
        this.$router.push("/")
      } else {
        var essay_param = {
          essayId: this.essay.id,
          title: this.formEditEssay.title,
          msg: this.formEditEssay.contentObj.txt,
          htmlmsg: this.formEditEssay.contentObj.html,
          success: () => {
            this.$router.go(-1)
          }
        }
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$store.dispatch("essay/editEssay", essay_param)
          } else {
            this.$Message.error('Fail!')
          }
        })
      }
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  components: {
    editor
  }
}
</script>
