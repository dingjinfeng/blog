import axios from "./networkAxios"

export default {
  getCatesByUserId (param) {
    return axios.post("/user/getCatesByUserId", {
      userId: param.userId,
      page: param.page
    })
  }
}
