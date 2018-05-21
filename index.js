/**
 * 此模块用以生成simhash、
 * 输出相差度
 * @constructor similarity
 * @example
 * const sim = require('./similarity')
 * const chk = new sim()
 * chk.hash(buffer)
 * chk.distance('1011','1101')
 */
const simHash = require('simhash')()
const similarity = class {
  /**
   *
   * @param {object} options - 配置项
   * @param {boolean} options.autoSimple - 配置auto方法的return。true:只输出距离。false：输出target字符串与input字符串。
   */
  constructor (options) {
    this.options = {}
    if (options) {
      this.options.outPutString = options.string
      this.options.autoSimple = options.autoSimple
    }
  }
  /**
   *
   * @param {buffer} content - simhash的依据内容
   * @returns {string} string - hash值
   * @description 生成simhash
   */
  hash (content) {
    if (typeof content !== 'string') {
      console.warn('input must be string')
      return 0
    }
    return simHash(content).join('')
  }
  /**
   *
   * @param {!string|!Array} flak - 作为比照对象的靶内容hash,不能为空
   * @param {!string} arrow - 待比照的内容hash，不能为空
   * @throws {int} -1：输入有误。
   * @returns {Object.<{hash:distance}>} 汉明距离，大于等于0。
   * @description  计算汉明距离(simhash)
   * @example
   * distabce(['1101','1011'],'1101')
   * //return {1011:2,1101:0}
   * @example
   * distabce('1011','1101')
   * //return {1011:2}
   */
  distance (flak, arrow) {
    if (flak.length <= 0 || arrow.length <= 0) return -1
    if (typeof arrow !== 'string') return -1
    if (typeof flak === 'string') {
      let dis = 0
      let result = {}
      this.Flak = flak
      this.Arrow = arrow
      // console.log(this.Flak, this.Arrow)
      if (this.Flak === this.Arrow) return { Flak: 0 }
      for (let i = 0; i < this.Flak.length; i++) {
        if (this.Flak[i] !== this.Arrow[i]) dis++
      }
      result[flak] = dis
      return result
    } else if (Array.isArray(flak)) {
      // console.log('flak:',flak)
      let dstCount = 0
      let dstObject = {}
      this.Flak = flak
      this.Arrow = arrow
      for (let i = 0; i < this.Flak.length; i++) {
        dstCount = 0
        for (let j = 0; j < this.Flak[i].length; j++) {
          if (this.Flak[i][j] !== this.Arrow[j]) dstCount++
        }
        dstObject[this.Flak[i]] = dstCount
      }
      return dstObject
    } else return -1
  }
  /**
   * @param {string} target 目标文本
   * @param {string} input 输入文本
   * @return {object.<distance,targetString,inputString>} - {distance:int 距离，[targetString:string 目标文本，inputString:string 输入文本]}
   */
  auto (target, input) {
    let targetHash = this.hash(target)
    let inputHash = this.hash(input)
    if (targetHash.length === 32 && inputHash.length === 32) {
      let distance = this.distance(targetHash, inputHash)
      // console.log(distance, Object.values(distance))
      let result = { distance: Object.values(distance)[0] }
      // console.log(this.options, 'options')
      if (this.options) {
        if (this.options.autoSimple === false) {
          result.target = target
          result.input = input
        }
      }
      return result
    }

  }
}
module.exports = similarity
