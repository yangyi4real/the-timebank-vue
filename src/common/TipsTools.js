/* eslint-disable camelcase,standard/no-callback-literal,no-useless-constructor,no-unused-vars */
import { Confirm, Alert, Toast, Notify, Loading } from 'vue-ydui/dist/lib.rem/dialog'
class TipsTools {
  constructor () {}
  MessageAlert_Success (string) {
    Toast({
      mes: string,
      timeout: 1500,
      icon: 'success'
    })
  }
  MessageAlert_Error (string) {
    Toast({
      mes: string,
      timeout: 1500,
      icon: 'error'
      // callback: () => {
      //   this.$dialog.alert({mes: '给你一次重来的机会！'})
      // }
    })
  }
  MessageAlert_None (string) {
    Toast({
      mes: string,
      timeout: 2000
    })
  }
  MessageAlert_Top (string) {
    Notify({
      mes: string,
      timeout: 5000
    })
  }
  MessageAlert_Alert (string) {
    Alert({
      mes: string
    })
  }
  MessageAlert_Confirm (title, string) {
    Confirm({
      title: title,
      mes: string,
      opts: () => {
        Toast({
          timeout: 1500
        })
      }
    })
  }
}
export default TipsTools
