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
  getCommentsByEssayId ({ commit, state }, param) {
    commentApi.getCommentsByEssayId(param).then(function (response) {
      var data = response.data
      if (data.flag) {
        data = data.res
        console.log("data", data)
        param.success(data)
      } else {
        ViewUI.Message.error(data.info)
      }
    })
  },
  getCommentsByUserId ({ commit, state }, param) {
    commentApi.getCommentsByUserId(param).then(function (response) {
      var data = response.data
      if (data.flag) {
        data = data.res
        console.log("data", data)
        param.success(data.list)
      } else {
        ViewUI.Message.error(data.info)
      }
    })
  },
  addComments ({ commit, state }, param) {
    commentApi.addComments(param).then(function (response) {
      var data = response.data
      console.log("data", data)
      if (data.flag) {
        data = data.res
        param.success(data)
      } else {
        ViewUI.Message.error(data.info)
      }
    })
  },
  deleteComment ({ commit, state }, param) {
    commentApi.deleteComment(param).then(function (response) {
      var data = response.data
      console.log("data", data)
      if (data.flag) {
        data = data.res
        param.success(data)
      } else {
        ViewUI.Message.error(data.info)
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