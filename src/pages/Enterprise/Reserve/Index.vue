<template>
  <div class="body">
    <div class="home-nav text-center">
      定制服务
    </div>
    <div class="wapper">
      <img src=""/>
      <div class="customized">
        <div class="customized-list"></div>
      </div>
    </div>
    <tabbar-ent :idx="1"></tabbar-ent>
  </div>
</template>

<script>
import TabbarEnt from '../../../views/Tabbar/TabbarEnt'
export default {
  name: 'ReserveIndex',
  components: {
    TabbarEnt
  },
  data () {
    return {
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
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0 0.1rem;text-align: center;padding: 2rem 0;}
  .wapper img{width: 1.2rem;height: 0.5rem;}
  .wapper p{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(153,153,153,1);padding-top: 0.3rem;}
</style>
