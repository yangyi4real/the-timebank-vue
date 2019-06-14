<template>
  <div id="app" style="margin-bottom: 2rem">
    <router-view v-if="isRouterAlive"></router-view>
    <login-embedded v-if="showLogin"></login-embedded>
    <register-embedded v-if="showRegister"></register-embedded>
  </div>
</template>

<script>
import UserModel from './store/UserModel'
import {SET_USER_INFO} from './store/MutationTypes'
import LoginEmbedded from './pages/Home/LoginEmbedded'
import RegisterEmbedded from './pages/Home/RegisterEmbedded'
export default {
  components: {
    RegisterEmbedded,
    LoginEmbedded
  },
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isRouterAlive: true
    }
  },
  computed: {
    showLogin () {
      return this.$store.state.showGlobalLogin
    },
    showRegister () {
      return this.$store.state.showGlobalRegister
    }
  },
  mounted () {
    console.log(this.$store.state.showGlobalLogin)
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(function () {
        console.log('进来了')
        this.isRouterAlive = true
      })
    }
  },
  beforeCreate () {
    if (this.$SaiLei.cookiesGet('user_info')) {
      this.$store.dispatch(SET_USER_INFO, new UserModel(this.$SaiLei.cookiesGet('user_info')))
    }
    if (this.$SaiLei.cookiesGet('user_id')) {
      this.$store.dispatch(SET_USER_INFO, new UserModel(this.$SaiLei.cookiesGet('user_id')))
    }
    let _this = this
    window.onfocus = function () {
      if (_this.$SaiLei.cookiesGet('user_info')) {
        _this.$store.dispatch(SET_USER_INFO, new UserModel(_this.$SaiLei.cookiesGet('user_info')))
      }
      if (_this.$SaiLei.cookiesGet('user_id')) {
        _this.$store.dispatch(SET_USER_INFO, new UserModel(_this.$SaiLei.cookiesGet('user_id')))
      }
    }
  }
}
</script>

