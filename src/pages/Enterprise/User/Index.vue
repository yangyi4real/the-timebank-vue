<template>
  <div class="body">
    <div class="home-nav text-center">
      时间银行
    </div>
    <div class="modular1">
      <div class="modular1-div flex-row-between">
        <div class="head flex-row-start">
          <div class="head-img">
            <!--<img :src="userIconUrl" @click="userIconDidClicked" class="User-icon">-->
            <img :src="src" alt="" @click="personalCenterClicked"/>
          </div>
          <div>
            <p class="head-text" @click="addInfo">{{listData.name}} <span v-if="this.listData.name === null || this.listData.name === ''" class="main-color wanshan">点我完善信息</span></p>
            <p class="head-text2">企业编号：{{listData.serialNumber}}</p>
          </div>
        </div>
        <div class="msg">
          <i class="iconfont iconlingdang main-color" @click="msgClick"></i>
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
        <p class="border">奖励报酬</p>
      </div>
      <div>
        <label>{{listData.sdg}}</label>
        <p>SDG</p>
      </div>
    </div>
    <div class="modular3">
      <div class="modular3-title flex-row-between">
        <div class="modular3-title-left">订单中心</div>
        <div class="modular3-title-right" @click="orderCenterClick">查看全部订单</div>
      </div>
      <div class="modular3-sort flex-row-between">
        <div>
          <i class="iconfont icondaifukuan"></i>
          <p>待付款</p>
        </div>
        <div>
          <i class="iconfont iconqueren1"></i>
          <p>待付款</p>
        </div>
        <div>
          <i class="iconfont iconkaishijixi"></i>
          <p>待开课</p>
        </div>
        <div>
          <i class="iconfont iconpingjia"></i>
          <p>待评价</p>
        </div>
        <div>
          <i class="iconfont icontubiaolunkuo-"></i>
          <p>退款/售后</p>
        </div>
      </div>
    </div>
    <div class="modular4">
      <div class="modular4-div flex-row-around">
        <div @click="linkInvitation">
          <img src="../../../assets/icon/yaoqing.png"/>
          <p>邀请好友</p>
        </div>
        <div>
          <img src="../../../assets/icon/shoucang.png"/>
          <p>收藏夹</p>
        </div>
        <div @click="linkSetUp">
          <img src="../../../assets/icon/liulan.png"/>
          <p>浏览记录</p>
        </div>
      </div>
      <div class="modular4-div flex-row-around">
        <div>
          <img src="../../../assets/icon/kefu.png"/>
          <p>联系客服</p>
        </div>
        <div>
          <img src="../../../assets/icon/bangzhu.png"/>
          <p>帮助中心</p>
        </div>
        <div @click="linkSetUp">
          <img src="../../../assets/icon/yonghu.png"/>
          <p>服务协议</p>
        </div>
      </div>
      <div class="modular4-div flex-row-around">
        <div>
          <img src="../../../assets/icon/yijian.png"/>
          <p>意见反馈</p>
        </div>
        <div style="visibility:hidden">
          <img src=""/>
          <p>联系客服</p>
        </div>
        <div style="visibility:hidden">
          <img src=""/>
          <p>联系客服</p>
        </div>
      </div>
    </div>
    <tabbar-ent :idx="2"></tabbar-ent>
  </div>
</template>

<script>
import TabbarEnt from '../../../views/Tabbar/TabbarEnt'
import icon from '../../../assets/icon/user_icon.png'
export default {
  name: 'UserIndex',
  components: {
    TabbarEnt
  },
  data () {
    return {
      src: icon,
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
      }
    }
  },
  computed: {
  },
  mounted () {
    this.loadData()
  },
  methods: {
    personalCenterClicked () {
      this.$router.push('/user/personalcenter')
    },
    addInfo () {
      this.$router.push('/user/enterpriseInfo')
    },
    loadData () {
      let _this = this
      let formData = new FormData()
      formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
      formData.append('type', 2)
      _this.$_HTTPData.getMyInfo(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.listData = res.result
          _this.src = res.result.photo
          _this.authStatus = res.result.authStatus
          _this.sex = res.result.sex
          console.log(res.result)
        } else {
          console.log(res.message)
        }
      })
    },
    // 个人中心
    userIconDidClicked () {
      this.$router.push('/user/personalcenter')
    },
    // 消息
    msgClick () {
      this.$router.push('/personal/msg')
    },
    // 钱包
    walletClick () {
      this.$router.push('/personal/wallet/index')
    },
    // 订单中心
    orderCenterClick () {
      this.$router.push('/user/ordercenter')
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
    }
  }
}
</script>

<style scoped>
  .home-nav{padding: 0.2rem 0 0.1rem 0;font-size: 0.2rem;font-family:PingFangSC-Semibold;font-weight:600;}
  .modular1{background: #fff;padding: 0.2rem;margin: 0 0.1rem;border-radius:0.05rem;}
  .modular2{background: #fff;padding: 0.4rem 0.3rem;margin: 0.1rem 0.1rem;border-radius:0.05rem;}
  .modular3{background: #fff;padding: 0 0.2rem;margin: 0 0.1rem 0.1rem 0.1rem;border-radius:0.05rem;}
  .modular4{background: #fff;padding: 0.2rem 0.2rem 1rem 0.2rem;margin: 0 0.1rem;border-radius:0.05rem;}
  .modular1 .modular1-div{padding: 0.2rem 0;}
  .head-img{padding-right: 0.15rem;}
  .head-img img{width: 0.67rem;height: 0.67rem;border: 0.01rem solid #E8E8E8;}
  .head-text{font-size:0.17rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);padding-bottom: 0.05rem;}
  .head-text2{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .modular-data{font-size:0.13rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(249,91,64,1);}
  .border{border-right: 0.01rem solid #D0D0D0;border-left: 0.01rem solid #D0D0D0;padding: 0 0.4rem;}
  .modular2 div{text-align: center;}
  .modular2 div p{font-size: 0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .modular2 div label{font-size: 0.16rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(249,91,64,1);padding-bottom: 0.15rem;display: block}
  .modular3 .modular3-title{border-bottom: 0.01rem solid #E8E8E8;padding: 0.2rem 0;background: #fff;}
  .modular3 .modular3-title .modular3-title-left{font-size:16px;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);}
  .modular3 .modular3-title .modular3-title-right{font-size:14px;font-family:PingFangSC-Regular;;font-weight:400;color:rgba(167,167,167,1);}
  .modular3 .modular3-sort{padding: 0.2rem 0;}
  .modular3 .modular3-sort div{text-align: center}
  .modular3 .modular3-sort div i{color: #F95B40;font-size: 0.24rem;}
  .modular3 .modular3-sort div img{width: 0.22rem;height: 0.22rem;}
  .modular3 .modular3-sort div p{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);padding-top: 0.1rem;}
  .modular4 .modular4-title i{padding-right: 0.1rem}
  .modular4 .modular4-div{text-align: center;font-size:15px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);padding-top: 0.15rem;}
  .modular4 .modular4-div img{width: 0.3rem;height: 0.3rem;}
  .modular4 .modular4-div p{padding-top: 0.16rem}
  .modular-already div{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);}
  .modular-already div span{padding-left: 0.1rem;}
  .modular-already p{font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(249,91,64,1);padding-top: 0.15rem;}
</style>
