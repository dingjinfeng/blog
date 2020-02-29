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
    console.log('getEssays....')
    essayApi.getEssayList(param).then(function (response) {
      console.log('getEaaaaaa...')
      var data = response.data
      if (data.flag) {
        data = data.res
        console.log(data.list)
        commit('setEssayList', data.list)
        param.success(data.currentPage)
      } else {
        ViewUI.Message.error(data.info)
      }
    })
  },
  getEssayListByUserId ({ commit, state }, param) {
    essayApi.getEssayListByUserId(param).then(function (response) {
      console.log('getEaaaaaa...')
      var data = response.data
      if (data.flag) {
        data = data.res
        commit('setEssayList', data.list)
        param.success(data.currentPage)
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
    console.log('set.....')
    console.dir(essayList)
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
