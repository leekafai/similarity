
# similarity

**text similarity 文本相似度对比模块**

### 测试
1. 下载模块
```shell
mkdir test&&cd test&&npm init -y&&npm install https://github.com/leekafai/similarity.git 
```
2. 运行
```shell
node ./node_modules/similarity/test.js
```
---
### 使用模块
```shell
npm install https://github.com/leekafai/similarity.git
```
```javascript
// your js file
const Sim = require('similarity')
const sim = new Sim({
  caseSensitive: true,// default:false
  longTextLength:100,// default:300
  distanceNotPass:2,// default:3
  similarityPass:0.6//default:0.7
})
let target = 'abc'
let input = 'Abc'
let res=sim.isSimilarity(target, input)
console.log(res)// false
```
