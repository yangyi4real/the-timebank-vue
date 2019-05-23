<template>
  <div class="body">
    <div class="tabbar flex-row-around">
      <div v-for='(item,index) of items' :key="index" :class='[item.cls,{on:index === idx}]' @click="$router.push(item.push)">
        <img :src="index===idx?item.iconSelect:item.icon">
        <p :class="['colorChange',{on:index===idx}]" >{{item.name}}</p>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import yuke from '../../assets/icon/yueke.png'
import yukeActive from '../../assets/icon/yueke_active.png'
import rili from '../../assets/icon/rili.png'
import riliActive from '../../assets/icon/rili_active.png'
import wode from '../../assets/icon/wode.png'
import wodeAcitve from '../../assets/icon/wode_active.png'
export default{
  name: 'TabbarEnt',
  props: ['idx'],
  data () {
    return {
      items: [
        {
          cls: 'CustomizedIndex',
          name: '约课',
          push: '/customized/index',
          icon: yuke,
          iconSelect: yukeActive
        },
        {
          cls: 'ReserveIndex',
          name: '定制服务',
          push: '/reserve/index',
          icon: rili,
          iconSelect: riliActive
        },
        {
          cls: 'UserIndex',
          name: '我的',
          push: '/user/index',
          icon: wode,
          iconSelect: wodeAcitve
        }
      ]
    }
  }
}

</script>

<style scoped>
  .tabbar{width: 100%;height: 0.65rem; position: fixed;z-index: 100; bottom: 0;left: 0; display: flex;flex-direction: row;justify-content: space-around;align-items: center;background: #fff;text-align: center;}
  .tabbar div p{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);}
  .tabbar .on{color: #F95B40;}

</style>
