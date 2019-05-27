<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="evaluate">
        <div class="evaluate-btn flex-row-around">
          <div v-for="(item,index) in BtnItems" :key="index" class="s-tab" :class="{ active: changeBtn === index}" @click="btnClicked(index)">
            {{ item.text }}
          </div>
        </div>
        <div class="evaluate-rate">
          <yd-cell-item>
            <yd-rate slot="left" v-model="rate" color="#E2E2E2" active-color="#FED500" size="0.25rem"></yd-rate>
          </yd-cell-item>
        </div>
        <!--<div class="flex-row-around evaluate-tags">-->
          <!--<div class="tags">-->
            <!--<div>课程通俗易懂</div>-->
            <!--<div>满足企业需求</div>-->
          <!--</div>-->
        <!--</div>-->
        <div class="evaluate-text">
          <textarea draggable="false" v-model="evaluateText" placeholder="写下你的学习心得或对讲师的评价吧"></textarea>
        </div>
        <div>
          <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none"/>
          <div class="upload_warp_text clearfix">
            <div class="input-click fl" @click="fileClick" >+</div>
            <div class="" v-show="imgList.length!=0" >
              <div class="upload_warp_img_div fl" v-for="(item,index) of imgList" :key="index">
                <div class="upload_warp_img_div_top" >
                  <img src="../../../assets/icon/close.png" class="upload_warp_img_div_del" @click="fileDel(index)">
                </div>
                <img :src="item.file.src">
              </div>
            </div>
          </div>
        </div>
        <div class="evaluate-sub">
          <div class="btn-border" @click="SubEvaluate">提交</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../../views/navbar/navbar'
import TipsTools from '../../../common/TipsTools'
let lib = new TipsTools()
export default {
  name: 'Evaluate',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '评价讲师',
      BtnItems: [
        {text: '课程完成'},
        {text: '讲师未到'}
      ],
      changeBtn: 0,
      rate: 5,
      evaluateText: '',
      imgList: [],
      imgListempImgs: []
    }
  },
  computed: {
    getOrderId () {
      return this.$route.params.orderId
    }
  },
  methods: {
    fileClick () {
      document.getElementById('upload_file').click()
    },
    fileChange (el) {
      if (!el.target.files[0].size) return
      this.fileList(el.target.files)
      el.target.value = ''
    },
    fileList (files) {
      for (let i = 0; i < files.length; i++) {
        this.fileAdd(files[i])
      }
    },
    fileAdd (file) {
      if (this.limit !== undefined) this.limit--
      if (this.limit !== undefined && this.limit < 0) return
      this.size = this.size + file.size
      let reader = new FileReader()
      reader.vue = this
      reader.readAsDataURL(file)
      reader.onload = function () {
        file.src = this.result
        this.vue.imgList.push({
          file
        })
      }
    },
    fileDel (index) {
      // this.size = this.size - this.imgList[index].file.size
      this.imgList.splice(index, 1)
      if (this.limit !== undefined) this.limit = 6 - this.imgList.length
    },
    dragenter (el) {
      el.stopPropagation()
      el.preventDefault()
    },
    dragover (el) {
      el.stopPropagation()
      el.preventDefault()
    },
    drop (el) {
      el.stopPropagation()
      el.preventDefault()
      this.fileList(el.dataTransfer.files)
    },
    btnClicked (index) {
      this.changeBtn = index
    },
    SubEvaluate () {
      let tempImgs = []
      for (let i = 0; i < this.imgList.length; i++) {
        tempImgs.push(this.imgList[i].file.src)
      }
      this.imgListempImgs = tempImgs
      let myJSON = JSON.stringify(this.imgListempImgs)
      myJSON = myJSON.replace('data:image/png;base64,', '')
      myJSON = myJSON.replace('data:image/jpeg;base64,', '')
      let _this = this
      let formData = new FormData()
      formData.append('type', 1)
      formData.append('orderId', _this.getOrderId)
      formData.append('result', _this.changeBtn + 1)
      formData.append('score', _this.rate)
      formData.append('tags', '')
      formData.append('content', _this.evaluateText)
      formData.append('photo', myJSON)
      _this.$_HTTPData.getAppraise(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          lib.MessageAlert_Success(res.message)
        } else {
          lib.MessageAlert_None(res.message)
        }
      })
    }
  },
  mounted () {}
}
</script>

<style scoped>
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;}
  .evaluate{padding: 0 0.2rem;}
  .evaluate-btn{padding: 0.3rem 0;}
  .evaluate-btn div{width:1.21rem;height:0.43rem;border-radius:0.05rem;border:0.01rem solid rgba(249,91,64,1);font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;line-height: 0.43rem;text-align: center;}
  .evaluate-rate{padding-left: 0.9rem;}
  .evaluate-text{padding-bottom: 0.2rem;padding-top: 0.3rem;}
  .evaluate-text textarea{width:3.54rem;height:1.4rem;border-radius:0.05rem;border:0.01rem solid rgba(249,91,64,1);padding: 0.19rem 0.21rem;font-size:0.14rem;
    font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .evaluate-sub{padding-top: 1.2rem;padding-bottom: 0.9rem;}
  .active{background: rgba(249,91,64,1);color: #fff;}
  .upload_warp_img_div_del {position: absolute;top: 0.05rem;width: 0.1rem;right: 0.05rem;}
  .upload_warp_img_div img {max-width: 100%;max-height: 100%;vertical-align: middle;}
  .upload_warp_img_div {position: relative;height: 0.86rem;width: 0.86rem;margin: 0 0 0.05rem 0.1rem;float: left;line-height: 0.7rem;display: table-cell;text-align: center;background-color: #eee;cursor: pointer;}
  .upload_warp_img {border-top: 1px solid #D2D2D2;padding-top: 0.1rem;overflow: hidden}
  .upload_warp {margin: 5px;}
  .upload_warp_text .input-click{width: 0.86rem;height: 0.86rem;background:rgba(232,232,232,1);border-radius: 0.05rem;text-align: center;font-size: 0.5rem;line-height: 0.86rem;color: #C8C8C9;}
  .evaluate-tags{padding-top: 0.2rem;}
  .evaluate-tags .tags div{font-size: 0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);border: 0.01rem solid rgba(249,91,64,1);margin-bottom: 0.2rem;padding: 0.1rem 0.2rem;}
</style>
