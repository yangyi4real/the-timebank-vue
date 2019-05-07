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

export default{
  name: 'Tabbar',
  props: ['idx'],
  data () {
    return {
      items: [
        {
          cls: 'CalendarIndex',
          name: '日历',
          push: '/calendar/index',
          icon: '',
          iconSelect: ''
        },
        {
          cls: 'CourseIndex',
          name: '约课',
          push: '/course/index',
          icon: '',
          iconSelect: ''
        },
        {
          cls: 'PersonalIndex',
          name: '我的',
          push: '/personal/index',
          icon: '',
          iconSelect: ''
        }
      ]
    }
  }
}

</script>

<style scoped>
  .tabbar{width: 100%;height: 0.65rem; position: fixed;z-index: 100; bottom: 0;left: 0; display: flex;flex-direction: row;justify-content: space-around;align-items: center;background: #fff;}
  .tabbar div p{font-size:0.15rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(51,51,51,1);}
  .tabbar .on{color: #F95B40;}

</style>
