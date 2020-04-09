import commentApi from '@/api/commentApi'
import ViewUI from 'view-design'

const state = {
  // EssayList模块样式: 0主页文章列表  1个人中心 2 其他用户文章列表
  commentList: []
}

// getters
const getters = {
}

// actions
const actions = {
  getCommentHistorys ({ commit, state }, param) {
    commentApi.getCommentHistorys(param).then(function (response) {
      var data = response.data
      if (data.islogin) {
        if (data.flag) {
          data = data.res
          param.success(data)
        } else {
          ViewUI.Message.error(data.info)
        }
      } else {
        param.fail()
      }
    })
  },
  getCommentWithoutCheck ({ commit, state }, param) {
    commentApi.getCommentWithoutCheck(param).then(function (response) {
      var data = response.data
      if (data.islogin) {
        if (data.flag) {
          data = data.res
          param.success(data)
        } else {
          ViewUI.Message.error(data.info)
        }
      } else {
        param.fail()
      }
    })
  }
}

// mutations
const mutations = {
  // setCateList (state, cateList) {
  //   state.cateList = cateList
  // },
  // setUserId (state, userId) {
  //   state.userId = userId
  // },
  // reset (state) {
  //   state.cateList = []
  // }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
