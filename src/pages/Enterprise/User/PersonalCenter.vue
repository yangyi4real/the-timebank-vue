<template>
  <div class="body">
    <navbar :title="titleMsg"></navbar>
    <div class="wapper">
      <div class="setUp-main">
        <div class="setUp-list flex-row-between" @click="$router.push('/user/enterpriseInfo-show')">
          <div>企业信息</div>
          <div>
            <span></span><i class="iconfont iconjiantou"></i>
          </div>
        </div>
        <!--<div class="setUp-list flex-row-between" @click="$router.push('/personal/setup/newphone')">-->
          <!--<div>手机绑定</div>-->
          <!--<div>-->
            <!--<span>158****2233</span><i class="iconfont iconjiantou"></i>-->
          <!--</div>-->
        <!--</div>-->
        <div class="setUp-list flex-row-between" @click="$router.push('/personal/setup/inputpaypassword')">
          <div>支付密码</div>
          <div>
            <span></span><i class="iconfont iconjiantou"></i>
          </div>
        </div>
        <div class="setUp-list flex-row-between" @click="$router.push('')">
          <div>微信绑定</div>
          <div>
            <span>去绑定</span><i class="iconfont iconjiantou"></i>
          </div>
        </div>
      </div>
      <div class="setUp-btn">
        <div class="btn-border-black margin-30" @click="switchClicked">切换讲师身份</div>
        <div class="btn-border-black margin" @click="SignOutClicked">退出登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '../../../views/navbar/navbar'
import TipsTools from '../../../common/TipsTools'
let lib = new TipsTools()
export default {
  name: 'PersonalCenter',
  components: {
    Navbar
  },
  data () {
    return {
      titleMsg: '个人中心'
    }
  },
  computed: {},
  methods: {
    // 切换登录
    switchClicked () {
      this.$dialog.confirm({
        title: '确定切换登录身份？',
        mes: '',
        opts: [
          {
            txt: '取消',
            color: '#ccc',
            callback: () => {}
          },
          {
            txt: '确定',
            color: true,
            callback: () => {
              let _this = this
              let formData = new FormData()
              formData.append('userId', _this.$SaiLei.cookiesGet('user_id'))
              formData.append('type', 2)
              _this.$_HTTPData.getSwitchLogin(_this, formData, function (res) {
                if (res.code === 0 || res.code === '000') {
                  lib.MessageAlert_Success(res.message)
                  _this.$router.push('/personal/index')
                } else {
                  lib.MessageAlert_Success(res.message)
                }
              })
            }
          }
        ]
      })
    },
    // 退出登录
    SignOutClicked () {
      this.$dialog.confirm({
        title: '确定退出登录？',
        mes: '',
        opts: [
          {
            txt: '取消',
            color: '#ccc',
            callback: () => {}
          },
          {
            txt: '确定',
            color: true,
            callback: () => {
              this.$SaiLei.cookiesClear('user_info')
              this.$SaiLei.cookiesClear('user_id')
              this.$SaiLei.cookiesClear('user_name')
              this.$SaiLei.cookiesClear('user_loginStatus')
              this.$SaiLei.cookiesClear('user_loginIdUser')
              this.$SaiLei.LocalStorageRemove(this.$SaiLei.USER_LOGIN_TOKEN_KEY)
              location.reload()
            }
          }
        ]
      })
    }
  },
  mounted () {}
}
</script>

<style scoped>
  .wapper{background:rgba(255,255,255,1);border-radius:0.05rem;margin: 0.66rem 0.1rem;}
  .setUp-main{margin: 0 0.2rem;padding: 0.2rem 0 0.4rem 0;}
  .setUp-main .setUp-list{font-size:0.16rem;font-family:PingFangSC-Regular;font-weight:400;color:rgba(0,0,0,1);border-bottom: 0.01rem solid #E8E8E8;padding-top: 0.2rem;padding-bottom: 0.15rem;}
  .setUp-btn{padding-bottom: 0.8rem;}
  .margin-30{margin: 0.3rem auto; }
  .margin{margin: 0 auto}
  .setUp-btn .setUp-btn-div{width:2.36rem;height:0.48rem;border-radius:0.05rem;border:0.01rem solid rgba(249,91,64,1);font-size: 0.16rem;font-family:PingFangSC-Medium;font-weight:500;color:rgba(0,0,0,1);line-height: 0.48rem;text-align: center}
</style>
