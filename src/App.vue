<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {}
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
  .btn-border-opacity{width:2.36rem;height:0.48rem;border-radius:0.05rem;line-height: 0.48rem;font-size: 0.17rem;font-family:PingFangSC-Medium;font-weight:500;text-align: center;margin: 0 auto;border: 0.01rem solid #F95B40;background:rgba(249,91,64,1);opacity:0.4966;color:rgba(255,255,255,1);}
  /*按钮背景色不透明*/
  .btn-border{width:2.36rem;height:0.48rem;border-radius:0.05rem;line-height: 0.48rem;font-size: 0.17rem;font-family:PingFangSC-Medium;font-weight:500;text-align: center;margin: 0 auto;border: 0.01rem solid #F95B40;background:rgba(249,91,64,1);color:rgba(255,255,255,1);}
</style>
