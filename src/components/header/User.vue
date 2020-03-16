<template>
  <div id="user">
    <Dropdown trigger="click">
      <avatar :imgId="userInfo.imgid"/>
      <Button type="primary">
          <span>个人中心【{{userInfo.username}}】</span>
          <Icon type="ios-arrow-down"></Icon>
      </Button>
      <DropdownMenu slot="list">
          <div @click="goUser('1')"><DropdownItem>增加博文</DropdownItem></div>
          <div @click="goUser('2')"><DropdownItem>博客管理</DropdownItem></div>
          <div @click="goUser('3')"><DropdownItem>标签管理</DropdownItem></div>
          <div @click="goUser('4')"><DropdownItem>个人资料</DropdownItem></div>
          <div ><DropdownItem>活跃值:{{userInfo.point}}</DropdownItem></div>
          <div @click="userExit()"><DropdownItem>退出</DropdownItem></div>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import avatar from '@/components/utils/Avatar'

export default {
  components: {
    avatar
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  methods: {
    goUser (current) {
      let path = ''
      switch (current) {
        case '4':
          path = 'userinfo'
          break
        case '1':
          path = 'addessay'
          break
        case '2':
          path = 'blogmanagement'
          break
        case '3':
          path = 'catemanagement'
          break
        default:
          path = 'addessay'
      }
      this.$router.push({ path: `/user/${path}` })
    },
    userExit () {
      this.$store.commit("user/reset")
      this.$store.commit("essay/reset")
      this.$store.dispatch("user/getEssayList", {
        page: 1,
        flag: 1,
        userId: 0,
        success: () => {
          this.$route.push({ path: "/" })
        }
      })
    }
  }
}
</script>
<style scoped>
#User .ivu-dropdown-menu,
#User .ivu-dropdown-menu a{
  text-align: center
}
</style>