<style>
  html,body {width: 100%; margin: 0;padding: 0;font-family: MicrosoftYaHei;}
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin: 0;
    padding: 0;
    position: relative;
    width: 100%;
    overflow-y: auto;
  }
  .body {width: 100%;top: 0;left: 0;height: auto;}
  ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color: #A7A7A7;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: #A7A7A7;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: #A7A7A7;
  }
  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: #A7A7A7;
  }
  p{ -webkit-margin-before: 0;
    -webkit-margin-after: 0;}
  img {display: inline-block;}
  a {text-decoration: none;}
  .clearfix:before,.clearfix:after {  /*清楚浮动*/  content:"";  display:table;  }
  .clearfix:after {clear:both;}
  .clearfix {*zoom:1;/*IE/7/6*/}
  .fl{float: left}
  .fr{float: right}
  .text-center{text-align: center}
  .text-left{text-align: left}
  .text-right{text-align: right;}
  .flex-row-between {display: flex;flex-direction: row;justify-content: space-between;align-items: center;}
  .flex-row-around {display: flex;flex-direction: row;justify-content: space-around;align-items: center;}
  .flex-row-around-right {display: flex;flex-direction: row-reverse;justify-content: space-around;align-items: center;}
  .flex-row-start {display: flex;flex-direction: row;justify-content: flex-start;align-items: center;}
  .flex-row-end{display: flex;flex-direction: row;justify-content: flex-end;align-items: center;}
  .font-size-14{font-size: 0.14rem;}
  .font-size-15{font-size: 0.15rem;}
  .font-family-reg{font-family:PingFangSC-Regular;}
  .font-weight-400{font-weight: 400}
  /* color */
  .main-color{color: #F95B40;}
  .a7-color{color: #A7A7A7}
  .black-color{color: rgba(0,0,0,1);}
  .color-333{color: #333}
  .color-999{color: #999}
  /*ydui*/
  .tabbar .yd-tabbar-txt{font-size: 0.15rem!important;}
  .basedata-list .yd-datetime-input{font-size:0.16rem!important;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .basedata-list .yd-cell-box{margin-bottom: 0!important;}
  .basedata-list .yd-cell{background: 0;position: static!important;}
  .basedata-list .yd-cell-right{padding: 0!important;}
  .search .yd-search-input>.search-input .search-icon{padding-left: 0.8rem!important;}
  .search .yd-search-input>.search-input .search-icon:after{color:rgba(249,91,64,1)!important;}
  .search .yd-search-input{background-color: #fff!important;padding: 0.05rem 0 0.05rem 0.05rem!important;border-radius: 0.2rem;}
  .search .yd-input>input{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;}
  .CoData-list .yd-datetime-input{font-size:0.16rem!important;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);}
  .CoData-list .yd-cell-box{margin-bottom: 0!important;}
  .CoData-list .yd-cell{background: 0;position: static!important;}
  .CoData-list .yd-cell-right{padding: 0!important;}
  .payment-btn .yd-btn-primary{background:rgba(249,91,64,1)!important;}
  /*.main-center-title-star .yd-rate a{background:rgba(232,232,232,1);}*/
  /*按钮黄框黑色字*/
  .btn-border-black{width:2.36rem;height:0.48rem;border-radius:0.05rem;line-height: 0.48rem;font-size: 0.17rem;font-family:PingFangSC-Medium;font-weight:500;text-align: center;margin: 0 auto;border: 0.01rem solid #F95B40}
  /*按钮背景色透明*/
  /*.btn-border-opacity{width:2.36rem;height:0.48rem;border-radius:0.05rem;line-height: 0.48rem;font-size: 0.17rem;font-family:PingFangSC-Medium;font-weight:500;text-align: center;margin: 0 auto;border: 0.01rem solid #F95B40;background:rgba(249,91,64,1);opacity:0.4966;color:rgba(255,255,255,1);}*/
  .btn-border-opacity{width:2.36rem;height:0.48rem;border-radius:0.05rem;line-height: 0.48rem;font-size: 0.17rem;font-family:PingFangSC-Medium;font-weight:500;text-align: center;margin: 0 auto;border: 0.01rem solid #F95B40;background:rgba(249,91,64,1);color:rgba(255,255,255,1);}
  /*按钮背景色不透明*/
  .btn-border{width:2.36rem;height:0.48rem;border-radius:0.05rem;line-height: 0.48rem;font-size: 0.17rem;font-family:PingFangSC-Medium;font-weight:500;text-align: center;margin: 0 auto;border: 0.01rem solid #F95B40;background:rgba(249,91,64,1);color:rgba(255,255,255,1);}
  .treeselect .vue-treeselect__multi-value-item{color: #fff;background: rgba(249,91,64,1);}
  .treeselect .vue-treeselect__value-remove{color: #fff;}
  .treeselect .vue-treeselect__checkbox--checked{background: rgba(249,91,64,1)!important;border: 0.01rem solid rgba(249,91,64,1)!important;}
  .treeselect .vue-treeselect__indent-level-0 .vue-treeselect__option{padding-top: 0.1rem;padding-bottom: 0.1rem;}
  .wh_content_all{
    font-family: -apple-system,BlinkMacSystemFont,PingFang SC,Helvetica Neue,STHeiti,Microsoft Yahei,Tahoma,Simsun,sans-serif;
    background-color: #fff!important;
    width: 100%!important;
    overflow: hidden!important;
    padding-bottom: 0.08rem!important;
  }
  .wh_content_item, wh_content_item_tag{
    font-size: 0.19rem;
    width: 14.2% !important;
    text-align: center;
    color: #999!important;
    position: relative;
    border: 0.01rem solid #ccc;
    font-family:PingFangSC-Semibold;
    font-weight:600;
  }
  .wh_top_changge li {
    cursor: pointer;
    display: flex;
    color: #999!important;
    font-size: 18px;
    flex: 1;
    justify-content: center;
    align-items: center;
    height: 47px;
  }
  .wh_jiantou1{
    width: 12px;
    height: 12px;
    border-top: 2px solid #999!important;
    border-left: 2px solid #999!important;
    transform: rotate(-45deg);
  }
  .wh_jiantou2{
    width: 12px;
    height: 12px;
    border-top: 2px solid #999!important;
    border-right: 2px solid #999!important;
    transform: rotate(45deg);
  }
  .wh_content_item .wh_chose_day{
    background: none!important;
    border-radius: 0!important;
    border: 0.02rem solid rgba(249,91,64,1)!important;
    color: #999!important
  }
  .wh_item_date, .wh_top_tag{
    width: 100%!important;
    height: 0.38rem!important;
    line-height: 0.38rem!important;
  }
  .wh_content_item .wh_isToday {
    background: none!important;
    border-radius: 100px;
  }
  .calendar .wh_content_item{height: auto!important;}
  .calendar .wh_content_item .wh_isToday {
    background: none!important;
    border-radius: 0.05rem!important;
    border: 0.01rem solid rgba(249,91,64,1)!important;
    color: rgba(249,91,64,1)!important;
  }
</style>
