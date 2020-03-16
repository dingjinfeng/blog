<template>
  <Avatar :src="src"  icon="ios-person" size="large" />
</template>
<script>
export default {
  data () {
    return {
      src: ""
    }
  },
  props: ["imgId"],
  created () {
    console.log("avatardfadfadfadgafgdfgsfdgfgsf:.......", this.imgId)
    this.getImgSrc()
    console.log(this.src)
  },
  watch: {
    imgId (newValue, oldValue) {
      this.getImgSrc(newValue)
    }
  },
  methods: {
    getImgSrc () {
      // <avatar :imgId="1" />
      // <avatar :imgId="[1,2,3]" />
      // this.getImg([this.imgId, 22, 23])
      //   .then(
      //     (res) => {
      //    res 是数组
      //       console.dir(res)
      //     }
      //   )
      console.log("getImgSrcjdhfjkahjkdhfjhajsdhfjhajkhdjfhaj")
      this.getImg(this.imgId)
        .then(
          (res) => {
            console.log(res)
            console.log("ddddddd========", res)
            this.src = res
          }
        )
    }
  }
}
</script>
