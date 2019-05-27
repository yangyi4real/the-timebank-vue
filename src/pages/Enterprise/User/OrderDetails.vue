<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="order-details">
        <div class="order-info flex-row-around">
          <div class="order-info-left"><img :src="listDatas.userEntity.photo"/></div>
          <div class="order-info-right">
            <label>{{listDatas.userEntity.name}}<i class="iconfont iconnv main-color" v-if="listDatas.userEntity.sexuality === 1"></i><i class="iconfont iconnv main-color" v-if="listDatas.userEntity.sexuality === 2"></i></label>
            <p>24岁 | 工作{{listDatas.userEntity.workingAge}}年 | {{listDatas.userEntity.livingLocation}}</p>
            <p>{{listDatas.userEntity.skillLevel}}</p>
          </div>
        </div>
        <div class="order-content">
          <div class="order-content-text">约讲内容：{{listDatas.userEntity.skillLevel}}</div>
          <div class="clearfix order-content-text">
            <div class="fl">约讲时间：</div>
            <div class="fl">
              <p>{{listDatas.orderEntity.begin}}</p>
              <p>{{listDatas.orderEntity.end}}</p>
            </div>
          </div>
          <div class="order-content-text">约讲地址：{{listDatas.orderEntity.location}}</div>
          <div>需求：{{listDatas.orderEntity.purpose}}</div>
        </div>
        <div class="order-sign-up">
          <div class="order-sign-up-title">报名信息</div>
          <div class="order-sign-up-info">
            <p>联系人：{{listDatas.orderEntity.linkman}}</p>
            <p>联系方式：{{listDatas.orderEntity.phone}}</p>
            <p>参与人数：{{listDatas.orderEntity.joinNum}}人</p>
            <p>创建时间：2019-04-21 9:21:23</p>
            <p>支付时间：2019-04-21 9:21:23</p>
          </div>
          <div class="order-opt">
            <p class="text-right">实付金额：<span>{{listDatas.orderEntity.price}}</span> 元</p>
            <div class="order-opt-btn flex-row-end">
              <div @click="paymentClicked" v-if="listDatas.orderEntity.orderStatus === 1">去支付</div>
              <div v-if="listDatas.orderEntity.orderStatus === 4">评价</div>
              <div>取消订单</div>
              <div>联系客服</div>
            </div>
          </div>
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
  name: 'OrderDetails',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '订单详情',
      listDatas: {
        orderEntity: [],
        userEntity: []
      }
    }
  },
  computed: {
    getOrderId () {
      return this.$route.params.orderId
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      let _this = this
      let formData = new FormData()
      formData.append('orderId', _this.getOrderId)
      _this.$_HTTPData.getOrderDetail(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.listDatas = res.result
          console.log(_this.listDatas)
          _this.listDatas.orderEntity = res.result.orderEntity
          _this.listDatas.userEntity = res.result.userEntity
        } else {
          lib.MessageAlert_None(res.message)
        }
      })
    },
    paymentClicked () {
      let _this = this
      let formData = new FormData()
      formData.append('payType', 1)
      formData.append('orderId', _this.getOrderId)
      formData.append('companyId', '')
      _this.$_HTTPData.getCompanyPay(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          console.log(res.result)
          lib.MessageAlert_Success(res.message)
        } else {
          lib.MessageAlert_None(res.message)
        }
      })
    }
  }
}
</script>

<style scoped>
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;}
  .order-details{padding: 0.5rem 0.2rem;}
  .order-info-left img{width: 1rem;height: 1rem;}
  .order-info-right label{font-size:0.17rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);line-height: 0.3rem;}
  .order-info-right p{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);line-height: 0.3rem;}
  .order-content{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);padding: 0.2rem 0;border-bottom: 0.01rem solid #E8E8E8;}
  .order-content .order-content-text{padding-bottom: 0.1rem;}
  .order-sign-up .order-sign-up-title{padding: 0.2rem 0;font-size:0.15rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);}
  .order-sign-up .order-sign-up-info p{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);line-height: 0.3rem;}
  .order-opt p{padding: 0.2rem 0;font-size: 0.16rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(51,51,51,1);}
  .order-opt p span{padding: 0.15rem 0;font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(249,91,64,1);}
  .order-opt{padding-bottom: 0.2rem;}
  .order-opt-btn div{width:0.79rem;height:0.32rem;border-radius:0.05rem;border:0.01rem solid rgba(249,91,64,1);text-align: center;line-height: 0.32rem;font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);margin-left: 0.2rem;}
</style>
