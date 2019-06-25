<template>
  <div class="body">
    <div class="home-nav text-center">
      我的
    </div>
    <div class="modular1">
      <div class="modular1-div flex-row-between">
        <div class="head flex-row-start">
          <div class="head-img">
            <div class="user-icon">
              <img :src="src" alt="">
              <!--<input type="file" @change="userIconDidClicked" ref="file" placeholder="上传照片">-->
            </div>
          </div>
          <div>
            <p class="head-text" v-if="this.listData.name === null">{{listData.nickname}}</p>
            <p class="head-text" v-if="this.listData.name !== null">{{listData.name}}<i class="iconfont iconnan main-color" v-if="listData.sex === 1"></i><i class="iconfont iconnv main-color" v-if="listData.sex === 2"></i></p>
            <p class="head-text2">编号：{{listData.serialNumber}}</p>
          </div>
        </div>
        <div class="msg">
          <i class="iconfont iconlingdang main-color" @click="msgClick"></i>
        </div>
      </div>
      <div class="modular-already" v-if="listData.sex === 0 || listData.sex === null" @click="addInfoClicked">
        完善个人资料
      </div>
      <div class="modular-already" v-if="listData.sex !== 0 && listData.sex !== null">
        <div class="flex-row-between">
          <div style="min-width: 0;text-overflow: ellipsis;overflow: hidden; white-space: nowrap;width: 0.6rem">{{listData.skillLevel}}</div>
          <div><span>|</span></div>
          <div style="min-width: 0;text-overflow: ellipsis;overflow: hidden; white-space: nowrap;width: 0.6rem"><i class="iconfont iconditu main-color"></i>{{listData.livingLocation}}</div>
          <div><span>|</span></div>
          <div>
            <div v-if="listData.authStatus === 0 || listData.authStatus === null" @click="authenticationClicked">去认证<i class="iconfont iconjiantou"></i><span></span></div>
            <div v-if="listData.authStatus === 1">已认证<span></span></div>
          </div>
          <div><span>|</span></div>
          <div @click="baseDataClick">完善资料<i class="iconfont iconjiantou"></i></div>
        </div>
      </div>
    </div>
    <div class="modular2 flex-row-around">
      <div @click="walletClick">
        <label>{{listData.balance}}</label>
        <p>钱包</p>
      </div>
      <div>
        <label>{{listData.bouns}}</label>
        <p class="border">报酬</p>
      </div>
      <div @click="sdgClick">
        <label>{{listData.sdg}}</label>
        <p>SDG</p>
      </div>
    </div>
    <div class="modular3">
      <div class="modular3-title">
        <i class="iconfont iconqitapeizhi main-color"></i>其他服务
      </div>
      <div class="modular3-div flex-row-around">
        <div @click="linkInvitation">
          <img src="../../../assets/icon/yaoqing.png"/>
          <p>邀请好友</p>
        </div>
        <div>
          <a :href="'tel:' + '05328888888'">
            <img src="../../../assets/icon/kefu.png"/>
            <p>联系客服</p>
          </a>
        </div>
        <div @click="linkSetUp">
          <img src="../../../assets/icon/shezhi.png"/>
          <p>设置</p>
        </div>
      </div>
    </div>
    <tabbar :idx="2"></tabbar>
  </div>
</template>

<script>
import Tabbar from '../../../views/Tabbar/Tabbar'
import icon from '../../../assets/icon/user_icon.png'
// import TipsTools from '../../../common/TipsTools'
// let lib = new TipsTools()

