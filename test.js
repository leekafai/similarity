/**
 * @description 使用 sim-hash算法
 */
const Sim = require('./index')
const sim = new Sim({
  autoSimple: true,
  autoAlgorithm: 'sim-hash'
})
let input = '免费喊单，免费赠送风控计划，免费赠送回本方案，可先体验实力再合作，Q-Q:284-203-6120，微信:hwk123456a成功不是靠运气，选择大于努力!复杂的行情简单做，简单的行情重复做，为什么我们总是在纠结行情本身，而忘了我们的目的不过是找准机会赚一笔钱。我这里没有百分百盈利的虚假承诺，只有稳健盈利的风控计划。'
let target = '免费喊单，免费赠送风控计划，免费赠送回本方案，可先体验实力再合作，Q-Q:284-203-6120，微信:hwk123456a成功不是靠运气，选择大于努力!市场永远不缺翻仓的外汇新手;月入百万的家庭主妇和扭亏为盈的投资神话。在行情反转的边缘，谁能笑到最后，谁就是最终赢家。'
let ip2 = '免费喊单，免费赠送风控方案，免费制定回本方案，先体验实力在合作，赠送微信：MACD5717'
let tg2 = '免费喊单，免费赠送风控方案，免费赠送全套学习资料，免费制定回本方案，先体验实力在合作，赠送微信：MACD5717'

console.log(sim.auto(target, input))// { distance: 5 }
console.log(sim.auto(ip2, tg2))// { distance: 2 }
/**
 * @description 使用 jaro-winkler算法
 */
let t1 = 'abc'
let t2 = 'Abc'
const jwsimi = new Sim({
  autoSimple: false,
  // 默认为使用 'jaro-winkler'，可不指定autoAlgorithm
  // autoAlgorithm: 'jaro-winkler',
  autoCaseSensitive: false
})
// caseSensitive：false 忽略大小写敏感
let distance = jwsimi.auto(target, input)
let distance2 = jwsimi.auto(tg2, ip2)
let dis3 = jwsimi.auto(t1, t2)
console.log(distance, distance2, dis3)
