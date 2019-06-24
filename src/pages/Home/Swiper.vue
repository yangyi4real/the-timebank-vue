<template>
  <swiper :options="swiperOption" v-if="ready">
    <swiper-slide class="g-swiper-slide" v-for="(item, index) in bannerList" :key="index">
      <img :src="item.image" class="g-swiper-img">1111
    </swiper-slide>
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>
</template>
<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'HomeSwiper',
  components: {
    swiper,
    swiperSlide
  },
  props: ['datas'],
  data () {
    return {
      ready: true,
      bannerList: null,
      swiperOption: {
        autoHeight: true
      }
    }
  },
  mounted () {},
  computed: {},
  methods: {},
  watch: {
    datas () {
      this.bannerList = this.datas
    },
    bannerList () {
      let _this = this
      this.swiperOption = {
        direction: 'horizontal',
        speed: 1000,
        width: window.innerWidth,
        autoHeight: true,
        loop: true,
        touchRatio: 0.5,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          // type: 'progressbar',
          bottom: 0
        },
        on: {
          tap: function () {
            if (_this.bannerList[this.realIndex].url && _this.bannerList[this.realIndex].url.length > 0) {
              window.open(_this.bannerList[this.realIndex].url)
            } else {
              return false
            }
            console.log(_this.datas[this.realIndex].url)
            // window.location = self.datas[this.realIndex].img
          }
        }
      }
      this.ready = true
    }
  }
}
</script>
<style scoped>
  .g-swiper-img {width: 100%;height: 1.6rem;}
  .g-swiper-slide {width: 100%;height: 1.6rem;}
</style>
