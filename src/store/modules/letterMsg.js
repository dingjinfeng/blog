import letterMsgApi from '@/api/letterMsgApi'
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
  switchFlag ({ commit, state }, param) {
    letterMsgApi.switchFlag(param).then(function (response) {
      var data = response.data
      if (data.flag) {
        param.success()
      } else {
        ViewUI.Message.error(data.info)
      }
    })
  },
  getLetterMsgList ({ commit, state }, param) {
    letterMsgApi.getLetterMsgList(param).then(function (response) {
      var data = response.data
      if (data.flag) {
        data = data.res
        console.log("getLetterMsgList", data)
        param.success(data)
      } else {
        ViewUI.Message.error(data.info)
      }
    })
  },
  addLetterMsg ({ commit, state }, param) {
    letterMsgApi.addLetterMsg(param).then(function (response) {
      var data = response.data
      if (data.flag) {
        data = data.res
        console.log("addLetterMsg", data)
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
