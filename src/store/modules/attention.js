import attentionApi from '@/api/attentionApi'
import ViewUI from 'view-design'

const state = {
  // EssayList模块样式: 0主页文章列表  1个人中心 2 其他用户文章列表
  cateList: [],
  userId: 0
}

// getters
const getters = {
}

// actions
const actions = {
  getAttentions ({ commit, state }, param) {
    attentionApi.getAttentions(param).then(function (response) {
      var data = response.data
      if (data.flag) {
        data = data.res
        console.log("getAttention", data)
        param.success(data)
      } else {
        ViewUI.Message.error(data.info)
      }
    })
  },
  getAttention ({ commit, state }, param) {
    attentionApi.getAttention(param).then(function (response) {
      var data = response.data
      if (data.flag) {
        data = data.res
        console.log("getAttention", data)
        param.success(data)
      } else {
        ViewUI.Message.error(data.info)
      }
    })
  },
  addAttention ({ commit, state }, param) {
    attentionApi.addAttention(param).then(function (response) {
      var data = response.data
      if (data.flag) {
        data = data.res
        console.log("addAttention", data)
        param.success(data)
      } else {
        ViewUI.Message.error(data.info)
      }
    })
  },
  deleteAttention ({ commit, state }, param) {
    attentionApi.deleteAttention(param).then(function (response) {
      var data = response.data
      if (data.flag) {
        data = data.res
        console.log("deleteAttention", data)
        param.success(data)
      } else {
        ViewUI.Message.error(data.info)
      }
    })
  }
}

// mutations
const mutations = {
  setCateList (state, cateList) {
    state.cateList = cateList
  },
  setUserId (state, userId) {
    state.userId = userId
  },
  reset (state) {
    state.cateList = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
