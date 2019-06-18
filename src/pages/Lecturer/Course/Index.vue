<template>
  <div class="body">
    <div class="home-nav text-center">
      约讲记录
    </div>
    <div class="tab flex-row-around">
      <div v-for="(item,index) in tabItems" :key="index" class="s-tab" :class="{active: changeTab === index}" @click="tabsClicked(index)">
        {{ item.name }}
      </div>
    </div>
    <div class="wapper">
      <div class="course-list-none" v-show="Tips">
        <!--<p><span class="main-color" @click="addTime">存储时间</span> 后，企业才能跟你对讲哦</p>-->
        <p>暂无约讲记录</p>
      </div>
      <div v-show="listItem">
        <div class="order-center-list" v-for="(item,index) in listRecord" :key="index">
          <div class="order-center-list-msg" @click="aboutDetailsClick(item)">
            <div class="clearfix">
              <div class="order-center-list-msg-div fl">
                约讲企业：{{item.companyEntity.companyName}}
              </div>
              <div class="tip fr" v-if="item.orderEntity.orderStatus === 1">待付款</div>
              <div class="tip fr" v-if="item.orderEntity.orderStatus === 2">待确认</div>
              <div class="tip fr" v-if="item.orderEntity.orderStatus === 3">待开课</div>
              <div class="tip fr" v-if="item.orderEntity.orderStatus === 4">待评价</div>
              <div class="tip fr" v-if="item.orderEntity.orderStatus === 6">已完成</div>
              <div class="tip fr" v-if="item.orderEntity.orderStatus === 5 || item.orderEntity.orderStatus === 7">已取消</div>
            </div>
            <div class="msg-time">
              <div>约讲地址：{{item.orderEntity.address}}</div>
              <div class="flex-row-start">
                <div>约讲时间：</div>
                <div><p>{{item.orderEntity.begin}}</p><p>{{item.orderEntity.end}}</p></div>
              </div>
            </div>
          </div>
          <div class="order-center-list-opt">
            <p class="text-right">参与人数：{{item.orderEntity.joinNum}}人&nbsp;&nbsp;&nbsp;&nbsp;合计：{{item.orderEntity.price}} 元</p>
            <div class="opt-btn flex-row-end">
              <div @click="evaluateClick(item)" v-if="item.orderEntity.orderStatus === 4 || item.orderEntity.orderStatus === 6">评价</div>
              <div @click="acceptType(item)" v-if="item.orderEntity.orderStatus === 2">接受</div>
              <div @click="refuseType(item)" v-if="item.orderEntity.orderStatus === 2">拒绝</div>
              <div @click="cancelOrder(item)" v-if="item.orderEntity.orderStatus === 3">取消行程</div>
              <div>联系客服</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <tabbar :idx="1"></tabbar>
  </div>
</template>

