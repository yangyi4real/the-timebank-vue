<template>
  <div class="body">
    <div class="home-nav text-center">
      定制服务
    </div>
    <div class="wapper">
      <div class="customized">
        <div class="customized-list">
          <div class="banner2">
            <swiper :options="swiperOption">
              <swiper-slide><img src="../../../assets/icon/qiye.jpg"></swiper-slide>
              <swiper-slide><img src="../../../assets/icon/dingzhi.jpg"></swiper-slide>
            </swiper>
            <div class="swiper-pagination"></div>
          </div>
          <div class="customized-list-div">
            <div class="flex-row-between">
              <div class="customized-list-left">服务包名称</div>
              <div class="customized-list-right">20000元<span class="span-position">2999元</span></div>
            </div>
            <div class="customized-list-label flex-row-start">
              <div>自选讲课方向</div>
              <div>认证高端讲师</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <tabbar-ent :idx="1"></tabbar-ent>
  </div>
</template>

<script>
import TabbarEnt from '../../../views/Tabbar/TabbarEnt'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'ReserveIndex',
  components: {
    TabbarEnt,
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        },
        speed: 1000,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          progressbarOpposite: true,
          paginationClickable: true,
          dynamicBullets: true,
          dynamicMainBullets: 2,
          hideOnClick: true,
          clickable: true
        }
      }
    }
  },
  computed: {
  },
  methods: {},
  mounted () {}
}
</script>

<style scoped>
  .home-nav{padding: 0.2rem 0 0.1rem 0;font-size: 0.2rem;font-family:PingFangSC-Semibold;font-weight:600;}
  .wapper{border-radius:0.05rem;margin: 0 0.1rem;text-align: center;}
  .customized .customized-list{padding: 0.2rem 0;}
  .customized .customized-list .banner2{margin-bottom: 0.1rem;position: relative;}
  .customized .customized-list .banner2 img{width: 100%;height: 1.66rem;}
  .customized .customized-list .customized-list-div{background:rgba(255,255,255,1);padding: 0.3rem 0.2rem;}
  .customized .customized-list .customized-list-left{font-size:0.17rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);}
  .customized .customized-list .customized-list-right{font-size:0.16rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(249,91,64,1);}
  .customized .customized-list .customized-list-right span{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(167,167,167,1);text-decoration: line-through;padding-left: 0.1rem;}
  .customized .customized-list .customized-list-label{padding-top: 0.15rem;}
  .customized .customized-list .customized-list-label div{width: 1rem;height: 0.28rem;background:rgba(249,91,64,1);border-radius:0.05rem;color: #fff;font-size:14px;font-family:PingFangSC-Regular;font-weight:400;line-height: 0.28rem;text-align: center;margin-right: 0.1rem;}
</style>
