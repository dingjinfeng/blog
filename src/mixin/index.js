import axios from '@/api/networkAxios'

export var methods = {
  createImgAxios (imgId) {
    return () => axios.get('/user/getImgByImgId', { imgId })
  },
  // imgIds 请求的图片id
  // 请求一张图片    参数类型:imgId
  // 并发请求多张图片 参数类型:[imgId,imgId..]
  // catch
  async getImg (imgIds) {
    var funs = []

    if (imgIds instanceof Array) {
      funs = imgIds.map(item => this.createImgAxios(item))
    } else {
      funs.push(this.createImgAxios(imgIds))
    }
    var aa = await axios.all(funs)
      .then(axios.spread(function (acct, perms) {
        console.log("axios.spread")
        console.log(acct, perms)
        // vars.map(item => {
        //   this[item] = process.env.VUE_APP_serveAddress + process.env.VUE_APP_imagesDir + item
        // })
      }))
      // .then((res) => {
      //   console.log("axios.all")
      //   console.log("3123", res)
      //   return Promise.resolve("123")
      // }, () => { })
    return aa
  }
}
