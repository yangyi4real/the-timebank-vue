<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="msg-details">
        <div class="title">{{getTitle}}</div>
        <div class="content">
          {{getContent}}
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
  name: 'CoMsgDetails',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '消息详情'
    }
  },
  created () {},
  computed: {
    getTitle () {
      return this.$route.params.title
    },
    getContent () {
      return this.$route.params.content
    }
  },
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
  .msg-details{padding: 0.2rem;}
  .msg-details .title{font-size:0.17rem;font-family:PingFangSC-Medium;font-weight:500;color:#333;}
  .msg-details .content{padding-top: 0.1rem;line-height: 0.2rem;font-size:0.14rem;font-family:PingFangSC-Regular;text-indent: 0.28rem;padding-bottom: 0.3rem;}
</style>
