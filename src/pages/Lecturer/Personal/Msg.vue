<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="msg">
        <div class="msg-none">暂无消息</div>
        <!--<div class="msg-list" v-for='(item, index) of msgList' :key="index">-->
          <!--<div class="flex-row-between">-->
            <!--<div class="msg-list-title">{{item.title}}</div>-->
            <!--<div class="msg-list-time">{{item.time}}</div>-->
          <!--</div>-->
          <!--<div class="msg-list-text">{{item.text}}</div>-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../../views/navbar/navbar'
export default {
  name: 'Msg',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '消息',
      msgList: [
        {title: '企业约课提醒', time: '2019-02-21 20:22:45', text: 'consectetur adipiscing elit. Aenean euismod bi '},
        {title: '企业约课提醒', time: '2019-02-21 20:22:45', text: 'consectetur adipiscing elit. Aenean euismod bi '},
        {title: '企业约课提醒', time: '2019-02-21 20:22:45', text: 'consectetur adipiscing elit. Aenean euismod bi '}
      ]
    }
  },
  created () {},
  computed: {},
  methods: {},
  mounted () {},
  watch: {}
}
</script>
<style scoped>
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;}
  .msg{padding: 0.2rem;}
  .msg-none{text-align: center;font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(153,153,153,1);padding: 0.6rem 0;}
  .msg .msg-list{padding: 0.2rem 0;border-bottom: 0.01rem solid #E8E8E8;}
  .msg .msg-list .msg-list-title{font-size:0.17rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);}
  .msg .msg-list .msg-list-time{font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(143,143,143,1);}
  .msg .msg-list .msg-list-text{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);padding-top: 0.17rem;}
</style>
