<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="CoData">
        <div class="CoData-list flex-row-between">
          <div class="CoData-list-left">企业头像</div>
          <div class="CoData-list-right">
            <div class="user-icon">
              <img :src="profile" alt="">
              <input type="file" @change="getProfile" ref="file" placeholder="上传照片">
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
            <div class="user-icon">
              <img :src="license" alt="">
              <input type="file" @change="getLicense" ref="file" placeholder="上传照片">
            </div>
          </div>
        </div>
      </div>
        <div class="CoData-btn">
          <div @click="pushClick" :class="{ 'btn-border-opacity': inOperation, 'btn-border': operation}">提交</div>
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
  name: 'EnterpriseInfo',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '企业信息',
      profile: '',
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
  methods: {
    // 上传头像
    getProfile (e) {
      let _this = this
      let files = e.target.files[0]
      if (!e || !window.FileReader) return
      let reader = new FileReader()
      reader.readAsDataURL(files)
      reader.onloadend = function () {
        _this.profile = this.result
      }
    },
    // 上传营业执照
    getLicense (e) {
      let _this = this
      let files = e.target.files[0]
      if (!e || !window.FileReader) return
      let reader = new FileReader()
      reader.readAsDataURL(files)
      reader.onloadend = function () {
        _this.license = this.result
      }
    },
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
      if (this.license === '') {
        lib.MessageAlert_Error('请上传营业执照')
        return false
      }
      if (this.profile === '') {
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
    // 点击提交
    pushClick () {
      if (!this.checkInputValue()) { return }
      let _this = this
      let formData = new FormData()
      formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
      formData.append('profile', _this.profile)
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
        } else {
          lib.MessageAlert_None(res.message)
        }
      })
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
  mounted () {
    this.nowTimes()
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
    font-family:PingFangSC-Regular;font-weight:400;}
  .CoData .CoData-list .CoData-list-left{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .CoData-btn{padding: 0.85rem 0;}
  .user-icon{position: relative;overflow: hidden;}
  .user-icon input{position: absolute;top: 0;opacity: 0;-ms-filter: 'alpha(opacity=0)';}
  .user-icon img{width:0.35rem;height:0.35rem;}
</style>
