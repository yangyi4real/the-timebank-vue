<template>
  <div class="body">
    <div class="navbar">
      <div class="left-btn">
      </div>
      <div class="item title">
        讲师认证
      </div>
    </div>
    <div class="wapper">
      <div class="basedata-main">
        <div class="basedata-list">
          <div class="flex-row-between">
            <div class="basedata-list-left">认证状态</div>
            <div>
              <span class="text-primary" v-if="this.listData.authStatus === 0 || this.listData.authStatus === null">未认证</span>
              <span class="text-primary" v-if="this.listData.authStatus === 1">已认证</span><i class="iconfont iconjiantou"></i>
            </div>
          </div>
          <div class="tips">认证后将可存储时间并开始约课</div>
        </div>
        <div class="basedata-list">
          <div class="flex-row-between">
            <div class="basedata-list-left">认证金额</div>
            <div>
              <label>300.00元</label>
            </div>
          </div>
          <div class="tips">取消认证时，认证费用将退还给您</div>
        </div>
        <div class="basedata-list flex-row-between">
          <div class="basedata-list-left">姓名</div>
          <div>
            <input type="text" placeholder="请输入真实姓名" v-model="name"/>
          </div>
        </div>
        <div class="basedata-list flex-row-between">
          <div class="basedata-list-left">身份证号</div>
          <div>
            <input type="text" placeholder="请输入身份证号" v-model="IdNumber"/>
          </div>
        </div>
        <div class="basedata-list">
          <input @change="fileChange($event)" type="file" id="upload_file" multiple style="display: none"/>
          <div class="flex-row-between">
            <div class="basedata-list-left">资质证书</div>
            <div @click="fileClick" class="upload_warp_text">
              已选中{{imgList.length}}张，最多上传<span class="imgNumber"> 9</span> 张图片
            </div>
          </div>
          <div class="upload_warp" style="border: 1px solid white;">
            <div class="upload_warp_img" v-show="imgList.length!=0" >
              <div class="upload_warp_img_div" v-for="(item,index) of imgList" :key="index">
                <div class="upload_warp_img_div_top" >
                  <img src="../../../../assets/icon/close.png" class="upload_warp_img_div_del" @click="fileDel(index)">
                </div>
                <img :src="item.file.src">
              </div>
            </div>
          </div>
        </div>
        <div class="basedata-list" style="border: 0">
          <input @change="fileChanges($event)" type="file" id="upload_file2" multiple style="display: none"/>
          <div class="flex-row-between">
            <div class="basedata-list-left">授课照片</div>
            <div @click="fileClick2" class="upload_warp_text">
              已选中{{imgList2.length}}张，最多上传<span class="imgNumber"> 3</span> 张图片
            </div>
          </div>
          <div class="upload_warp" style="border: 1px solid white;">
            <div class="upload_warp_img" v-show="imgList2.length!=0" >
              <div class="upload_warp_img_div" v-for="(item,index) of imgList2" :key="index">
                <div class="upload_warp_img_div_top" >
                  <img src="../../../../assets/icon/close.png" class="upload_warp_img_div_del" @click="fileDel2(index)">
                </div>
                <img :src="item.file.src">
              </div>
            </div>
          </div>
        </div>
      </div>
      <p class="text-center main-color tips-p">以上信息作为平台审核认证讲师资格使用</p>
      <div class="authentication-btn">
        <div class="btn-border-black" @click="pushClick" v-if="this.listData.authStatus === 0 || this.listData.authStatus === null">确定</div>
        <div class="btn-border-black" @click="pushCancelClick" v-if="this.listData.authStatus === 0 || this.listData.authStatus === null">取消</div>
        <div class="btn-border-black" @click="cancelClick" v-if="this.listData.authStatus === 1">取消认证</div>
      </div>
    </div>
  </div>
</template>

<script>

import TipsTools from '../../../../common/TipsTools'
let lib = new TipsTools()

