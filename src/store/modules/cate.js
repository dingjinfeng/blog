import cateApi from '@/api/cateApi'
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
  getCates ({ commit, state }, param) {
    cateApi.getCatesByUserId(param).then(function (response) {
      console.log('getEaaaaaa...')
      var data = response.data
      if (data.flag) {
        data = data.res
        console.log("data", data)
        commit('setCateList', data.list)
        param.success(data.currentPage)
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
