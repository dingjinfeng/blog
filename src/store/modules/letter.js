import letterApi from '@/api/letterApi'
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
  getLetterList ({ commit, state }, param) {
    letterApi.getLetterByUserId(param).then(function (response) {
      var data = response.data
      if (data.flag) {
        data = data.res
        console.log("data", data.list)
        param.success(data)
      } else {
        ViewUI.Message.error(data.info)
      }
    })
  },
  getLetter ({ commit, state }, param) {
    letterApi.getLetter(param).then(function (response) {
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
  addLetter ({ coaddLettermmit, state }, param) {
    letterApi.addLetter(param).then(function (response) {
      var data = response.data
      if (data.flag) {
        data = data.res
        console.log("data", data)
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