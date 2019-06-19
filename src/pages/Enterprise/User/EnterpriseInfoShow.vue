<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="CoData">
        <div class="CoData-list flex-row-between">
          <div class="CoData-list-left">企业头像</div>
          <div class="CoData-list-right">
            <!--<div class="user-icon">-->
              <!--<img :src="profile" alt="">-->
              <!--<input type="file" @change="getProfile" ref="file" placeholder="上传照片">-->
            <!--</div>-->
            <div class="user-icon flex-row-between" style="width: 2rem;">
              <div><input type='file' @change='uploadIMG' ref='file' placeholder='上传照片'></div>
              <div><img :src='imgUrl' alt=''><i class="iconfont iconjiantou"></i></div>
            </div>
          </div>
        </div>
        <div class="CoData-list flex-row-between">
          <div class="CoData-list-left">企业名称</div>
          <div class="CoData-list-right"><input type="text" v-model="name" placeholder="请填写真实名称" v-on:input="inputValue"/></div>
        </div>
        <div class="CoData-list flex-row-between">
          <div class="CoData-list-left">简称</div>
          <div class="CoData-list-right"><input type="text" v-model="shortName" placeholder="请填写简称" v-on:input="inputValue"/></div>
        </div>
        <div class="CoData-list flex-row-between">
          <div class="CoData-list-left">注册时间</div>
          <div class="CoData-list-right flex-row-between">
            <div>
              <yd-cell-group>
                <yd-cell-item>
                  <yd-datetime type="month" v-model="foundingTime" slot="right" start-date="1920-01" :end-date="nowTime" v-on:input="inputValue"></yd-datetime>
                </yd-cell-item>
              </yd-cell-group>
            </div>
            <div><i class="iconfont iconjiantou"></i></div>
          </div>
        </div>
        <div class="CoData-list flex-row-between">
          <div class="CoData-list-left">地区</div>
          <div class="CoData-list-right flex-row-between">
            <div>
              <yd-cell-group>
                <yd-cell-item>
                  <input slot="right" type="text" @click.stop="show1 = true" v-model="location" readonly v-on:input="inputValue">
                </yd-cell-item>
              </yd-cell-group>

              <yd-cityselect v-model="show1" :callback="result1" :items="district"></yd-cityselect>
            </div>
            <div><i class="iconfont iconjiantou"></i></div>
          </div>
        </div>
        <div class="CoData-list flex-row-between">
          <div class="CoData-list-left">详细地址</div>
          <div class="CoData-list-right"><input type="text" v-model="address" placeholder="请填写详细地址" v-on:input="inputValue"/></div>
        </div>
        <div class="CoData-list flex-row-between">
          <div class="CoData-list-left">联系人</div>
          <div class="CoData-list-right"><input type="text" v-model="linkman" placeholder="请填写真实名称" v-on:input="inputValue"/></div>
        </div>
        <div class="CoData-list flex-row-between">
          <div class="CoData-list-left">联系方式</div>
          <div class="CoData-list-right"><input type="text" v-model="phone" placeholder="请填写有效联系方式" v-on:input="inputValue"/></div>
        </div>
        <div class="CoData-list flex-row-between">
          <div class="CoData-list-left">企业邮箱</div>
          <div class="CoData-list-right"><input type="text" v-model="email" placeholder="请填写正确的企业邮箱" v-on:input="inputValue"/></div>
        </div>
        <div class="CoData-list flex-row-between">
          <div class="CoData-list-left">上传营业执照</div>
          <div class="CoData-list-right">
            <!--<div class="user-icon">-->
              <!--<img :src="license" alt="">-->
              <!--<input type="file" @change="getLicense" ref="file" placeholder="上传照片">-->
            <!--</div>-->
            <div class="user-icon flex-row-between" style="width: 2rem;">
              <div><input type='file' @change='getLicense' ref='file' placeholder='上传照片'></div>
              <div><img :src='license' alt=''><i class="iconfont iconjiantou"></i></div>
            </div>
          </div>
        </div>
      </div>
        <div class="CoData-btn">
          <div @click="pushClick" :class="{ 'btn-border-opacity': inOperation, 'btn-border': operation}">保存</div>
        </div>
    </div>
  </div>
</template>

