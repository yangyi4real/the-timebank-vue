<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper" v-show="showList">
      <div class="intention-main">
        <div class="intention-list flex-row-between" @click="showSub1">
          <div>技能标签</div>
          <div><i class="iconfont iconjiantou"></i></div>
        </div>
        <div class="intention-list flex-row-between" @click="showSub2">
          <div>意向地点</div>
          <div><i class="iconfont iconjiantou"></i></div>
        </div>
        <div class="intention-list flex-row-between" style="border: 0">
          <div>意向薪酬</div>
          <div>
            <input type="text" v-model="Pay" placeholder="请输入金额 "/> 元/小时
          </div>
        </div>
      </div>
      <div class="intention-btn">
        <div @click="pushClick" :class="{ 'btn-border-opacity': inOperation, 'btn-border': operation}">下一步</div>
      </div>
    </div>
    <div class="wapper" v-show="sub1">
      <div class="treeselect">
        <div class="flex-row-between">
          <treeselect class="treeselect-input" v-model="skillValue" :multiple="true" :alwaysOpen="true" :options="skillOptions" :flat="true" :show-count="true" :flatten-search-results="true" placeholder="请输入技能" :searchable="true" v-on:input="skillData" />
          <div class="treeselectBtn" @click="treeselectBtn">完成</div>
        </div>
      </div>
    </div>
    <div class="wapper" v-show="sub2">
      <div class="treeselect">
        <div class="flex-row-between">
          <treeselect class="treeselect-input" v-model="areaValue" :multiple="true" :alwaysOpen="true" :options="areaOptions" :flat="true" :show-count="true" :flatten-search-results="true" placeholder="请选择地点" :searchable="true" v-on:input="areaData"/>
          <div class="treeselectBtn" @click="treeselectBtn">完成</div>
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
      skillValue: null,
      areaIsDisabled: false,
      skillOptions: [
        {
          id: 'a',
          label: '软件/互联网开发/系统集成',
          isDisabled: false,
          children: [
            {
              id: '1',
              isDisabled: false,
              label: 'UI-设计'
            },
            {
              id: '2',
              isDisabled: false,
              label: '产品经理'
            }
          ]
        },
        {
          id: 'b',
          label: '软件/互联网开发/系统集成',
          isDisabled: false,
          children: [
            {
              id: '3',
              isDisabled: false,
              label: 'UI-设计'
            },
            {
              id: '4',
              isDisabled: false,
              label: '产品经理'
            }
          ]
        },
        {
          id: 'c',
          label: '软件/互联网开发/系统集成',
          isDisabled: false,
          children: [
            {
              id: '5',
              isDisabled: false,
              label: 'UI-设计'
            },
            {
              id: '6',
              isDisabled: false,
              label: '产品经理'
            }
          ]
        }
      ],
      areaOptions: AreaJson,
      titleMsg: '存储意向',
      Pay: '',
      showList: true,
      sub1: false,
      sub2: false,
      inOperation: true, // 灰色按钮
      operation: false,
      isDisabledSkill: null
    }
  },
  created () {},
  computed: {},
  methods: {
    treeselectBtn () {
      console.log(this.areaValue)
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
      // if (!this.checkInputValue()) { return }
      let _this = this
      let formData = new FormData()
      formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
      formData.append('skillLevel1', '')
      formData.append('skillLevel2', '')
      formData.append('expectSalary', _this.Pay)
      formData.append('expectLocation', _this.areaValue)
      _this.$_HTTPData.getMyClassInfo(_this, formData, function (res) {
        if (res.code === 0 || res.code === '000') {
          // _this.TipsTools.MessageAlert_Success('注册成功')
          console.log('1111')
          _this.$router.push('/paypassword')
        } else {
          _this.TipsTools.MessageAlert_Error(res.message)
        }
      })
      // this.$router.push('/personal/information/profile')
    },
    skillData () {
      if (this.skillValue.length > 4) {
        this.isDisabledSkill = true
        for (let i = 0; i < this.skillOptions.length; i++) {
          this.skillOptions[i].isDisabled = this.isDisabledSkill
          for (let j = 0; j < this.skillOptions[i].children.length; j++) {
            this.skillOptions[i].children[j].isDisabled = this.isDisabledSkill
          }
        }
        console.log(this.skillOptions)
        console.log(this.isDisabledSkill)
        // lib.MessageAlert_Error('最多选择5个标签哦')
      }
    },
    areaData () {
      if (this.areaValue.length > 4) {
        this.areaIsDisabled = true
        lib.MessageAlert_Error('标签不能超过5个')
      }
    }
  },
  mounted () {
    let temp = JSON.stringify(AreaJson)
    let temp2 = temp.replace(/v/g, 'id')
    let temp3 = temp2.replace(/n/g, 'label')
    let temp4 = temp3.replace(/c/g, 'children')
    this.areaOptions = JSON.parse(temp4)
  },
  watch: {
    // numberData () {
    //   if (this.name !== '' && this.birthDate !== '' && this.workDate !== '' && this.EMail !== '' && this.areaValue !== '') {
    //     this.inOperation = false
    //     this.operation = true
    //   } else {
    //     this.inOperation = true
    //     this.operation = false
    //   }
    // }
    skillData () {
      if (this.skillValue.length > 4) {
        this.isDisabledSkill = true
        for (let i = 0; i < this.skillOptions.length; i++) {
          this.skillOptions[i].isDisabled = this.isDisabledSkill
          for (let j = 0; j < this.skillOptions[i].children.length; j++) {
            this.skillOptions[i].children[j].isDisabled = this.isDisabledSkill
          }
        }
        console.log(this.skillOptions)
        console.log(this.isDisabledSkill)
        // lib.MessageAlert_Error('最多选择5个标签哦')
      }
    },
    areaData () {
      if (this.areaValue.length > 5) {
        this.areaIsDisabled = true
        lib.MessageAlert_Error('最多选择5个标签哦')
      }
    }
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
  .treeselect .treeselect-input{width: 3.1rem;}
  .treeselect .treeselectBtn{font-size:17px;font-family:PingFangSC-Medium;font-weight:500;color:rgba(249,91,64,1);}
</style>
