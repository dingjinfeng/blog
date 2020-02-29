import axios from './networkAxios'
export default {
  getEssayList (param) {
    return axios.post('/user/getEssayListByTime', {
      page: param.page,
      flag: param.flag,
      userId: param.userId
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
