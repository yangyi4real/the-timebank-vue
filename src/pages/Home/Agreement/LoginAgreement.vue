<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      协议
    </div>
  </div>
</template>

<script>
import Navbar from '../../../views/navbar/navbar'
// import TipsTools from '../../../common/TipsTools'
// let lib = new TipsTools()
export default {
  name: 'LoginAgreement',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '注册协议'
    }
  },
  computed: {},
  methods: {},
  mounted () {}
}
</script>

<style scoped>
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;}
</style>