<script>
import Tabbar from '../../../views/Tabbar/Tabbar'
import TipsTools from '../../../common/TipsTools'
let lib = new TipsTools()
export default {
  inject: ['reload'],
  name: 'CourseIndex',
  components: {
    Tabbar
  },
  data () {
    return {
      tabItems: [
        {name: '全部'},
        {name: '待确认'},
        {name: '待开课'},
        {name: '待评价'},
        {name: '已完成'}
      ],
      changeTab: 0,
      Tips: false,
      listItem: true,
      listRecord: []
    }
  },
  computed: {
  },
  mounted () {
    this.loadData()
  },
  methods: {
    addTime () {
      this.$router.push('/calendar/index')
    },
    loadData () {
      let _this = this
      let formData = new FormData()
      formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
      formData.append('status', 0)
      formData.append('type', 1)
      _this.$_HTTPData.getOrderList(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.listRecord = res.result
          for (let i = _this.listRecord.length - 1; i > 0; i--) {
            console.log(_this.listRecord[i].orderEntity.orderStatus)
            if (_this.listRecord[i].orderEntity.orderStatus === 1) {
              _this.listRecord.splice(i, 1)
            }
          }
          if (_this.listRecord.length === 0) {
            _this.Tips = true
            _this.listItem = false
          } else {
            _this.Tips = false
            _this.listItem = true
          }
        } else {
          lib.MessageAlert_None(res.message)
        }
      })
    },
    tabsClicked (index) {
      this.changeTab = index
      let _this = this
      let formData = new FormData()
      if (this.changeTab === 0) {
        formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
        formData.append('status', 0)
        formData.append('type', 1)
        _this.$_HTTPData.getOrderList(_this, formData, function (res) {
          if (res.code === 0 || res.code === '000') {
            _this.listRecord = res.result
            for (let i = _this.listRecord.length - 1; i > 0; i--) {
              if (_this.listRecord[i].orderEntity.orderStatus === 1) {
                _this.listRecord.splice(i, 1)
              }
            }
            if (_this.listRecord.length === 0) {
              _this.Tips = true
              _this.listItem = false
            } else {
              _this.Tips = false
              _this.listItem = true
            }
          } else {
            lib.MessageAlert_None(res.message)
          }
        })
      }
      if (this.changeTab === 1) {
        formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
        formData.append('status', 2)
        formData.append('type', 1)
        _this.$_HTTPData.getOrderList(_this, formData, function (res) {
          if (res.code === 0 || res.code === '000') {
            _this.listRecord = res.result
            if (_this.listRecord.length === 0) {
              _this.Tips = true
              _this.listItem = false
            } else {
              _this.Tips = false
              _this.listItem = true
            }
          } else {
            lib.MessageAlert_None(res.message)
          }
        })
      }
      if (this.changeTab === 2) {
        formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
        formData.append('status', 3)
        formData.append('type', 1)
        _this.$_HTTPData.getOrderList(_this, formData, function (res) {
          if (res.code === 0 || res.code === '000') {
            _this.listRecord = res.result
            if (_this.listRecord.length === 0) {
              _this.Tips = true
              _this.listItem = false
            } else {
              _this.Tips = false
              _this.listItem = true
            }
          } else {
            lib.MessageAlert_None(res.message)
          }
        })
      }
      if (this.changeTab === 3) {
        formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
        formData.append('status', 4)
        formData.append('type', 1)
        _this.$_HTTPData.getOrderList(_this, formData, function (res) {
          if (res.code === 0 || res.code === '000') {
            _this.listRecord = res.result
            if (_this.listRecord.length === 0) {
              _this.Tips = true
              _this.listItem = false
            } else {
              _this.Tips = false
              _this.listItem = true
            }
          } else {
            lib.MessageAlert_None(res.message)
          }
        })
      }
      if (this.changeTab === 4) {
        formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
        formData.append('status', 5)
        formData.append('type', 1)
        _this.$_HTTPData.getOrderList(_this, formData, function (res) {
          if (res.code === 0 || res.code === '000') {
            _this.listRecord = res.result
            if (_this.listRecord.length === 0) {
              _this.Tips = true
              _this.listItem = false
            } else {
              _this.Tips = false
              _this.listItem = true
            }
          } else {
            lib.MessageAlert_None(res.message)
          }
        })
      }
    },
    // 接受
    acceptType (item) {
      let _this = this
      let formData = new FormData()
      formData.append('type', 1)
      formData.append('orderId', item.orderEntity.id)
      _this.$_HTTPData.getConfirmAppoint(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.loadData()
          lib.MessageAlert_Success(res.message)
        } else {
          lib.MessageAlert_None(res.message)
        }
      })
    },
    // 拒绝
    refuseType (item) {
      let _this = this
      let formData = new FormData()
      formData.append('type', 2)
      formData.append('orderId', item.orderEntity.id)
      _this.$_HTTPData.getConfirmAppoint(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.loadData()
          lib.MessageAlert_Success(res.message)
        } else {
          lib.MessageAlert_None(res.message)
        }
      })
    },
    // 取消行程
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
              formData.append('type', 1)
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
    evaluateClick (item) {
      this.$router.push(`/course/evaluate/${item.orderEntity.id}`)
    },
    aboutDetailsClick (item) {
      this.$router.push(`/course/aboutdetails/${item.orderEntity.id}`)
    }
  }
}
</script>

<style scoped>
  .home-nav{padding: 0.2rem 0 0.1rem 0;font-size: 0.2rem;font-family:PingFangSC-Semibold;font-weight:600;}
  .tab{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.1rem 0.1rem;font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;height: 0.46rem;line-height: 0.46rem;}
  .s-tab{color:rgba(0,0,0,1);}
  .active{color: #F95B40}
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0 0.1rem;}
  .wapper .course-list-none{text-align: center}
  .wapper .course-list-none p{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(153,153,153,1);padding: 0.6rem 0;}
  .wapper .course-list-none p span{border-bottom: 0.01rem solid #F95B40;}
  .order-center-list{margin: 0 0.2rem;}
  .order-center-list .order-center-list-msg{border-bottom: 0.01rem solid #E8E8E8;padding: 0.2rem 0;}
  .order-center-list-msg .order-center-list-msg-div{font-size:0.16rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);padding-bottom: 0.15rem;}
  .order-center-list-msg .tip{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(249,91,64,1);}
  .order-center-list-opt p{padding: 0.15rem 0;font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(249,91,64,1);}
  .msg-time{font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);}
  .msg-time div{padding-bottom: 0.07rem;}
  .msg-time div p{padding-bottom: 0.05rem;}
  .order-center-list-opt{padding-bottom: 0.2rem;border-bottom: 0.01rem solid #E8E8E8;}
  .opt-btn div{width:0.79rem;height:0.32rem;border-radius:0.05rem;border:0.01rem solid rgba(249,91,64,1);text-align: center;line-height: 0.32rem;font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);margin-left: 0.2rem;}
</style>