export default {
  name: 'Authentication',
  components: {},
  data () {
    return {
      btnShow: true,
      name: '',
      IdNumber: '',
      imgList: [],
      imgList2: [],
      itemList: [],
      imgListempImgs: [],
      imgListempImgs2: [],
      size: 0,
      limit: 9,
      limit2: 3,
      listData: []
    }
  },
  created () {},
  computed: {
  },
  mounted () {
    this.loadData()
  },
  methods: {
    fileClick () {
      document.getElementById('upload_file').click()
    },
    fileClick2 () {
      document.getElementById('upload_file2').click()
    },
    fileChange (el) {
      if (!el.target.files[0].size) return
      this.fileList(el.target.files)
      el.target.value = ''
    },
    fileChanges (el) {
      if (!el.target.files[0].size) return
      this.fileList2(el.target.files)
      el.target.value = ''
    },
    fileList (files) {
      for (let i = 0; i < files.length; i++) {
        this.fileAdd(files[i])
      }
    },
    fileList2 (files) {
      for (let i = 0; i < files.length; i++) {
        this.fileAdd2(files[i])
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
    fileAdd2 (file) {
      if (this.limit2 !== undefined) this.limit2--
      if (this.limit2 !== undefined && this.limit2 < 0) return
      this.size = this.size + file.size
      let reader = new FileReader()
      reader.vue = this
      reader.readAsDataURL(file)
      reader.onload = function () {
        file.src = this.result
        this.vue.imgList2.push({
          file
        })
      }
    },
    fileDel (index) {
      // this.size = this.size - this.imgList[index].file.size
      this.imgList.splice(index, 1)
      if (this.limit !== undefined) this.limit = 6 - this.imgList.length
    },
    fileDel2 (index) {
      // this.size = this.size - this.imgList2[index].file.size
      this.imgList2.splice(index, 1)
      if (this.limit2 !== undefined) this.limit2 = 6 - this.imgList2.length
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
      this.fileList2(el.dataTransfer.files)
    },
    /**
     * 验证输入框的值
     * @return {boolean}
     */
    checkInputValue () {
      // 判断输入手机号是手机号码
      if (this.name === '') {
        lib.MessageAlert_Error('请输入正确姓名')
        return false
      }
      if (this.IdNumber === '') {
        lib.MessageAlert_Error('请输入正确身份证号码')
        return false
      }
      return true
    },
    /**
     * 点击确定
     */
    pushClick () {
      // if (!this.checkInputValue()) { return }
      let tempImgs = []
      let tempImgs2 = []
      for (let i = 0; i < this.imgList.length; i++) {
        tempImgs.push(this.imgList[i].file.src)
      }
      this.imgListempImgs = tempImgs
      let myJSON = JSON.stringify(this.imgListempImgs)
      myJSON = myJSON.replace('data:image/png;base64,', '')
      myJSON = myJSON.replace('data:image/jpeg;base64,', '')
      for (let i = 0; i < this.imgList2.length; i++) {
        tempImgs2.push(this.imgList2[i].file.src)
      }
      this.imgListempImgs2 = tempImgs2
      let myJSONT = JSON.stringify(this.imgListempImgs2)
      myJSONT = myJSONT.replace('data:image/png;base64,', '')
      myJSONT = myJSONT.replace('data:image/jpeg;base64,', '')
      let _this = this
      let formData = new FormData()
      formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
      formData.append('name', _this.name)
      formData.append('IdNumber', _this.IdNumber)
      formData.append('credentials', myJSON)
      formData.append('classPhotos', myJSONT)
      formData.append('traditional', true)
      _this.$_HTTPData.getLectureAuth(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          lib.MessageAlert_Success(res.message)
          _this.$router.push('/personal/lecturer-payment')
        } else {
          lib.MessageAlert_Error(res.message)
        }
      })
    },
    pushCancelClick () {
      this.$router.push('/calendar/index')
    },
    loadData () {
      let _this = this
      let formData = new FormData()
      formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
      formData.append('type', 1)
      _this.$_HTTPData.getMyInfo(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.listData = res.result
          console.log(res.result)
        } else {
          console.log(res.message)
        }
      })
    },
    /**
     * 点击取消认证
     */
    cancelClick () {
      let _this = this
      this.$dialog.confirm({
        title: '<p style="text-align: center;font-size:0.19rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);padding-bottom: 0.1rem">确定取消认证？</p>',
        mes: '<p style="text-align: center;font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);line-height: 0.22rem!important;">取消后，未来已存储时间将全部失效，并且不可继续约课</p>',
        opts: [
          {
            txt: '取消',
            color: '#ccc',
            callback: () => {}
          },
          {
            txt: '确定',
            color: true,
            callback: () => {
              _this.$router.push('/personal/information/authentication')
            }
          }
        ]
      })
    }
  },
  watch: {}
}
</script>

<style scoped>
  input:focus {outline: none;}
  .tips{font-size:0.13rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(249,91,64,1);padding-top: 0.08rem}
  .tips-p{font-size:13px;font-family:PingFangSC-Regular;font-weight:400;padding-top: 0.1rem;}
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;}
  .basedata-main{margin: 0 0.2rem;padding-top: 0.2rem;}
  .basedata-main .basedata-list{border-bottom: 0.01rem solid #E8E8E8;padding: 0.2rem 0;}
  .basedata-list-left{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .basedata-list .text-primary{border-radius:0.03rem;border:0.01rem solid rgba(249,91,64,1);padding: 0 0.1rem;font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .basedata-list label{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .basedata-main .basedata-list i{padding-left: 0.15rem;}
  .basedata-main .basedata-list input{border: 0;outline: none;background-color: rgba(0, 0, 0, 0);font-size: 0.16rem;text-align: right;
    font-family:PingFangSC-Regular;font-weight:400;}
  .authentication-btn{padding: 0.5rem 0;}
  .authentication-btn div{margin-top: 0.3rem}
  .upload_warp_img_div_del {position: absolute;top: 0.05rem;width: 0.1rem;right: 0.05rem;}
  .upload_warp_img_div img {max-width: 100%;max-height: 100%;vertical-align: middle;}
  .upload_warp_img_div {position: relative;height: 0.7rem;width: 0.7rem;margin: 0 0.1rem 0.05rem 0;float: left;line-height: 0.7rem;display: table-cell;text-align: center;background-color: #eee;cursor: pointer;}
  .upload_warp_img {border-top: 1px solid #D2D2D2;padding-top: 0.1rem;overflow: hidden}
  .upload_warp {margin: 5px;}
  .upload_warp_text{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(167,167,167,1);}
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 0.66rem;
    z-index: 10;
    text-align: center;
    background: #f5f5f5;
  }
  .navbar .item {
    min-width: 0.2rem;
  }
  .navbar .left-btn {
    text-align: left;
    margin-left: 0.1rem;
    padding: 0.1rem 0;
    user-select: none;
    color: black;
    font-size: 0.18rem;
  }
  .navbar .left-btn:active {
    color: #dcbc6c;
  }
  .navbar .title {
    padding: 0.2rem 0;
    user-select: none;
    color: black;
    font-size: 0.2rem;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    flex: 1;
    text-align: center;
  }
  .navbar .right-btn {
    width: 0.6rem;
    margin-right: 0.1rem;
    padding: 0.12rem 0 0.08rem 0;
    user-select: none;
    color: black;
    font-size: 0.15rem;
    text-align: right;
  }
  .navbar .right-btn:active {
    color: #dcbc6c;
  }
</style>
