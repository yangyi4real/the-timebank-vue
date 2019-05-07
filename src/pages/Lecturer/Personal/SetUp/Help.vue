<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <yd-accordion accordion>
        <yd-accordion-item title="平台服务费是多少？">
          <div style="padding: .24rem;">1
          </div>
        </yd-accordion-item>
        <yd-accordion-item title="平台手续费怎么收取？">
          <div style="padding: .24rem;">2
          </div>
        </yd-accordion-item>
        <yd-accordion-item title="平台服务费是多少？">
          <div style="padding: .24rem;">3
          </div>
        </yd-accordion-item>
        <yd-accordion-item title="平台服务费是多少？">
          <div style="padding: .24rem;">4
          </div>
        </yd-accordion-item>
        <yd-accordion-item title="平台服务费是多少？">
          <div style="padding: .24rem;">5
          </div>
        </yd-accordion-item>
        <yd-accordion-item title="平台服务费是多少？">
          <div style="padding: .24rem;">6
          </div>
        </yd-accordion-item>
      </yd-accordion>
    </div>
  </div>
</template>

<script>
import Navbar from '../../../../views/navbar/navbar'
export default {
  name: 'Help',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '帮助中心'
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
