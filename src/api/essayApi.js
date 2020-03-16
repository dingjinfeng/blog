import axios from './networkAxios'
export default {
  getEssayList (param) {
    return axios.post('/user/getEssayListByTime', {
      page: param.page,
      flag: param.flag,
      userId: param.userId,
      cateId: param.cateId
    })
  },
  getEssay (param) {
    return axios.post('/user/getEssayByEssayId', {
      essayId: param.essayId
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
  },
  deleteEssay (param) {
    return axios.post('/user/deleteEssay', {
      essayId: param.essayId
    })
  },
  getEssayByCateId (param) {
    return axios.post("/user/getEssaysByCateId", {
      cateId: param.cateId,
      flag: param.flag,
      page: param.page,
      userId: param.userId
    })
  },
  addEssayCate (param) {
    return axios.post("/user/addEssayCate", {
      cateId: param.cateId,
      essayId: param.essayId
    })
  },
  deleteEssayCate (param) {
    return axios.post("/user/deleteEssayCate", {
      cateId: param.cateId,
      essayId: param.essayId
    })
  }
}
