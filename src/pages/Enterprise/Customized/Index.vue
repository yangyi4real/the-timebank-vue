<template>
  <div class="body">
    <div class="home-nav text-center">
      时间银行
    </div>
    <div class="search">
      <yd-search v-model="searchValue" :on-submit="submitHandler" placeholder="输入讲师名字或授课内容关键字"></yd-search>
    </div>
    <div class="banner">
      <img src="" />
    </div>
    <div class="wapper">
      <div class="class-select">
        <div>
          <select v-model="selected" @change='getValue'>
            <option value="" class="class-select-div">授课类别<i class="iconfont iconnv main-color"></i></option>
            <option v-for="(item,index) in optList" :key="index">{{ item }}</option>
          </select>
        </div>
      </div>
      <div class="class-list" v-show="classList">
        <div class="class-list-div flex-row-start">
          <div class="class-list-div-left">
            <img src=""/>
          </div>
          <div class="class-list-div-right" @click="pushDetailsClick">
            <label>王琼<i class="iconfont iconnv main-color"></i></label>
            <p>24岁 | 工作两年 | 青岛</p>
            <p><i class="iconfont iconqiwangzhiwei main-color"></i>产品经理/UI-设计…</p>
            <p><i class="iconfont iconditu main-color"></i>青岛/烟台/淄博/济南/潍坊</p>
            <p><i class="iconfont icongongzi main-color"></i>100元/小时</p>
          </div>
        </div>
      </div>
      <div class="class-list-none" v-show="classListNone">
        <p>完善企业信息</p>
        <p>通过审核后就可以进行约课啦</p>
        <div class="class-btn">
          <div class="btn-border" @click="pushClick">完善企业信息</div>
        </div>
      </div>
    </div>
    <tabbar-ent :idx="0"></tabbar-ent>
  </div>
</template>

<script>
import TabbarEnt from '../../../views/Tabbar/TabbarEnt'
export default {
  name: 'CustomizedIndex',
  components: {
    TabbarEnt
  },
  data () {
    return {
      searchValue: '',
      classList: true,
      classListNone: false,
      selected: '',
      optList: ['青龙', '白虎', '朱雀', '玄武']
    }
  },
  computed: {
  },
  methods: {
    submitHandler (value) {
      this.$dialog.toast({mes: `搜索：${value}`})
    },
    pushDetailsClick () {
      this.$router.push('/customized/details')
    },
    pushClick () {
      this.$router.push('/user/enterpriseInfo')
    },
    getValue () {
      console.log('您选择了', this.selected)
    }
  },
  mounted () {}
}
</script>

<style scoped>
  .home-nav{padding: 0.2rem 0 0.2rem 0;font-size: 0.2rem;font-family:PingFangSC-Semibold;font-weight:600;}
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0 0.1rem;text-align: center}
  .search{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;margin: 0 0.1rem;}
  .banner{margin: 0.1rem;}
  .banner img{width: 100%;height:1.6rem;}
  .class-select{padding: 0.15rem 0;border-bottom: 0.01rem solid #E8E8E8;margin: 0 0.2rem;}
  .class-list{margin: 0 0.2rem;}
  .class-list .class-list-div{padding: 0.2rem 0;}
  .class-list .class-list-div .class-list-div-left img{width:1.4rem;height:1.2rem;background:rgba(216,216,216,1);border-radius:0.05rem;}
  .class-list .class-list-div .class-list-div-right{text-align: left;padding-left: 0.2rem;}
  .class-list .class-list-div .class-list-div-right label{font-size:0.17rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);}
  .class-list .class-list-div .class-list-div-right label i{padding-left: 0.1rem;}
  .class-list .class-list-div .class-list-div-right p{font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);line-height: 0.3rem;}
  .class-list .class-list-div .class-list-div-right p i{padding-right: 0.1rem;}
  .class-list-none{padding: 0.6rem 0;}
  .class-list-none p{font-size:0.14rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(167,167,167,1);}
  .class-btn{margin: 0.5rem 0;}
  .class-select select{
    appearance:none!important;
    -moz-appearance:none!important;
    -webkit-appearance:none!important;
    border: 0.01rem solid #fff;
  }
  .class-select select{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);}
</style>
