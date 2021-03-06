/**
 * 此模块用以对比文本相似度
 * @constructor similarity
 */
const SimHash = require('simhash')()
const jw = require('jaro-winkler')
const similarity =
class {
  /**
   * @param {object} options - 配置项
   * @param {boolean}[options.caseSensitive=false] - 大小写敏感：false：不区分大小写，true：区分大小写
   * @param {int}[options.longTextLength=300] - 定义长文本的长度阈值：其中一个字符串超过此长度时使用sim-hash，否则使用jaro-winkler。
   * @param {int}[options.distanceNotPass=3] - 长文本相似判断阈值[0,Infinity)：当sim-hash distance小于等于此值时，认为文本不相同；否则认为文本相同
   * @param {float}[options.similarityPass=0.7] - 短文本相似判断阈值[0,1]：当similarity percent大于等于此值时认为文本相同，否则认为文本不同
   * @description sim-hash distance越大，相似度越低；similarity percent越大，相似度越高。
   * @example
   * const Sim = require('similarity')
   * const sim = new Sim({
   * caseSensitive: true,// default:false
   * longTextLength:100,// default:300
   * distanceNotPass:2,// default:3
   * similarityPass:0.6//default:0.7
   * })
   * let target = 'abc'
   * let input = 'Abc'
   * let res=sim.isSimilarity(target, input)
   * console.log(res)// false
   */
  constructor (options) {
    this.options = {}
    this.options.caseSensitive = options.caseSensitive || false // 默认不区分大小写
    this.options.longTextLength = options.longTextLength || 300
    this.options.distancePass = options.distancePass || 3
    this.options.similarityPass = options.similarityPass || 0.7
  }
  /**
   *
   * @param {buffer} content - simhash的依据内容
   * @returns {string} string - hash值
   * @description 生成simhash
   * @ignore
   */
  hash (content) {
    if (typeof content !== 'string') {
      console.warn('input must be string')
      return 0
    }
    return SimHash(content).join('')
  }
  /**
   * @ignore
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
    let dis = 0
    this.Flak = flak
    this.Arrow = arrow
    if (this.Flak === this.Arrow) return 0
    for (let i = 0; i < this.Flak.length; i++) {
      if (this.Flak[i] !== this.Arrow[i]) dis++
    }
    return dis
  }
  /**
   * @param {string} target 目标文本
   * @param {string} input 输入文本
   * @return {boolean} 当返回true时，两个文本可认为相似；当返回false时，两个文本可认为不相似。
   * @throws {string} input must be string:输入的参数需要为字符串
   * @example
   * const Sim = require('similarity')
   * const chk = new Sim()
   * chk.isSimilarity('helloworld','HelloWorld')
   */
  isSimilarity (target, input) {
    if (typeof target !== 'string' || typeof input !== 'string') throw new Error('input must be string')
    // 任一字符串的长度大于longTextLength时，使用sim-hash
    if (target.length >= this.options.longTextLength || target.length >= this.options.longTextLength) {
      // 大小写设置为不敏感时，全部统一为小写
      if (this.options.caseSensitive === false) {
        target = target.toLocaleLowerCase()
        input = target.toLocaleLowerCase()
      }
      let targetHash = this.hash(target)
      let inputHash = this.hash(input)
      if (targetHash.length === 32 && inputHash.length === 32) {
        let distance = this.distance(targetHash, inputHash)
        if (distance <= this.options.distancePass) {
          return true
        } else {
          return false
        }
      } else {
        throw new Error('hash must be a 32 long string')
      }
    // 长度未大于longTextLength，使用jaro-winkler
    } else {
      if (jw(target, input, { caseSensitive: this.options.caseSensitive }) >= this.options.similarityPass) {
        return true
      } else {
        return false
      }
    }
  }
}

module.exports = similarity