<script>
import AreaJson from '../../../common/areaCode'
import Navbar from '../../../views/navbar/navbar'
import TipsTools from '../../../common/TipsTools'
let lib = new TipsTools()
export default {
  name: 'EnterpriseInfoShow',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '企业信息',
      imgUrl: '',
      name: '',
      shortName: '',
      address: '',
      linkman: '',
      phone: '',
      email: '',
      foundingTime: '',
      areaValue: [],
      show1: false,
      location: '',
      license: '',
      district: AreaJson,
      inOperation: true, // 灰色按钮
      operation: false
    }
  },
  created () {
    this.nowTimes()
  },
  computed: {},
  mounted () {
    this.nowTimes()
    this.loadData()
  },
  methods: {
    loadData () {
      let _this = this
      let formData = new FormData()
      formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
      formData.append('type', 2)
      _this.$_HTTPData.getMyInfo(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.listData = res.result
          _this.name = res.result.name
          _this.imgUrl = res.result.photo
          _this.email = res.result.email
          _this.phone = res.result.phone
          _this.shortName = res.result.compangyShortName
          _this.foundingTime = res.result.createTime
          _this.location = res.result.location
          _this.address = res.result.address
          _this.linkman = res.result.contact
          _this.license = res.result.license
          console.log(res.result)
        } else {
          console.log(res.message)
        }
      })
    },
    // 上传头像
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
          console.log('********未压缩前的图片大小********')
          console.log(result.length)
          img.onload = function () {
            let data = self.compress(img)
            self.imgUrl = self.compress(img)
            let blob = self.dataURItoBlob(data)
            console.log('*******base64转blob对象******')
            console.log(blob)
            var formData = new FormData()
            formData.append('file', blob)
            console.log('********将blob对象转成formData对象********')
            console.log(formData.get('file'))
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
      console.log('*******压缩后的图片大小*******')
      console.log(ndata)
      console.log(ndata.length)
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
    },
    // 上传营业执照
    getLicense (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.picavalue = files[0]
      if (this.picavalue.size / 1024 > 5000) {
        this.$message({
          message: '图片过大不支持上传',
          type: 'warning'
        })
      } else {
        this.imgPreviews(this.picavalue)
      }
    },
    imgPreviews (file, callback) {
      let self = this
      if (!file || !window.FileReader) return
      if (/^image/.test(file.type)) {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = function () {
          let result = this.result
          let img = new Image()
          img.src = result
          console.log('********未压缩前的图片大小********')
          console.log(result.length)
          img.onload = function () {
            let data = self.compresss(img)
            self.license = result
            let blob = self.dataURItoBlob(data)
            console.log('*******base64转blob对象******')
            console.log(blob)
            var formData = new FormData()
            formData.append('file', blob)
            console.log('********将blob对象转成formData对象********')
            console.log(formData.get('file'))
          }
        }
      }
    },
    // 压缩图片
    compresss (img) {
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
      console.log('*******压缩后的图片大小*******')
      console.log(ndata)
      console.log(ndata.length)
      return ndata
    },
    // getLicense (e) {
    //   let _this = this
    //   let files = e.target.files[0]
    //   if (!e || !window.FileReader) return
    //   let reader = new FileReader()
    //   reader.readAsDataURL(files)
    //   reader.onloadend = function () {
    //     _this.license = this.result
    //   }
    // },
    /**
     * 验证输入框的值
     * @return {boolean}
     */
    checkInputValue () {
      if (this.name === '') {
        lib.MessageAlert_Error('请输入企业名称')
        return false
      }
      if (this.shortName === '') {
        lib.MessageAlert_Error('请输入企业简称')
        return false
      }
      if (this.foundingTime === '') {
        lib.MessageAlert_Error('请选择注册时间')
        return false
      }
      if (this.location === '') {
        lib.MessageAlert_Error('请选择地区')
        return false
      }
      if (this.address === '') {
        lib.MessageAlert_Error('请输入详细地址')
        return false
      }
      if (this.linkman === '') {
        lib.MessageAlert_Error('请输入姓名')
        return false
      }
      if (this.phone === '') {
        lib.MessageAlert_Error('请输入手机号')
        return false
      }
      if (this.email === '') {
        lib.MessageAlert_Error('请输入企业邮箱')
        return false
      }
      if (!this.$SaiLei.IsEmailNumber(this.email)) {
        lib.MessageAlert_Error('请输入正确的邮箱')
        return false
      }
      if (this.license === '') {
        lib.MessageAlert_Error('请上传营业执照')
        return false
      }
      if (this.imgUrl === '') {
        lib.MessageAlert_Error('请上传企业头像')
        return false
      }
      return true
    },
    result1 (ret) {
      this.location = `${ret.itemName1} ${ret.itemName2} ${ret.itemName3}`
      let temp = []
      temp.push(ret.itemValue1)
      temp.push(ret.itemValue2)
      temp.push(ret.itemValue3)
      this.areaValue = temp
    },
    // 计算当前日期
    timeFormate (timeStamp) {
      let year = new Date(timeStamp).getFullYear()
      let month = new Date(timeStamp).getMonth() + 1 < 10 ? '0' + (new Date(timeStamp).getMonth() + 1) : new Date(timeStamp).getMonth() + 1
      this.nowTime = year + '-' + month
    },
    nowTimes () {
      this.timeFormate(new Date())
      setInterval(this.nowTimes, 30 * 1000)
    },
    // 点击保存
    pushClick () {
      if (!this.checkInputValue()) { return }
      let myImg = this.imgUrl
      myImg = myImg.replace('data:image/png;base64,', '')
      myImg = myImg.replace('data:image/jpeg;base64,', '')
      if (this.imgUrl.search('http') !== -1) {
        console.log('11')
        let _this = this
        let formData = new FormData()
        formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
        // formData.append('profile', myImg)
        formData.append('name', _this.name)
        formData.append('shortName', _this.shortName)
        formData.append('foundingTime', _this.foundingTime)
        formData.append('location', _this.areaValue.length > 1 ? this.areaValue[1] : '')
        formData.append('address', _this.address)
        formData.append('linkman', _this.linkman)
        formData.append('phone', _this.phone)
        formData.append('email', _this.email)
        formData.append('license', _this.license)
        _this.$_HTTPData.getCompanyFillInfo(_this, formData, function (res) {
          if (res.code === 0 || res.code === '000') {
            lib.MessageAlert_None(res.message)
            _this.$router.push('/user/index')
          } else {
            lib.MessageAlert_None(res.message)
          }
        })
      } else if (this.areaValue.length === 0) {
        console.log('22')
        let _this = this
        let formData = new FormData()
        formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
        formData.append('profile', myImg)
        formData.append('name', _this.name)
        formData.append('shortName', _this.shortName)
        formData.append('foundingTime', _this.foundingTime)
        // formData.append('location', _this.areaValue.length > 1 ? this.areaValue[1] : '')
        formData.append('address', _this.address)
        formData.append('linkman', _this.linkman)
        formData.append('phone', _this.phone)
        formData.append('email', _this.email)
        formData.append('license', _this.license)
        _this.$_HTTPData.getCompanyFillInfo(_this, formData, function (res) {
          if (res.code === 0 || res.code === '000') {
            lib.MessageAlert_None(res.message)
            _this.$router.push('/user/index')
          } else {
            lib.MessageAlert_None(res.message)
          }
        })
      } else if (this.license.search('http') !== -1) {
        console.log('没上传营业执照')
        let _this = this
        let formData = new FormData()
        formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
        formData.append('profile', myImg)
        formData.append('name', _this.name)
        formData.append('shortName', _this.shortName)
        formData.append('foundingTime', _this.foundingTime)
        formData.append('location', _this.areaValue.length > 1 ? this.areaValue[1] : '')
        formData.append('address', _this.address)
        formData.append('linkman', _this.linkman)
        formData.append('phone', _this.phone)
        formData.append('email', _this.email)
        // formData.append('license', _this.license)
        _this.$_HTTPData.getCompanyFillInfo(_this, formData, function (res) {
          if (res.code === 0 || res.code === '000') {
            lib.MessageAlert_None(res.message)
            _this.$router.push('/user/index')
          } else {
            lib.MessageAlert_None(res.message)
          }
        })
      // } else if (this.license.indexOf('http') > -1 && this.areaValue.length === 0 && this.imgUrl.indexOf('http') > -1) {
      } else if (this.areaValue.length === 0 && this.license.search('http') !== -1) {
        console.log('没营业执照没地址')
        let _this = this
        let formData = new FormData()
        formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
        formData.append('profile', myImg)
        formData.append('name', _this.name)
        formData.append('shortName', _this.shortName)
        formData.append('foundingTime', _this.foundingTime)
        // formData.append('location', _this.areaValue.length > 1 ? this.areaValue[1] : '')
        formData.append('address', _this.address)
        formData.append('linkman', _this.linkman)
        formData.append('phone', _this.phone)
        formData.append('email', _this.email)
        // formData.append('license', _this.license)
        _this.$_HTTPData.getCompanyFillInfo(_this, formData, function (res) {
          if (res.code === 0 || res.code === '000') {
            lib.MessageAlert_None(res.message)
            _this.$router.push('/user/index')
          } else {
            lib.MessageAlert_None(res.message)
          }
        })
      }
      // else if (this.license.search('http') !== -1 > -1 && this.areaValue.length === 0) {
      //   let _this = this
      //   let formData = new FormData()
      //   formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
      //   formData.append('profile', myImg)
      //   formData.append('name', _this.name)
      //   formData.append('shortName', _this.shortName)
      //   formData.append('foundingTime', _this.foundingTime)
      //   // formData.append('location', _this.areaValue.length > 1 ? this.areaValue[1] : '')
      //   formData.append('address', _this.address)
      //   formData.append('linkman', _this.linkman)
      //   formData.append('phone', _this.phone)
      //   formData.append('email', _this.email)
      //   // formData.append('license', _this.license)
      //   _this.$_HTTPData.getCompanyFillInfo(_this, formData, function (res) {
      //     if (res.code === 0 || res.code === '000') {
      //       lib.MessageAlert_None(res.message)
      //       _this.$router.push('/user/index')
      //     } else {
      //       lib.MessageAlert_None(res.message)
      //     }
      //   })
      // }
      // else if (this.license.search('http') !== -1 > -1 && this.imgUrl.indexOf('http') > -1) {
      //   let _this = this
      //   let formData = new FormData()
      //   formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
      //   // formData.append('profile', myImg)
      //   formData.append('name', _this.name)
      //   formData.append('shortName', _this.shortName)
      //   formData.append('foundingTime', _this.foundingTime)
      //   formData.append('location', _this.areaValue.length > 1 ? this.areaValue[1] : '')
      //   formData.append('address', _this.address)
      //   formData.append('linkman', _this.linkman)
      //   formData.append('phone', _this.phone)
      //   formData.append('email', _this.email)
      //   // formData.append('license', _this.license)
      //   _this.$_HTTPData.getCompanyFillInfo(_this, formData, function (res) {
      //     if (res.code === 0 || res.code === '000') {
      //       lib.MessageAlert_None(res.message)
      //       _this.$router.push('/user/index')
      //     } else {
      //       lib.MessageAlert_None(res.message)
      //     }
      //   })
      // }
      // } else if (this.areaValue.length === 0 && this.imgUrl.indexOf('http') > -1) {
      //   let _this = this
      //   let formData = new FormData()
      //   formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
      //   // formData.append('profile', myImg)
      //   formData.append('name', _this.name)
      //   formData.append('shortName', _this.shortName)
      //   formData.append('foundingTime', _this.foundingTime)
      //   // formData.append('location', _this.areaValue.length > 1 ? this.areaValue[1] : '')
      //   formData.append('address', _this.address)
      //   formData.append('linkman', _this.linkman)
      //   formData.append('phone', _this.phone)
      //   formData.append('email', _this.email)
      //   formData.append('license', _this.license)
      //   _this.$_HTTPData.getCompanyFillInfo(_this, formData, function (res) {
      //     if (res.code === 0 || res.code === '000') {
      //       lib.MessageAlert_None(res.message)
      //       _this.$router.push('/user/index')
      //     } else {
      //       lib.MessageAlert_None(res.message)
      //     }
      //   })
      // }
    },
    inputValue () {
      if (this.CoName !== '' && this.CoAbbName !== '' && this.userName !== '' && this.CoEMail !== '' && this.registerDate !== '' && this.areaValue !== '') {
        this.inOperation = false
        this.operation = true
      } else {
        this.inOperation = true
        this.operation = false
      }
    }
  },
  watch: {
    inputValue () {
      if (this.CoName !== '' && this.CoAbbName !== '' && this.userName !== '' && this.userAddress !== '' && this.CoEMail !== '' && this.registerDate !== '' && this.areaValue !== '') {
        this.inOperation = false
        this.operation = true
      } else {
        this.inOperation = true
        this.operation = false
      }
    }
  }
}
</script>

<style scoped>
  input:focus {outline: none;}
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;}
  .CoData{padding-top: 0.35rem;margin: 0 0.2rem;}
  .CoData .CoData-list{border-bottom: 0.01rem solid #E8E8E8;line-height: 0.5rem;height: 0.5rem;}
  .CoData .CoData-list input{border: 0;outline: none;background-color: rgba(0, 0, 0, 0);font-size: 0.16rem;text-align: right;
    font-family:PingFangSC-Regular;font-weight:400;height: 0.4rem;line-height: 0.4rem;}
  .CoData .CoData-list .CoData-list-left{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .CoData-btn{padding: 0.85rem 0;}
  .user-icon{position: relative;overflow: hidden;}
  .user-icon input{position: absolute;top: 0.1rem;opacity: 0;-ms-filter: 'alpha(opacity=0)';z-index: 9;}
  .user-icon img{width:0.35rem;height:0.35rem;position: absolute;top: 0.08rem;right: 0.2rem}
</style>
