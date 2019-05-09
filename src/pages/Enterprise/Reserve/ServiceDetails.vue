<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="main">
        <div class="banner">
          <img src="" >
        </div>
        <div class="main-center">
          <div class="main-center-title">
            <div class="main-center-title-name flex-row-start">
              <div class="name">服务包名称&nbsp;&nbsp;&nbsp;</div>
              <div class="btn">自选讲课方向</div>
              <div class="btn">认证高端讲师</div>
            </div>
            <div class="main-center-title-star flex-row-start"></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../../views/navbar/navbar'
export default {
  name: 'ServiceDetails',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '服务详情'
    }
  },
  computed: {},
  methods: {
    // OrderDetailsClick () {
    //   this.$router.push('/user/OrderDetails')
    // }
  },
  mounted () {}
}
</script>

<style scoped>
  .wapper{border-radius:0.05rem;margin: 0.66rem 0.1rem;}
  .main .banner{margin-bottom: 0.1rem;}
  .main .banner img{width: 100%;height: 1.66rem;}
  .main-center{background:rgba(255,255,255,1);padding: 0 0.2rem;}
  .main-center .main-center-title{border-bottom: 0.01rem solid #E8E8E8;padding: 0.2rem 0;}
  .main-center .main-center-title .main-center-title-name .name{font-size:0.17rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);}
  .main-center .main-center-title .main-center-title-name .btn{width: 1rem;height: 0.28rem;background:rgba(249,91,64,1);border-radius:0.05rem;color: #fff;font-size:14px;font-family:PingFangSC-Regular;font-weight:400;line-height: 0.28rem;text-align: center;margin-left: 0.1rem;}
</style>
