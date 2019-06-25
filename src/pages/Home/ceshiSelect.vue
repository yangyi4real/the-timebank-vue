<template>
  <div class='body'>
    <div class='upload'>
      <img :src='imgUrl' alt=''>
      <input type='file' @change='uploadIMG' ref='file' placeholder='上传照片'>
    </div>
  </div>
</template>

<script>
export default {
  props: ['uploadUrl'],
  data () {
    return {
      picavalue: '',
      imgUrl: null
    }
  },
  methods: {
    uploadIMG (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.picavalue = files[0]
      if (this.picavalue.size / 1024 > 5000) {
        this.$message({
          message: '图片过大不支持上传',
          type: 'warning'
        })
      } else {
        this.imgPreview(this.picavalue)
      }
    },
    imgPreview (file, callback) {
      let self = this
      if (!file || !window.FileReader) return
      if (/^image/.test(file.type)) {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = function () {
          let result = this.result
          let img = new Image()
          img.src = result
          img.onload = function () {
            let data = self.compress(img)
            self.imgUrl = result
            let blob = self.dataURItoBlob(data)
            var formData = new FormData()
            formData.append('file', blob)
          }
        }
      }
    },
    // 压缩图片
    compress (img) {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      let width = img.width
      let height = img.height
      canvas.width = width
      canvas.height = height
      // 铺底色
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, width, height)
      let ndata = canvas.toDataURL('image/jpeg', 0.1)
      return ndata
    },
    // base64转成bolb对象
    dataURItoBlob (base64Data) {
      var byteString
      if (base64Data.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(base64Data.split(',')[1])
      } else {
        byteString = unescape(base64Data.split(',')[1])
      }
      var mimeString = base64Data
        .split(',')[0]
        .split(':')[1]
        .split(';')[0]
      var ia = new Uint8Array(byteString.length)
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i)
      }
      return new Blob([ia], { type: mimeString })
    }
  }
}
</script>

<style scoped>
  .upload {
    position: relative;
    width: 200px;
    height: 220px;}
  .cha {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 6px;
    border: 1px dashed #cccccc;
    overflow: hidden;
    box-sizing: border-box;}
  .layer {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 200px;
    background-color: rgba(0, 0, 0, 0.3);
    text-align: center;
    line-height: 200px;
    opacity: 0;
    color: #ffffff;
    border: none;
  }
  .del {
    position: absolute;
    bottom: 0;
    right: 0;
    opacity: 0;
    z-index: 2;
    border: none;
  }
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200px;
    border: none;
  }
  .cha:hover .layer,
  .cha:hover .del {
    opacity: 1;
  }
  .load {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 200px;
    border: 1px dashed #cccccc;}
  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .load::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: 80%;
    border-right: 1px solid #cccccc;
  }
  .load:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    height: 1px;
    border-top: 1px solid #cccccc;
  }
</style>
