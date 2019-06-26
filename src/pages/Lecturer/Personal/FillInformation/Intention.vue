<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper" v-show="showList">
      <div class="intention-main">
        <div class="intention-list flex-row-between" @click="showSub1">
          <div>技能标签</div>
          <div style="min-width: 0;text-overflow: ellipsis;overflow: hidden; white-space: nowrap;width: 1rem;display: block">{{skillLevelValue}}</div>
          <div><i class="iconfont iconjiantou"></i></div>
        </div>
        <div class="intention-list flex-row-between" @click="showSub2">
          <div>意向地点</div>
          <div style="min-width: 0;text-overflow: ellipsis;overflow: hidden; white-space: nowrap;width: 2rem;display: block">{{expectLocation}}</div>
          <div><i class="iconfont iconjiantou"></i></div>
        </div>
        <div class="intention-list flex-row-between" style="border: 0">
          <div>意向薪酬</div>
          <div>
            <input type="text" v-model="price" placeholder="请输入金额 "/> 元/小时
          </div>
        </div>
      </div>
      <div class="intention-btn">
        <div @click="pushClick" :class="{ 'btn-border-opacity': inOperation, 'btn-border': operation}">保存</div>
      </div>
    </div>
    <div class="wapper" v-show="sub1">
      <div class="treeselect">
        <div class="flex-row-between">
          <treeselect class="treeselect-input" v-model="skillLevel" :multiple="true" :alwaysOpen="true" :options="skillOptions" :flat="true" :show-count="true" :flatten-search-results="true" placeholder="请输入技能" :searchable="true" :limit='5'/>
          <div class="treeselectBtn" @click="treeselectBtn">完成</div>
        </div>
      </div>
    </div>
    <div class="wapper" v-show="sub2">
      <div class="treeselect">
        <div class="flex-row-between">
          <treeselect class="treeselect-input" v-model="areaValue" :multiple="true" :disable-branch-nodes="true" :alwaysOpen="true" :options="areaOptions" :flat="true" :show-count="true" :flatten-search-results="true" placeholder="请选择地点" :searchable="true" :limit='5'/>
          <div class="treeselectBtn" @click="treeselectBtn2">完成</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AreaJson from '../../../../common/areaCodeSelect'
