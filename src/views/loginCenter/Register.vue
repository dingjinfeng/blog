<template>
<div class="register">
  <div class="registerWrap">
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90" style="width: 310px">
        <FormItem label="昵称" prop="username">
            <i-input v-model="formValidate.username" :maxlength="15" placeholder="请输入用户名"></i-input>
        </FormItem>
        <FormItem label="邮箱" prop="mail">
            <i-input type="email" v-model="formValidate.mail" placeholder="请输入邮箱"></i-input>
        </FormItem>
        <FormItem type="password" label="密码" prop="password">
            <i-input type="password" v-model="formValidate.password" :maxlength="20" :minlength="8" placeholder="请输入密码(8-20位)"></i-input>
        </FormItem>
        <FormItem label="性别" prop="sex">
            <RadioGroup v-model="formValidate.sex">
                <Radio label="1">男</Radio>
                <Radio label="2">女</Radio>
            </RadioGroup>
        </FormItem>
        <FormItem label="个性签名" prop="intro">
            <i-input v-model="formValidate.intro" type="textarea" :autosize="{minRows: 2,maxRows: 5}" :maxlength="200" placeholder="请输入个性签名"></i-input>
        </FormItem>
        <FormItem>
          <div class="btnWrap">
            <Button class="btn" @click="handleReset('formValidate')">重置</Button>
            <Button class="btn" type="primary" @click="handleSubmit('formValidate')">注册</Button>
          </div>
        </FormItem>
    </Form>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      formValidate: {
        username: '',
        mail: '',
        password: '',
        sex: '1',
        intro: ''
      },
      ruleValidate: {
        username: [
          { required: true, message: '请输入昵称', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^[0-9|a-zA-Z]{8,20}$/, message: '密码长度为8-20位，请重新输入密码', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        intro: [
          { pattern: /^[0-9|a-zA-Z]{0,200}$/, message: '个性签名超过长度', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    handleReset (name) {
      this.$refs[name].resetFields()
    }
  }
}
</script>
<style scoped>
.registerWrap{
  margin: 80px auto;
  width: 310px;
}
.btnWrap{
  margin-top:20px;
}
.btnWrap .btn:first-child{
  margin-right: 20px;
}
</style>
