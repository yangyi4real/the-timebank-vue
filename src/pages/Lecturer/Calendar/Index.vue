<template>
  <div class="body">
    <div class="home-nav text-center">
      日历
    </div>
    <tabbar :idx="0"></tabbar>
  </div>
</template>

<script>
import Tabbar from '../../../views/Tabbar/Tabbar'
export default {
  name: 'CalendarIndex',
  components: {
    Tabbar
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
</style>