import Navbar from '../../../../views/navbar/navbar'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import TipsTools from '../../../../common/TipsTools'
let lib = new TipsTools()
export default {
  name: 'Intention',
  components: {
    Navbar,
    Treeselect
  },
  data () {
    return {
      areaValue: null,
      skillLevel: null,
      areaIsDisabled: false,
      skillOptions: [
        {
          id: '行业经验',
          label: '行业经验',
          isDisabled: false,
          children: [
            {
              id: '市场',
              isDisabled: false,
              label: '市场'
            },
            {
              id: '销售',
              isDisabled: false,
              label: '销售'
            },
            {
              id: '运营',
              isDisabled: false,
              label: '运营'
            },
            {
              id: '人力',
              isDisabled: false,
              label: '人力'
            },
            {
              id: '财务',
              isDisabled: false,
              label: '财务'
            },
            {
              id: '金融',
              isDisabled: false,
              label: '金融'
            },
            {
              id: '餐饮',
              isDisabled: false,
              label: '餐饮'
            },
            {
              id: '零售',
              isDisabled: false,
              label: '零售'
            },
            {
              id: '法律',
              isDisabled: false,
              label: '法律'
            },
            {
              id: '品牌管理',
              isDisabled: false,
              label: '品牌管理'
            },
            {
              id: '新媒体营销',
              isDisabled: false,
              label: '新媒体营销'
            },
            {
              id: '公关传播',
              isDisabled: false,
              label: '公关传播'
            },
            {
              id: '商业合作',
              isDisabled: false,
              label: '商业合作'
            },
            {
              id: '市场调研',
              isDisabled: false,
              label: '市场调研'
            },
            {
              id: '应用推广',
              isDisabled: false,
              label: '应用推广'
            },
            {
              id: '整合营销',
              isDisabled: false,
              label: '整合营销'
            },
            {
              id: '职业技能培训',
              isDisabled: false,
              label: '职业技能培训'
            },
            {
              id: '职业规划',
              isDisabled: false,
              label: '职业规划'
            }
          ]
        },
        {
          id: '互联网+',
          label: '互联网+',
          isDisabled: false,
          children: [
            {
              id: '产品设计',
              isDisabled: false,
              label: '产品设计'
            },
            {
              id: '研发管理',
              isDisabled: false,
              label: '研发管理'
            },
            {
              id: '测试管理',
              isDisabled: false,
              label: '测试管理'
            },
            {
              id: '数据分析',
              isDisabled: false,
              label: '数据分析'
            },
            {
              id: '新媒体运营',
              isDisabled: false,
              label: '新媒体运营'
            },
            {
              id: '活动运营',
              isDisabled: false,
              label: '活动运营'
            },
            {
              id: '产品运营',
              isDisabled: false,
              label: '产品运营'
            },
            {
              id: '用户运营',
              isDisabled: false,
              label: '用户运营'
            },
            {
              id: '内容运营',
              isDisabled: false,
              label: '内容运营'
            },
            {
              id: '网络运营',
              isDisabled: false,
              label: '网络运营'
            },
            {
              id: '商业数据分析',
              isDisabled: false,
              label: '商业数据分析'
            }
          ]
        },
        {
          id: '创业和投资融',
          label: '创业和投资融',
          isDisabled: false,
          children: [
            {
              id: '团队搭建',
              isDisabled: false,
              label: '团队搭建'
            },
            {
              id: '股权分配',
              isDisabled: false,
              label: '股权分配'
            },
            {
              id: '商业计划',
              isDisabled: false,
              label: '商业计划'
            },
            {
              id: '融资',
              isDisabled: false,
              label: '融资'
            },
            {
              id: '商业模式',
              isDisabled: false,
              label: '商业模式'
            },
            {
              id: '创业经验',
              isDisabled: false,
              label: '创业经验'
            },
            {
              id: '风险投资',
              isDisabled: false,
              label: '风险投资'
            },
            {
              id: '资本投资服务',
              isDisabled: false,
              label: '资本投资服务'
            },
            {
              id: '创业方法论',
              isDisabled: false,
              label: '创业方法论'
            }
          ]
        },
        {
          id: '心理',
          label: '心理',
          isDisabled: false,
          children: [
            {
              id: '个人成长',
              isDisabled: false,
              label: '个人成长'
            },
            {
              id: '情绪压力',
              isDisabled: false,
              label: '情绪压力'
            },
            {
              id: '职场心理',
              isDisabled: false,
              label: '职场心理'
            }
          ]
        }
      ],
      areaOptions: AreaJson,
      titleMsg: '存储意向',
      price: '',
      showList: true,
      sub1: false,
      sub2: false,
      inOperation: true, // 灰色按钮
      operation: false,
      isDisabledSkill: null,
      expectLocation: null,
      skillLevelValue: null
    }
  },
  created () {},
  computed: {},
  mounted () {
    let temp = JSON.stringify(AreaJson)
    let temp2 = temp.replace(/v/g, 'id')
    let temp3 = temp2.replace(/n/g, 'label')
    let temp4 = temp3.replace(/c/g, 'children')
    this.areaOptions = JSON.parse(temp4)
  },
  methods: {
    /**
     * 验证输入框的值
     * @return {boolean}
     */
    checkInputValue () {
      if (this.skillLevel === '') {
        lib.MessageAlert_Error('请选择技能标签')
        return false
      }
      if (this.areaValue === '') {
        lib.MessageAlert_Error('请选择意向地点')
        return false
      }
      if (this.price === '') {
        lib.MessageAlert_Error('请输入金额')
        return false
      }
      if (this.price % 1 !== 0) {
        lib.MessageAlert_Error('请输入整数金额')
        return false
      }
      return true
    },
    treeselectBtn () {
      if (this.skillLevel.length > 5) {
        lib.MessageAlert_Error('技能标签不得超过5个')
      } else {
        this.sub1 = false
        this.showList = true
        this.skillLevelValue = this.skillLevel.toString()
      }
      // this.skillLevel = this.skillLevel.slice(0, 5)
      // this.skillLevelValue = this.skillLevel.toString()
      // console.log(this.skillLevelValue)
    },
    treeselectBtn2 () {
      if (this.areaValue.length > 5) {
        lib.MessageAlert_Error('意向地点不得超过5个')
      } else if (this.areaValue.length === 0) {
        lib.MessageAlert_Error('请选择意向地点')
      } else {
        this.sub2 = false
        this.showList = true
        let _this = this
        let formData = new FormData()
        formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
        // formData.append('skillLevel', this.skillLevel.toString())
        formData.append('expectSalary', 0)
        formData.append('expectLocation', _this.areaValue.toString())
        _this.$_HTTPData.getMyClassInfo(_this, formData, function (res) {
          if (res.code === 0 || res.code === '000') {
            _this.expectLocation = res.result.expectedLocation
          } else {
            lib.MessageAlert_Error(res.message)
          }
        })
      }
    },
    showSub1 () {
      this.showList = false
      this.sub1 = true
    },
    showSub2 () {
      this.showList = false
      this.sub2 = true
    },
    pushClick () {
      if (!this.checkInputValue()) { return }
      let _this = this
      let formData = new FormData()
      formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
      formData.append('skillLevel', _this.skillLevel)
      formData.append('expectSalary', _this.price)
      formData.append('expectLocation', _this.areaValue)
      _this.$_HTTPData.getMyClassInfo(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          lib.MessageAlert_Success(res.message)
          _this.$router.push('/personal/information/profile')
        } else {
          lib.MessageAlert_Error(res.message)
        }
      })
    }
  },
  watch: {
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
  .treeselect{background: #fff;height: 6rem;width: 100%;padding: 0.2rem;}
  .treeselect .treeselect-input{width: 3rem;}
  .treeselect .treeselectBtn{font-size:17px;font-family:PingFangSC-Medium;font-weight:500;color:rgba(249,91,64,1);}
</style>
