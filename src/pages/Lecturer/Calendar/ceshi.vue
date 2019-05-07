<template>
  <div class="body">
    <Calendar
      v-on:choseDay = "clickDay"
      v-on:changeMonth = "changeDate"
      v-on:isToday = "clickToday"
      :agoDayHide= time
      :futureDayHide= time2
      :sundayStart = "true"></Calendar>
  </div>
</template>

<script>
import Calendar from 'vue-calendar-component'
export default {
  nam: 'ceshi',
  components: {
    Calendar
  },
  data () {
    return {
      time: '1554825600',
      time2: '1555689600'
    }
  },
  filters: {
    formatDate (value) {
      let date = new Date(value)
      let y = date.getFullYear()
      let MM = date.getMonth() + 1
      MM = MM < 10 ? ('0' + MM) : MM
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      return y + '/' + MM + '/' + d
    }
  },
  computed: {},
  methods: {
    clickDay (data) {
      console.log('选中了' + data)
    },
    changeDate (data) {
      console.log(data)
    },
    clickToday (data) {
      console.log(data)
    }
  },
  mounted () {}
}
</script>

<style scoped>

</style>
