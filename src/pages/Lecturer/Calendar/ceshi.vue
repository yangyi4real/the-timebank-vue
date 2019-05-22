<!--<template>-->
<!--<div class='body'>-->
<!--<Calendar-->
<!--v-on:choseDay = 'clickDay'-->
<!--v-on:changeMonth = 'changeDate'-->
<!--v-on:isToday = 'clickToday'-->
<!--:markDate = arr-->
<!--:markDateMore = arr-->
<!--:agoDayHide = time-->
<!--:futureDayHide = time2-->
<!--:sundayStart = 'true'></Calendar>-->
<!--</div>-->
<!--</template>-->

<!--<script>-->
<!--import Calendar from 'vue-calendar-component'-->
<!--export default {-->
<!--nam: 'ceshi',-->
<!--components: {-->
<!--Calendar-->
<!--},-->
<!--data () {-->
<!--return {-->
<!--time: '1554048000',-->
<!--time2: '1561910399',-->
<!--arr: [{date: '2019/5/20', className: 'mark1'}, {date: '2019/5/21', className: 'mark2'}]-->
<!--}-->
<!--},-->
<!--computed: {},-->
<!--methods: {-->
<!--clickDay (data) {-->
<!--console.log('选中了' + data)-->
<!--},-->
<!--changeDate (data) {-->
<!--console.log(data)-->
<!--},-->
<!--clickToday (data) {-->
<!--console.log(data)-->
<!--}-->
<!--},-->
<!--mounted () {}-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
<template>
  <div class='content'>
    <!-- agoDayHide='1517483961' -->
    <!-- futureDayHide='1526054400' -->
    <Calendar
      ref='Calendar'
      :markDateMore='arr'
      v-on:isToday='clickToday'
      agoDayHide='1554048000'
      futureDayHide='1561910399'
      :sundayStart = 'true'
      v-on:choseDay='clickDay'
      v-on:changeMonth='changeDate'
    ></Calendar>
  </div>
</template>

<script>
// import Calendar from '../vue-calendar-component/index';
import Calendar from 'vue-calendar-component'
export default {
  data () {
    return {
      arr: [
        {
          date: '2019-4-15',
          className: 'mark1'
        },
        {
          date: '2019-5-13',
          className: 'mark1'
        }
      ]
    }
  },
  components: {
    Calendar
  },
  methods: {
    clickDay (data) {
      console.log('选中了', data)
    },
    clickToday (data) {
      console.log('跳到了本月今天', data)
    },
    changeDate (data) {
      console.log('左右点击切换月份', data)
    }
  },
  created () {
  }
}
</script>

<!-- Add 'scoped ' attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    text-align: center;
    width: 90%;
    margin: auto;
  }

  .div {
    margin: auto;
    width: 220px;
    height: 44px;
    line-height: 44px;
    background: #0fc37c;
    color: #fff;
    font-size: 17px;
    text-align: center;
    margin-top: 20px;
  }

  .wh_container >>> .mark1 {
    color: rgba(249,91,64,1);
  }

  .wh_container >>> .mark2 {
    background-color: blue;
  }
  .wh_content_item > .wh_isMark {
    background: orange;
  }
  .wh_container >>> .wh_content_all {
    /* background-color: red; */
  }
</style>
