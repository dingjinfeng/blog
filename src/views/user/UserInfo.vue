<template>
    <div class="userInfo">
        <!-- 用户个人资料展示 -->
        <div class="userInfoWrap" v-if="type == 1">
            <div class="left">
                <div class="line avatar">
                  <!-- todo -->
                    <avatar :imgId="1" />
                </div>
                <div class="line">
                    <span>昵称:</span>
                    <span>{{userInfo.username}}</span>
                </div>
                <div class="line">
                    <span>性别:</span>
                    <span>{{userInfo.sex == 1 ? "男":"女"}}</span>
                </div>
                <div class="line">
                    <span>活跃值:</span>
                    <span>{{userInfo.point}}</span>
                </div>
                <div class="line">
                    <span>邮箱:</span>
                    <span>{{userInfo.mail}}</span>
                </div>
                <div class="line">
                    <span>个性签名:</span>
                    <span>{{userInfo.intro}}</span>
                </div>
            </div>
            <div class="right">
                <Button type="primary" class="btn" @click="type = 2">修改个人资料</Button>
                <Button type="primary" @click="type = 3">修改密码</Button>
            </div>
        </div>
        <!-- 修改用户信息 -->
        <div class="editInfo" v-if="type == 2">
            <Form ref="formEdit" :model="formEdit" :rules="ruleEdit" :label-width="90" style="width:400px">
                <FormItem label="头像" prop="username">
                  <div class="avatarItem">
                    <avatar :imgId="formEdit.imgid" class="avatar"/>
                    <Upload class="uploadAvatar"
                        :action="uploadAddress"
                        :format="['jpg','jpeg','png']"
                        :on-error="uploadError"
                        :before-upload="uploadBefore"
                        :on-success="uploadSuccess"
                        :max-size="1024"
                        name="upload">
                      <Button icon="ios-cloud-upload-outline">上传图片</Button>
                    </Upload>
                  </div>
                </FormItem>
                <FormItem label="昵称" prop="username">
                    <i-input v-model="formEdit.username" placeholder="请输入用户名"></i-input>
                </FormItem>
                <FormItem label="性别" prop="sex">
                    <RadioGroup v-model="formEdit.sex">
                        <Radio :label="1">男</Radio>
                        <Radio :label="2">女</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="个性签名" prop="intro">
                    <i-input v-model="formEdit.intro" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入个性签名"></i-input>
                </FormItem>
                <FormItem class="editBtnWrap">
                    <Button class="btn" @click="editReset('formEdit')" style="margin-left: 8px">重置</Button>
                    <Button type="primary" @click="editSubmit('formEdit')">修改</Button>
                </FormItem>
            </Form>
        </div>
        <!-- 修改密码 -->
        <div class="fixPwd" v-if="type == 3">
            <Form ref="formSetPwd" :model="formSetPwd" :rules="ruleSetPwd" style="width:400px">
                <FormItem label="原密码" prop="oldPassword">
                    <i-input type="password" v-model="formSetPwd.oldPassword" placeholder="请输入原密码">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </i-input>
                </FormItem>
                <FormItem label="新密码" prop="newPassword">
                    <i-input type="password" v-model="formSetPwd.newPassword" placeholder="请输入新密码">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </i-input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="setPwdSubmit('formSetPwd')">修改</Button>
                    <Button @click="setPwdReset('formSetPwd')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import avatar from "@/components/utils/Avatar"
export default {
  data () {
    console.log(this.$store.state.user.userInfo)
    return {
      // 上传文件地址
      uploadAddress: process.env.VUE_APP_API + process.env.VUE_APP_uploadApi,
      // 1用户个人资料展示 2修改用户信息 3修改密码
      type: 1,
      formEdit: {
        username: this.$store.state.user.userInfo.username,
        sex: this.$store.state.user.userInfo.sex,
        intro: this.$store.state.user.userInfo.intro,
        // imgid: this.$store.state.user.userInfo.imgid + '.jpg',
        imgid: '1.jpg',
        imgLocation: ""
      },
      ruleEdit: {
        username: [
          { required: true, message: 'The name cannot be empty', trigger: 'blur' }
        ],
        mail: [
          { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
          { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: 'Please select gender', trigger: 'change' }
        ],
        intro: [
          { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
          { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
        ]
      },
      formSetPwd: {
        oldPassword: '',
        newPassword: ''
      },
      ruleSetPwd: {
        oldPassword: [
          { required: true, message: '原密码不能为空', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '新密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    avatar
  },
  created () {
    this.$store.commit("user/setLeftCurrent", 4)
    this.$store.commit("switchLoading", !1)
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  methods: {
    editSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          console.log(this.formEdit.intro)
          this.$store.commit("switchLoading", !0)
          this.$store.dispatch("user/updateUser", {
            id: this.userInfo.id,
            sex: this.formEdit.sex,
            username: this.formEdit.username,
            intro: this.formEdit.intro,
            success: () => {
              this.$router.push("/user/addessay")
            }
          })
          this.$Message.success('Success!')
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    editReset (name) {
      this.$refs[name].resetFields()
    },
    setPwdSubmit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          console.log(this.userInfo.id, this.formSetPwd.oldPassword, this.formSetPwd.newPassword)
          this.$store.commit("switchLoading", !0)
          this.$store.dispatch("user/setPassword", {
            userId: this.userInfo.id,
            oldPassword: this.formSetPwd.oldPassword,
            newPassword: this.formSetPwd.newPassword,
            success: () => {
              this.$router.push("/user/addessay")
            }
          })
        } else {
          this.$Message.error('Fail!')
        }
      })
    },
    setPwdReset (name) {
      this.$refs[name].resetFields()
    },
    uploadBefore (aa) {
      console.log(aa)
    },
    uploadError () {
      this.$Notice.error({ title: '头像上传错误' })
    },
    uploadSuccess (response, file, fileList) {
      console.dir(response)
      console.dir(file)
      console.dir(fileList)
    }
  }
}
</script>
<style scoped>
.userInfo{
    margin: 0 auto;
}
.userInfoWrap{
    display: flex;
    justify-content: center;
}
.editInfo,.fixPwd{
    display: flex;
    justify-content: center;
}
.userInfoWrap .right{
    display: flex;
    flex-wrap: wrap-reverse;
    margin-left:15px;
}
.userInfoWrap .right .btn{
    margin-right: 15px;
}
.userInfoWrap .line{
    margin-top:10px;
}
.userInfoWrap .line.avatar{
    text-align: center;
}
.userInfoWrap .line:not(.avatar) span:first-child{
    margin-right: 10px;
    display: inline-block;
    width: 80px;
    text-align: right;
}
.editInfo .editBtnWrap .btn{
  margin-right:15px;
}
.editInfo .ivu-upload{
  margin-left: 10px;
}
.editInfo .avatarItem{
  display: flex;
}
.editInfo .avatar{
  max-width: 40px;
}
.editInfo .uploadAvatar{
  margin-left: 10px;
  flex-shrink: 1;
  flex-shrink: 1;
}
</style>
