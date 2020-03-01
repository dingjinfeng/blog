import essayApi from '@/api/essayApi'
import ViewUI from 'view-design'

const state = {
  // EssayList模块样式: 0主页文章列表  1个人中心 2 其他用户文章列表
  essayListFrom: 0,
  essayList: []
}

// getters
const getters = {
}

// actions
const actions = {
  getEssayList ({ commit, state }, param) {
    console.log(param)
    essayApi.getEssayList(param).then(function (response) {
      var data = response.data
      if (data.flag) {
        data = data.res
        var list = param.isMore ? state.essayList.concat(data.list) : data.list
        commit('setEssayList', list)
        param.success(data.list)
      } else {
        ViewUI.Message.error(data.info)
      }
    })
  },
  getEssayListByUserId ({ commit, state }, param) {
    essayApi.getEssayListByUserId(param).then(function (response) {
      var data = response.data
      if (data.flag) {
        data = data.res
        var list = param.isMore ? state.essayList.concat(data.list) : data.list
        commit('setEssayList', list)
        param.success(data.list)
      } else {
        ViewUI.Message.error(data.info)
      }
    })
  },
  addEssay ({ commit, state }, param) {
    essayApi.addEssay(param).then(function (response) {
      console.log(response)
      var data = response.data
      if (data.flag) {
        console.log(data.res)
      } else {
        ViewUI.Message.error(data.info)
      }
    })
  }
}

// mutations
const mutations = {
  setEssayListFrom (state, essayListFrom) {
    state.essayListFrom = essayListFrom
  },
  setEssayList (state, essayList) {
    state.essayList = essayList
    console.dir(state.essayList)
  },
  reset (state) {
    state.essayListFrom = 0
    state.essayList = []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
