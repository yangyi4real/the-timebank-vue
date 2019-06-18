<template>
  <div class="navbar">
    <div class="left-btn" @click="leftItemTouched">
      <i class="iconfont iconxiazai6"></i>
    </div>
    <div class="item title">
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['title'],
  name: 'Navbar',
  components: {},
  data () {
    return {}
  },
  computed: {},
  methods: {
    leftItemTouched () {
      this.$router.go(-1)
      console.log('进来了')
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 0.66rem;
    z-index: 10;
    text-align: center;
    background: #f5f5f5;
  }
  .navbar .item {
    min-width: 0.2rem;
  }
  .navbar .left-btn {
    text-align: left;
    margin-left: 0.1rem;
    padding: 0.1rem 0;
    user-select: none;
    color: black;
    font-size: 0.18rem;
  }
  .navbar .left-btn:active {
    color: #dcbc6c;
  }
  .navbar .title {
    padding: 0.2rem 0;
    user-select: none;
    color: black;
    font-size: 0.2rem;
    font-family:PingFangSC-Semibold;
    font-weight:600;
    flex: 1;
    text-align: center;
  }
  .navbar .right-btn {
    width: 0.6rem;
    margin-right: 0.1rem;
    padding: 0.12rem 0 0.08rem 0;
    user-select: none;
    color: black;
    font-size: 0.15rem;
    text-align: right;
  }
  .navbar .right-btn:active {
    color: #dcbc6c;
  }
</style>
