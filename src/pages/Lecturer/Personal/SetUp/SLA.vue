<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="text">
        <p>Lorem ipsum dolor sit amet, consectetur adipi- -scing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget. Lorem ipsum dolor sit amet, consectetur adipi- -scing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.</p>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../../../views/navbar/navbar'
export default {
  name: 'SLA',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '服务协议'
    }
  },
  computed: {},
  methods: {},
  mounted () {}
}
</script>

<style scoped>
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;}
  .text{padding: 0.4rem 0.17rem}
  .text p{font-size: 0.16rem;  font-family:PingFangSC-Regular;  font-weight:400;  color:rgba(0,0,0,1);line-height: 0.24rem}
</style>
