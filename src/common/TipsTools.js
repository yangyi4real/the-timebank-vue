/* eslint-disable camelcase,standard/no-callback-literal,no-useless-constructor,no-unused-vars */
import { Toast, Indicator, MessageBox, Prompt } from 'mint-ui'
import 'mint-ui/lib/style.css'
class LibTools {
  constructor () {}
  MessageAlert_Success (string) {
    console.log(string)
    Toast({
      message: string,
      iconClass: 'iconfont iconchenggong',
      duration: 2000
    })
  }
  MessageAlert_Error (string) {
    console.log(string)
    Toast({
      message: string,
      iconClass: 'iconfont icontishishibai',
      duration: 2000
    })
  }
  MessageAlert_Warning (string) {
    console.log(string)
    Toast({
      message: string,
      iconClass: 'iconfont iconwarningo',
      duration: 2000
    })
  }
  MessageAlert_Bottom (string) {
    console.log(string)
    Toast({
      message: string,
      position: 'bottom'
    })
  }
  MessageBox_Alert (title, text, callback) {
    MessageBox({
      title: title,
      message: text
      // showCancelButton: true
      // cancelButtonText: '删除',
      // cancelButtonClass: 'g-delete'
    }).then(action => {
      if (callback) {
        callback(true)
      }
    }).catch(action => {
      if (callback) {
        callback(false)
      }
    })
  }
  MessageBox_Confirm (title, text, callback) {
    MessageBox.confirm(text, title).then(action => {
      callback(true)
    }).catch(action => {})
  }
  MessageBox_Delete (title, text, callback) {
    MessageBox({
      title: title,
      message: text,
      showCancelButton: true,
      cancelButtonText: '删除',
      cancelButtonClass: 'g-delete'
    }).then(action => {
      if (action === 'confirm') {
        callback(true)
      } else if (action === 'cancel') {
        callback(false)
      } else {
        callback(null)
      }
    }).catch(action => {
      callback(null)
    })
  }
  MessageBox_Prompt (title, text, callback) {
    MessageBox.prompt(text, title).then(({ value, action }) => {
      if (value) {
        callback(value)
      }
    }).catch(action => {})
  }
  LoadingShow () {
    Indicator.open('加载中...')
  }
  LoadingHide () {
    Indicator.close()
  }
}
export default LibTools