export default {
  name: 'PersonalIndex',
  components: {
    Tabbar
  },
  data () {
    return {
      src: '',
      listData: {
        name: '',
        photo: '',
        serialNumber: '',
        skillLevel: '',
        livingLocation: '',
        bouns: '',
        balance: '',
        introduction: '',
        sdg: '',
        authStatus: '',
        sex: ''
      },
      baseData: true
    }
  },
  computed: {},
  mounted () {
    this.loadData()
  },
  methods: {
    // userIconDidClicked (e) {
    //   let _this = this
    //   var files = e.target.files[0]
    //   if (!e || !window.FileReader) return
    //   let reader = new FileReader()
    //   reader.readAsDataURL(files)
    //   reader.onloadend = function () {
    //     _this.src = this.result
    //   }
    // },
    addInfoClicked () {
      this.$router.push('/personal/information/basedata')
    },
    authenticationClicked () {
      this.$router.push('/personal/information/authentication-center')
    },
    // cancelAuthenticationClicked () {
    //   this.$dialog.confirm({
    //     title: '<p style="text-align: center;font-size:0.19rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);padding-bottom: 0.1rem">确定取消认证？</p>',
    //     mes: '<p style="text-align: center;font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);line-height: 0.22rem!important;">取消后，未来已存储时间将全部失效，并且不可继续约课</p>',
    //     opts: [
    //       {
    //         txt: '取消',
    //         color: '#ccc',
    //         callback: () => {}
    //       },
    //       {
    //         txt: '确定',
    //         color: true,
    //         callback: () => {
    //           // this.$router.push('/calendar/index')
    //           lib.MessageAlert_Error('系统维护中,请不支持此操作')
    //         }
    //       }
    //     ]
    //   })
    // },
    loadData () {
      let _this = this
      let formData = new FormData()
      formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
      formData.append('type', 1)
      _this.$_HTTPData.getMyInfo(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.listData = res.result
          if (_this.listData.photo === '' || _this.listData.photo === null) {
            _this.src = icon
          } else {
            _this.src = _this.listData.photo
          }
        } else {
          // console.log(res.message)
        }
      })
    },
    msgClick () {
      this.$router.push('/personal/msg')
    },
    skillLevelClicked () {},
    // 钱包
    walletClick () {
      this.$router.push(`/personal/wallet/index/${this.listData.balance}`)
    },
    // 邀请好友
    linkInvitation () {
      this.$router.push('/personal/invitation')
    },
    // sdg
    sdgClick () {
      this.$router.push(`/personal/wallet/sdg-index/${this.listData.sdg}`)
    },
    // 设置
    linkSetUp () {
      this.$router.push('/personal/setup/index')
    },
    // 完善资料
    baseDataClick () {
      this.$router.push('/personal/personaldata')
    }
  }
}
</script>

<style scoped>
  .home-nav{padding: 0.2rem 0;font-size: 0.2rem;font-family:PingFangSC-Semibold;font-weight:600;}
  .modular1{background: #fff;padding: 0.2rem;margin: 0 0.1rem;border-radius:0.05rem;}
  .modular2{background: #fff;padding: 0.4rem 0.3rem;margin: 0.1rem 0.1rem;border-radius:0.05rem;}
  .modular3{background: #fff;padding: 0.2rem 0.2rem 0.4rem 0.2rem;margin: 0 0.1rem;border-radius:0.05rem;}
  .modular1 .modular1-div{padding: 0.2rem 0;}
  .head-img{padding-right: 0.15rem;}
  .head-text{font-size:0.17rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);padding-bottom: 0.05rem;}
  .head-text i{font-size: 0.2rem;padding-left: 0.05rem;}
  .head-text2{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .border{border-right: 0.01rem solid #D0D0D0;border-left: 0.01rem solid #D0D0D0;padding: 0 0.4rem;}
  .modular2 div{text-align: center;}
  .modular2 div p{font-size: 0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .modular2 div label{font-size: 0.16rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(249,91,64,1);padding-bottom: 0.15rem;display: block}
  .modular3 .modular3-title{font-size:0.16rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);}
  .modular3 .modular3-title i{padding-right: 0.1rem}
  .modular3 .modular3-div{text-align: center;font-size:15px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);padding-top: 0.4rem;}
  .modular3 .modular3-div img{width: 0.3rem;height: 0.3rem;}
  .modular3 .modular3-div p{padding-top: 0.16rem}
  .modular-already div{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);text-align: center}
  /*.modular-already div span{padding-left: 0.1rem;}*/
  .modular-already p{font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(249,91,64,1);padding-top: 0.15rem;}
  .user-icon{position: relative;overflow: hidden;}
  .user-icon input{position: absolute;top: 0;opacity: 0;-ms-filter: 'alpha(opacity=0)';}
  .user-icon img{width: 0.67rem;height: 0.67rem;border: 0.01rem solid #E8E8E8;}
</style>
