<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="order-center-list" v-for="(item,index) in listData" :key="index" >
        <div class="order-center-list-msg" @click="OrderDetailsClick(item)">
          <div class="flex-row-between">
            <div class="order-center-list-msg-div flex-row-start">
              <div class="msg-left"><img :src="item.userEntity.photo"/></div>
              <div class="msg-right">
                <label>{{item.userEntity.name}}<i class="iconfont iconnv main-color" v-if="item.userEntity.sexuality === 1"></i><i class="iconfont iconnv main-color" v-if="item.userEntity.sexuality === 2"></i></label>
                <p>24岁 | 工作{{item.userEntity.workingAge}}年 | {{item.userEntity.livingLocation}}</p>
                <p>专注研究产品设计</p>
              </div>
            </div>
            <div class="tip" v-if="item.orderEntity.orderStatus === 1">待付款</div>
            <div class="tip" v-if="item.orderEntity.orderStatus === 2">待确认</div>
            <div class="tip" v-if="item.orderEntity.orderStatus === 3">待开课</div>
            <div class="tip" v-if="item.orderEntity.orderStatus === 4">待评价</div>
            <div class="tip" v-if="item.orderEntity.orderStatus === 5">待已退款</div>
          </div>
          <div class="msg-time">
            <div>约讲内容：{{item.userEntity.skillLevel}}</div>
            <div class="flex-row-start">
              <div>约讲时间：</div>
              <div><p>{{item.orderEntity.begin}}</p><p>{{item.orderEntity.end}}</p></div>
            </div>
          </div>
        </div>
        <div class="order-center-list-opt">
          <p class="text-right">合计：{{item.orderEntity.price}}</p>
          <div class="opt-btn flex-row-end">
            <div @click="paymentClicked(item)" v-if="item.orderEntity.orderStatus === 1">去支付</div>
            <div v-if="item.orderEntity.orderStatus === 4">评价</div>
            <div>取消订单</div>
            <div>联系客服</div>
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
  name: 'AllOrder',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '全部订单',
      listData: []
    }
  },
  computed: {},
  mounted () {
    this.loadData()
  },
  methods: {
    loadData () {
      let _this = this
      let formData = new FormData()
      formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
      formData.append('status', '')
      formData.append('type', 2)
      _this.$_HTTPData.getOrderList(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.listData = res.result
        } else {
          lib.MessageAlert_None(res.message)
        }
      })
    },
    paymentClicked (item) {
      let _this = this
      let formData = new FormData()
      formData.append('payType', 1)
      formData.append('orderId', item.orderEntity.id)
      formData.append('companyId', item.orderEntity.companyId)
      _this.$_HTTPData.getCompanyPay(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          console.log(res.result)
        } else {
          lib.MessageAlert_None(res.message)
        }
      })
    },
    OrderDetailsClick (item) {
      this.$router.push(`/user/OrderDetails/${item.orderEntity.id}`)
    }
  }
}
</script>

<style scoped>
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;}
  .order-center-list{margin: 0 0.2rem;}
  .order-center-list .order-center-list-msg{padding: 0.2rem 0;}
  .order-center-list-msg .order-center-list-msg-div .msg-left{padding-right: 0.15rem;}
  .order-center-list-msg .order-center-list-msg-div .msg-left img{width: 0.6rem;height: 0.6rem;}
  .order-center-list-msg .order-center-list-msg-div .msg-right label{font-size:0.16rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);}
  .order-center-list-msg .order-center-list-msg-div .msg-right label i{padding-left: 0.1rem;}
  .order-center-list-msg .order-center-list-msg-div .msg-right p{font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);line-height: 0.3rem;}
  .order-center-list-msg .tip{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(249,91,64,1);}
  .order-center-list-opt p{padding: 0.15rem 0;font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(249,91,64,1);}
  .msg-time{font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);}
  .msg-time div{padding-bottom: 0.07rem;}
  .msg-time div p{padding-bottom: 0.05rem;}
  .order-center-list-opt{padding-bottom: 0.2rem;border-top: 0.01rem solid #E8E8E8;border-bottom: 0.01rem solid #E8E8E8;}
  .opt-btn div{width:0.79rem;height:0.32rem;border-radius:0.05rem;border:0.01rem solid rgba(249,91,64,1);text-align: center;line-height: 0.32rem;font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);margin-left: 0.2rem;}
</style>
