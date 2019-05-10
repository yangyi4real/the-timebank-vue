<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="intention-main">
        <div class="intention-list flex-row-between">
          <div>技能标签</div>
          <div><i class="iconfont iconjiantou"></i></div>
        </div>
        <div class="intention-list flex-row-between">
          <div>意向地点</div>
          <div><i class="iconfont iconjiantou"></i></div>
        </div>
        <div class="intention-list flex-row-between" style="border: 0">
          <div>意向薪酬</div>
          <div>
            <input type="text" v-model="Pay" placeholder="元/小时"/>
          </div>
        </div>
      </div>
      <div class="intention-btn">
        <div @click="pushClick" :class="{ 'btn-border-opacity': inOperation, 'btn-border': operation}">下一步</div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../../../views/navbar/navbar'
export default {
  name: 'Intention',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '存储意向',
      Pay: '',
      inOperation: true, // 灰色按钮
      operation: false
    }
  },
  created () {},
  computed: {},
  methods: {
    pushClick () {
      this.$router.push('/personal/information/profile')
    }
    // inputValue () {
    //   if (this.name !== '' && this.birthDate !== '' && this.workDate !== '' && this.EMail !== '' && this.areaValue !== '') {
    //     this.inOperation = false
    //     this.operation = true
    //   } else {
    //     this.inOperation = true
    //     this.operation = false
    //   }
    // }
  },
  mounted () {},
  watch: {
    // inputValue () {
    //   if (this.name !== '' && this.birthDate !== '' && this.workDate !== '' && this.EMail !== '' && this.areaValue !== '') {
    //     this.inOperation = false
    //     this.operation = true
    //   } else {
    //     this.inOperation = true
    //     this.operation = false
    //   }
    // }
  }
}
</script>

<style scoped>
  input:focus {outline: none;}
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;}
  .intention-main{margin: 0 0.2rem;padding: 0.2rem 0 0.4rem 0;}
  .intention-main .intention-list{padding-top: 0.2rem;padding-bottom: 0.15rem;font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);border-bottom: 0.01rem solid #E8E8E8;}
  .intention-main .intention-list i{padding-left: 0.15rem;}
  .intention-main .intention-list input{border: 0;outline: none;background-color: rgba(0, 0, 0, 0);font-size: 0.16rem;text-align: right;
    font-family:PingFangSC-Regular;font-weight:400;}
  .intention-btn{padding-bottom: 1rem;padding-top: 0.3rem;}
</style>
