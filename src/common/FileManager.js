/* eslint-disable standard/no-callback-literal,no-useless-escape,no-useless-constructor */
/**
 * 文件管理者
 */
import HTTPData from './HTTPDatas'

class FileManager {
  constructor () {
    this.HTTPManager = new HTTPData()
  }
  /**
   * 文件上传
   * @param vueObj
   * @param data
   * @param callback
   * @private
   */
  _fileUploadStart (vueObj, data, fileObj, callback) {
    let _this = this
    data.append('type', '1')
    let reader = new FileReader()
    reader.readAsDataURL(fileObj)
    reader.onload = (result) => {
      _this.HTTPManager.uploadFile(vueObj, data, (res) => {
        callback(res)
      })
    }
  }
  /**
   * 点击添加文件按钮
   * @param callback
   */
  fileManagerUploadStart (vueObj, callback) {
    let _this = this
    let tempId = parseInt(Math.random() * 1000000000)
    let input = document.createElement('input')
    let form = document.createElement('form')
    input.type = 'file'
    input.name = 'file'
    input.id = tempId
    form.style.display = 'none'
    form.id = `form_${tempId}`
    form.enctype = 'multipart/form-data'
    form.appendChild(input)
    input.onchange = (e) => {
      let formData = new FormData(form)
      _this._fileUploadStart(vueObj, formData, input.files[0], (res) => {
        callback(res)
      })
    }
    input.click()
  }
}

export default FileManager
