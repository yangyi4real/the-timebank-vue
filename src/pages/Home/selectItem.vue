<template>
  <div class='body'>
    <div class='job index'>
      <ceshi-select :filterData='filterData' @select='selectItem'></ceshi-select>
    </div>
  </div>
</template>

<script>
import ceshiSelect from './ceshiSelect'
export default {
  name: 'selectItem',
  components: {
    ceshiSelect
  },
  mehtods: {
    data () {
      return {}
    },
    setFilter () {
      let data = [
        {
          name: '经验',
          key: 'jingyan',
          options: [
            {'key': '0', 'name': '不限'},
            {'key': '1', 'name': '应届生'},
            {'key': '2', 'name': '1年以内'},
            {'key': '3', 'name': '1-3年'}
          ]
        },
        {
          name: '学历',
          key: 'xueli',
          options: [
            {'key': '0', 'name': '不限'},
            {'key': '1', 'name': '初中及以下'},
            {'key': '2', 'name': '中专'},
            {'key': '3', 'name': '高中'}
          ]
        },
        {
          name: '薪资',
          key: 'xinzi',
          options: [
            {'key': '0', 'name': '不限'},
            {'key': '1', 'name': '3K以下'},
            {'key': '2', 'name': '3-5K'},
            {'key': '3', 'name': '5-8K'}
          ]
        },
        {
          name: '经验',
          key: 'jingyan',
          options: [
            {'key': '0', 'name': '不限'},
            {'key': '1', 'name': '无经验'},
            {'key': '2', 'name': '1年以内'},
            {'key': '3', 'name': '1-3年'}
          ]
        },
        {
          name: '行业',
          key: 'hangye',
          options: [
            {'key': '0', 'name': '不限'},
            {'key': '1', 'name': '金融'},
            {'key': '2', 'name': '互联网'},
            {'key': '3', 'name': '服务'}
          ]
        }
      ]
      this.filterData = data
      // 如果想默认选中值。不设置则默认选中第一项
      this.currenSelect = {
        'xinzi': '3'
      }
    },
    // 筛选中某项
    selectItem (query) {
      console.log(query)
      // 根据业务需要进行数据请求即可
      // 打印出对象: {jingyan: '0', xueli: '0', xinzi: '2', hangye: '0'}
    }
  }
}
</script>

<style scoped>

</style>
