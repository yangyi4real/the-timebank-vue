<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="msg">
        <div class="msg-none" v-show="noneMsg">暂无消息</div>
        <div class="msg-list" v-for='(item, index) of msgList' :key="index" v-show="msgDiv" @click="msgDetailsClicked(item)">
          <div class="flex-row-between">
            <div class="msg-list-title"><i style="color: red;font-weight: 900;">·</i> {{item.title}}</div>
          </div>
          <div class="msg-list-text">{{item.content}}</div>
        </div>
        <div class="msg-list2" v-for='(item, index) of msgList' :key="index" v-show="msgDiv2" @click="msgDetailsClicked(item)">
          <div class="flex-row-between">
            <div class="msg-list-title2">{{item.title}}</div>
          </div>
          <div class="msg-list-text2">{{item.content}}</div>
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
  name: 'CoMsg',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '消息',
      msgList: [],
      noneMsg: true,
      msgDiv: false,
      msgDiv2: false
    }
  },
  created () {},
  computed: {},
  methods: {
    loadData () {
      this.show1 = false
      let _this = this
      let formData = new FormData()
      formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
      formData.append('userType', 1)
      _this.$_HTTPData.getMsgList(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          _this.msgList = res.result
          _this.msgList.isReaded = res.result.isReaded
          for (let i = 0; i < _this.msgList.length; i++) {
            if (_this.msgList.length === 0) {
              _this.noneMsg = true
              _this.msgDiv = false
              _this.msgDiv2 = false
            } else if (_this.msgList.isReaded === 0) {
              _this.noneMsg = false
              _this.msgDiv = true
              _this.msgDiv2 = false
            } else if (_this.msgList.isReaded === 1) {
              _this.noneMsg = false
              _this.msgDiv = false
              _this.msgDiv2 = true
            }
          }
        } else {
          lib.MessageAlert_Error(res.message)
        }
      })
    },
    msgDetailsClicked (item) {
      this.$router.push(`/user/msg/${item.title}/${item.content}`)
    }
  },
  mounted () {
    this.loadData()
  },
  watch: {}
}
</script>
<style scoped>
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;}
  .msg{padding: 0.2rem;}
  .msg-none{text-align: center;font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(153,153,153,1);padding: 0.6rem 0;}
  .msg .msg-list{padding: 0.2rem 0;border-bottom: 0.01rem solid #E8E8E8;}
  .msg .msg-list .msg-list-title{font-size:0.17rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(249,91,64,1);}
  .msg .msg-list .msg-list-time{font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(143,143,143,1);}
  .msg .msg-list .msg-list-text{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);padding-top: 0.17rem;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp:2;-webkit-box-orient: vertical;}
  .msg .msg-list2{padding: 0.2rem 0;border-bottom: 0.01rem solid #E8E8E8;}
  .msg .msg-list2 .msg-list-title2{font-size:0.17rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);}
  .msg .msg-list2 .msg-list-time{font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(143,143,143,1);}
  .msg .msg-list2 .msg-list-text2{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);padding-top: 0.17rem;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp:2;-webkit-box-orient: vertical;}
</style>
