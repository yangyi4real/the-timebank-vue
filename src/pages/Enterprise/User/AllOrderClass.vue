<template>
  <div class="body">
    <div class="navbar">
      <div class="left-btn" @click="leftItemTouched">
        <i class="iconfont iconxiazai6"></i>
      </div>
      <div class="item title">
        订单中心
      </div>
    </div>
    <div class="wapper">
      <!--<div class="title text-right" @click="allOrderClick">查看全部订单 <i class="iconfont iconjiantou font-size-14"></i></div>-->
      <div class="order-center-tab flex-row-around">
        <div @click="tabsClicked">
          全部
        </div>
        <div @click="tabsClicked2">
          待付款
        </div>
        <div @click="tabsClicked3">
          待确认
        </div>
        <div @click="tabsClicked4" class="active">
          待开课
        </div>
        <div @click="tabsClicked5">
          待评价
        </div>
        <div @click="tabsClicked6">
          已取消
        </div>
      </div>
      <div class="list-null" v-show="listDataNull">
        暂无订单
      </div>
      <div class="order-center-list" v-for="(item,index) in listData" :key="index" v-show="listDataShow">
        <div class="order-center-list-msg">
          <div class="flex-row-between">
            <div class="order-center-list-msg-div flex-row-start">
              <div class="msg-left"><img :src="item.userEntity.photo" @click="OrderDetailClick(item)"/></div>
              <div class="msg-right">
                <label>{{item.userEntity.name}}<i class="iconfont iconnv main-color" v-if="item.userEntity.sexuality === 1"></i><i class="iconfont iconnv main-color" v-if="item.userEntity.sexuality === 2"></i></label>
                <p>{{item.userEntity.birthday}}岁 | 工作{{item.userEntity.workingAge}}年 | {{item.userEntity.livingLocation}}</p>
                <p>{{item.userEntity.skillLevel}}</p>
              </div>
            </div>
            <div class="tip" v-if="item.orderEntity.orderStatus === 1">待付款</div>
            <div class="tip" v-if="item.orderEntity.orderStatus === 2">待确认</div>
            <div class="tip" v-if="item.orderEntity.orderStatus === 3">待开课</div>
            <div class="tip" v-if="item.orderEntity.orderStatus === 4">待评价</div>
            <div class="tip" v-if="item.orderEntity.orderStatus === 6">已完成</div>
            <div class="tip" v-if="item.orderEntity.orderStatus === 5 || item.orderEntity.orderStatus === 7">已取消</div>
          </div>
          <div class="msg-time">
            <div>约讲内容：{{item.orderEntity.purpose}}</div>
            <div v-if="item.orderEntity.purpose === null">约讲内容：无</div>
            <div class="flex-row-start">
              <div>约讲时间：</div>
              <div><p>{{item.orderEntity.begin}}</p><p>{{item.orderEntity.end}}</p></div>
            </div>
          </div>
        </div>
        <div class="order-center-list-opt">
          <p class="text-right">合计：{{item.orderEntity.price}} 元</p>
          <div class="opt-btn flex-row-end">
            <div @click="paymentClicked(item)" v-if="item.orderEntity.orderStatus === 1">去支付</div>
            <div @click="evaluateClicked(item)" v-if="item.orderEntity.orderStatus === 4">评价</div>
            <div @click="cancelOrder(item)" v-if="item.orderEntity.orderStatus === 1 || item.orderEntity.orderStatus === 2 || item.orderEntity.orderStatus === 3">取消订单</div>
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
import AllOrderPayment from './AllOrderPayment'
let lib = new TipsTools()
export default {
  inject: ['reload'],
  name: 'AllOrderClass',
  components: {
    AllOrderPayment,
    Navbar
  },
  data () {
    return {
      titleMsg: '订单中心',
      listData: null,
      listDataShow: true,
      listDataNull: false
    }
  },
  computed: {
    getStatusId () {
      return this.$route.params.id
    }
  },
  mounted () {
    this.loadData()
  },
  methods: {
    leftItemTouched () {
      this.$router.push('/user/index')
    },
    loadData () {
      let _this = this
      let formData = new FormData()
      formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
      formData.append('status', 3)
      formData.append('type', 2)
      _this.$_HTTPData.getOrderList(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.listData = res.result
          if (_this.listData.length === 0) {
            console.log(_this.listDataNull)
            _this.listDataNull = true
            _this.listDataShow = false
          } else {
            _this.listDataShow = true
            _this.listDataNull = false
          }
          for (let i = 0; i < _this.listData.length; i++) {
            let newBirthday = _this.listData[i].userEntity.birthday
            let birthday = new Date(newBirthday.replace(/-/g, '/'))
            let d = new Date()
            let age = d.getFullYear() - birthday.getFullYear() - ((d.getMonth() < birthday.getMonth() || d.getMonth() === birthday.getMonth() || d.getDate() < birthday.getDate()) ? 1 : 0)
            _this.listData[i].userEntity.birthday = age
            let secondDate = new Date(_this.listData[i].userEntity.workingAge.replace(/-/g, '/'))
            let workYears = d.getFullYear() - secondDate.getFullYear()
            _this.listData[i].userEntity.workingAge = workYears
          }
        } else {
          lib.MessageAlert_None(res.message)
        }
      })
    },
    tabsClicked () {
      this.$router.push('/user/ordercenter')
    },
    tabsClicked2 () {
      this.$router.push('/user/allorder-payment')
    },
    tabsClicked3 () {
      this.$router.push('/user/allorder-confirm')
    },
    tabsClicked4 () {
      let _this = this
      let formData = new FormData()
      formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
      formData.append('status', 3)
      formData.append('type', 2)
      _this.$_HTTPData.getOrderList(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.listData = res.result
          if (_this.listData.length === 0) {
            _this.listDataNull = true
            _this.listDataShow = false
          } else {
            _this.listDataShow = true
            _this.listDataNull = false
          }
          for (let i = 0; i < _this.listData.length; i++) {
            let newBirthday = _this.listData[i].userEntity.birthday
            let birthday = new Date(newBirthday.replace(/-/g, '/'))
            let d = new Date()
            let age = d.getFullYear() - birthday.getFullYear() - ((d.getMonth() < birthday.getMonth() || d.getMonth() === birthday.getMonth() || d.getDate() < birthday.getDate()) ? 1 : 0)
            _this.listData[i].userEntity.birthday = age
            let secondDate = new Date(_this.listData[i].userEntity.workingAge.replace(/-/g, '/'))
            let workYears = d.getFullYear() - secondDate.getFullYear()
            _this.listData[i].userEntity.workingAge = workYears
          }
        } else {
          lib.MessageAlert_None(res.message)
        }
      })
    },
    tabsClicked5 () {
      this.$router.push('/user/allorder-evaluate')
    },
    tabsClicked6 () {
      this.$router.push('/user/allorder-refund')
    },
    paymentClicked (item) {
      this.$router.push(`/user/enterprise-payment/${item.orderEntity.price}/${item.orderEntity.id}`)
    },
    cancelOrder (item) {
      this.$dialog.confirm({
        title: '确认取消行程？',
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
              formData.append('type', 2)
              formData.append('orderId', item.orderEntity.id)
              _this.$_HTTPData.getCancelOrder(_this, formData, function (res) {
                if (res.code === 0 || res.code === '000') {
                  _this.loadData()
                  _this.reload()
                  lib.MessageAlert_Success(res.message)
                } else {
                  lib.MessageAlert_None(res.message)
                }
              })
            }
          }
        ]
      })
    },
    evaluateClicked (item) {
      this.$router.push(`/user/evaluate/${item.orderEntity.id}`)
    },
    OrderDetailClick (item) {
      this.$router.push(`/user/OrderDetails/${item.orderEntity.id}`)
    }
    // allOrderClick () {
    //   this.$router.push('/user/allorder')
    // }
  },
  watch: {}
}
</script>

<style scoped>
  .wapper{border-radius:0.05rem;margin: 0.66rem 0.1rem;}
  .order-center-tab{padding: 0.2rem;font-size:15px;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);background: #fff;border-radius:0.05rem;margin-bottom: 0.1rem;}
  .active{color:rgba(249,91,64,1)}
  .order-center-list{padding: 0 0.2rem;background: #fff;}
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
  .order-center-list-opt{padding-bottom: 0.2rem;border-bottom: 0.01rem solid #E8E8E8;}
  .opt-btn div{width:0.79rem;height:0.32rem;border-radius:0.05rem;border:0.01rem solid rgba(249,91,64,1);text-align: center;line-height: 0.32rem;font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);margin-left: 0.2rem;}
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
  .list-null{font-size:0.15rem;font-family:PingFangSC-Regular;text-align: center;padding: 0.2rem 0;color:rgba(153,153,153,1)}
</style>
