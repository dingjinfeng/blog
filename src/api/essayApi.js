import axios from './networkAxios'
export default {
  getEssayList (param) {
    return axios.post('/user/getEssayListByTime', {
      page: param.page,
      flag: param.flag,
      userId: param.userId
    })
  },
  addEssay (param) {
    return axios.post('/user/addEssay', {
      userId: param.userId,
      oldCateId: param.oldCateId,
      newCateName: param.newCateName,
      title: param.title,
      msg: param.msg,
      htmlMsg: param.htmlMsg
    })
  },
  getEssayListByUserId (param) {
    return axios.post('/user/getEssaysByUserIdByTime', {
      page: param.page,
      userId: param.userId,
      flag: param.flag
    })
  }
}
