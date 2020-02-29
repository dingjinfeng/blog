import axios from './networkAxios'

export var computed = {
  async getImg (param) {
    await axios.get('/user/getImgByImgId', {
      imgId: param.imgId
    }).then(res => {
      return res
    })
  }
}