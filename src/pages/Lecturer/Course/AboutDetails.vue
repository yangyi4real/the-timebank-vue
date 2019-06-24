<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="number-code flex-row-between">
        <div @click="distributionCopy">约讲编号：<input type="text" readonly class="g-table-url main-color" :value="listDatas.orderEntity.id" ref="distributionUrl"/></div>
        <div v-if="this.listDatas.orderEntity.orderStatus === 2">待确认</div>
        <div v-if="this.listDatas.orderEntity.orderStatus === 3">待开课</div>
        <div v-if="this.listDatas.orderEntity.orderStatus === 4">待评价</div>
        <div v-if="this.listDatas.orderEntity.orderStatus === 5">已退款</div>
        <div v-if="this.listDatas.orderEntity.orderStatus === 6">已完成</div>
        <div v-if="this.listDatas.orderEntity.orderStatus === 7">已取消</div>
      </div>
      <div class="about-details-main">
        <div class="about-details-main-text">
          <label>约讲企业：{{listDatas.companyEntity.companyName}}</label>
          <div class="flex-row-start" v-if="this.listDatas.orderEntity.orderStatus === 5">
            <div>企业评分：</div>
            <div>
              <yd-cell-item>
                <yd-rate slot="left" v-model="rate" color="#E2E2E2" active-color="#FED500" size="0.25rem"></yd-rate>
              </yd-cell-item>
            </div>
          </div>
          <div class="clearfix padding-top-10">
            <div class="fl">约讲时间：</div>
            <div class="fl"><p>{{listDatas.orderEntity.begin}}</p><p>{{listDatas.orderEntity.end}}</p></div>
          </div>
          <div class="padding-top-10">约讲地址：{{listDatas.orderEntity.address}}</div>
          <div class="padding-top-10">参与人数：{{listDatas.orderEntity.joinNum}}人</div>
          <div class="padding-top-10">需求：{{listDatas.orderEntity.purpose == null? '暂无' : listDatas.orderEntity.purpose == ''? '暂无' : listDatas.orderEntity.purpose}}</div>
        </div>
        <div class="about-details-main-msg" v-if="this.listDatas.orderEntity.orderStatus !== 2">
          <p>时间信息</p>
          <!--<div v-if="this.listDatas.orderEntity.cancelDate === null">订单时间：{{listDatas.orderEntity.confirmDate}}</div>-->
          <div v-if="this.listDatas.orderEntity.cancelDate === null">确认时间：{{listDatas.orderEntity.confirmDate}}</div>
          <div v-if="this.listDatas.orderEntity.cancelDate !== null">取消时间：{{listDatas.orderEntity.cancelDate}}</div>
          <div v-if="this.listDatas.orderEntity.cancelDate !== null">拒绝/取消原因：暂无</div>
        </div>
      </div>
      <div class="order-center-list-opt">
        <p class="text-right">合计：<span>{{listDatas.orderEntity.price}}</span> 元</p>
        <div class="opt-btn flex-row-end">
          <div @click="acceptType" v-if="this.listDatas.orderEntity.orderStatus === 2">接受</div>
          <div @click="refuseType" v-if="this.listDatas.orderEntity.orderStatus === 2">拒绝</div>
          <div @click="cancelType" v-if="this.listDatas.orderEntity.orderStatus === 3">取消行程</div>
          <div @click="evaluateType" v-if="this.listDatas.orderEntity.orderStatus === 4">评价</div>
          <div>联系客服</div>
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
  name: 'AboutDetails',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '约讲详情',
      rate: 4,
      listDatas: {
        companyEntity: {},
        orderEntity: {}
      },
      distributionUrl: 'broker'
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
    distributionCopy () {
      this.$refs.distributionUrl.select()
      document.execCommand('Copy')
      this.$_lib.MessageAlert_Success('复制成功')
    },
    loadData () {
      let _this = this
      let formData = new FormData()
      formData.append('orderId', _this.getOrderId)
      _this.$_HTTPData.getOrderDetail(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.listDatas = res.result
          console.log(_this.listDatas)
        } else {
          lib.MessageAlert_Success(res.message)
        }
      })
    },
    // 接受
    acceptType () {
      let _this = this
      let formData = new FormData()
      formData.append('type', 1)
      formData.append('orderId', _this.getOrderId)
      _this.$_HTTPData.getConfirmAppoint(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.$router.push('/course/index')
          lib.MessageAlert_Success(res.message)
        } else {
          lib.MessageAlert_Success(res.message)
        }
      })
    },
    // 取消
    refuseType () {
      let _this = this
      let formData = new FormData()
      formData.append('type', 2)
      formData.append('orderId', _this.getOrderId)
      _this.$_HTTPData.getConfirmAppoint(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.$router.push('/course/index')
          lib.MessageAlert_Success(res.message)
        } else {
          lib.MessageAlert_Success(res.message)
        }
      })
    },
    cancelType () {
      this.$dialog.confirm({
        title: '取消行程将扣除100枚SDG，累计三次取消行程将直接取消认证，确认取消行程？',
        mes: '',
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
              let _this = this
              let formData = new FormData()
              formData.append('type', 1)
              formData.append('orderId', _this.getOrderId)
              _this.$_HTTPData.getCancelOrder(_this, formData, function (res) {
                if (res.code === 0 || res.code === '000') {
                  _this.$router.push('/course/index')
                  lib.MessageAlert_Success(res.message)
                } else {
                  lib.MessageAlert_Success(res.message)
                }
              })
            }
          }
        ]
      })
    },
    evaluateType () {
      this.$router.push(`/course/evaluate/${this.getOrderId}`)
    }
  }
}
</script>

<style scoped>
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;}
  .number-code{padding: 0.15rem 0.2rem;font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(249,91,64,1);}
  .about-details-main{padding: 0 0.2rem;}
  .about-details-main .about-details-main-text{border-bottom: 0.01rem solid #E8E8E8;border-top: 0.01rem solid #E8E8E8;padding: 0.2rem 0;}
  .about-details-main .about-details-main-text label{font-size:0.17rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);display: block}
  .about-details-main .about-details-main-text div{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);}
  .padding-top-10{padding-top: 0.1rem;}
  .about-details-main .about-details-main-msg p{font-size:0.15rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);padding: 0.2rem 0;}
  .about-details-main .about-details-main-msg div{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);padding-bottom: 0.1rem;}
  .order-center-list-opt{padding: 0.3rem 0.2rem 0.5rem 0.2rem;}
  .order-center-list-opt p{padding: 0.15rem 0;font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color: #333;}
  .order-center-list-opt p span{color:rgba(249,91,64,1);}
  .msg-time{font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);}
  .msg-time div{padding-bottom: 0.07rem;}
  .msg-time div p{padding-bottom: 0.05rem;}
  .opt-btn div{width:0.79rem;height:0.32rem;border-radius:0.05rem;border:0.01rem solid rgba(249,91,64,1);text-align: center;line-height: 0.32rem;font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);margin-left: 0.2rem;}
  .g-table-url{-webkit-appearance: none;border: 0;background: 0;outline: none}
</style>
