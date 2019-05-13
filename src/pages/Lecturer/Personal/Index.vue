<template>
  <div class="body">
    <div class="home-nav text-center">
      我的
    </div>
    <div class="modular1">
      <div class="modular1-div flex-row-between">
        <div class="head flex-row-start">
          <div class="head-img">
            <!--<img :src="userIconUrl" @click="userIconDidClicked" class="User-icon">-->
            <img src="" @click="userIconDidClicked"/>
          </div>
          <div>
            <p class="head-text">进阶的讲师</p>
            <p class="head-text2">编号：50976567</p>
          </div>
        </div>
        <div class="msg">
          <i class="iconfont iconlingdang main-color" @click="msgClick"></i>
        </div>
      </div>
      <p class="text-right main-color modular-data" @click="baseDataClick">完善个人资料 <i class="iconfont iconjiantou" style="font-size: 0.13rem"></i></p>
      <div class="modular-already">
        <div class="flex-row-between">
          <div>产品经理<span><i class="iconfont iconjiantou"></i>|</span></div>
          <div><i class="iconfont iconditu main-color"></i>青岛<span><i class="iconfont iconjiantou"></i>|</span></div>
          <div>完善资料<span><i class="iconfont iconjiantou"></i>|</span></div>
          <div>去认证<span><i class="iconfont iconjiantou"></i></span></div>
        </div>
        <p>添加个人描述，可让企业更好地认识你</p>
      </div>
    </div>
    <div class="modular2 flex-row-around">
      <div @click="walletClick">
        <label>20000.00</label>
        <p>钱包</p>
      </div>
      <div>
        <label>20000.00</label>
        <p class="border">奖励分红</p>
      </div>
      <div>
        <label>20000.00</label>
        <p>SDG</p>
      </div>
    </div>
    <div class="modular3">
      <div class="modular3-title">
        <i class="iconfont iconqitapeizhi main-color"></i>其他服务
      </div>
      <div class="modular3-div flex-row-around">
        <div @click="linkInvitation">
          <img src=""/>
          <p>邀请好友</p>
        </div>
        <div>
          <img src=""/>
          <p>联系客服</p>
        </div>
        <div @click="linkSetUp">
          <img src=""/>
          <p>设置</p>
        </div>
      </div>
    </div>
    <tabbar :idx="2"></tabbar>
  </div>
</template>

<script>
import Tabbar from '../../../views/Tabbar/Tabbar'
export default {
  name: 'PersonalIndex',
  components: {
    Tabbar
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    msgClick () {
      this.$router.push('/personal/msg')
    },
    // 钱包
    walletClick () {
      this.$router.push('/personal/wallet/index')
    },
    // 邀请好友
    linkInvitation () {
      this.$router.push('/personal/invitation')
    },
    // 设置
    linkSetUp () {
      this.$router.push('/personal/setup/index')
    },
    // 完善资料
    baseDataClick () {
      this.$router.push('/personal/information/basedata')
    },
    userIconDidClicked () {
      this.$router.push('/personal/personaldata')
    }
  },
  mounted () {}
}
</script>

<style scoped>
  .home-nav{padding: 0.2rem 0;font-size: 0.2rem;font-family:PingFangSC-Semibold;font-weight:600;}
  .modular1{background: #fff;padding: 0.2rem;margin: 0 0.1rem;border-radius:0.05rem;}
  .modular2{background: #fff;padding: 0.4rem 0.3rem;margin: 0.1rem 0.1rem;border-radius:0.05rem;}
  .modular3{background: #fff;padding: 0.2rem 0.2rem 0.4rem 0.2rem;margin: 0 0.1rem;border-radius:0.05rem;}
  .modular1 .modular1-div{padding: 0.2rem 0;}
  .head-img{padding-right: 0.15rem;}
  .head-img img{width: 0.67rem;height: 0.67rem;}
  .head-text{font-size:0.17rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);padding-bottom: 0.05rem;}
  .head-text2{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .modular-data{font-size:0.13rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(249,91,64,1);}
  .border{border-right: 0.01rem solid #D0D0D0;border-left: 0.01rem solid #D0D0D0;padding: 0 0.4rem;}
  .modular2 div{text-align: center;}
  .modular2 div p{font-size: 0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .modular2 div label{font-size: 0.16rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(249,91,64,1);padding-bottom: 0.15rem;display: block}
  .modular3 .modular3-title{font-size:0.16rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);}
  .modular3 .modular3-title i{padding-right: 0.1rem}
  .modular3 .modular3-div{text-align: center;font-size:15px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);padding-top: 0.4rem;}
  .modular3 .modular3-div img{width: 0.3rem;height: 0.3rem;}
  .modular3 .modular3-div p{padding-top: 0.16rem}
  .modular-already div{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);}
  .modular-already div span{padding-left: 0.1rem;}
  .modular-already p{font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(249,91,64,1);padding-top: 0.15rem;}
</style>
