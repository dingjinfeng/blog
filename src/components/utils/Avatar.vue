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
  props: {
    imgId: {
      type: Number,
      requirexd: !0
    }
  },
  created () {
    this.getImgSrc()
  },
  methods: {
    getImgSrc () {
      this.getImg(this.imgId)
        .then(
          (res) => {
            console.log("this.getImg(this.imgId)===resolve")
            console.dir(res)
          },
          (res) => {
            console.log("this.getImg(this.imgId)===reject")
            console.dir(res)
          }
        )
    }
  }
}
</script>
