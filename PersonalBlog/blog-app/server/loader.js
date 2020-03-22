/**
 * 读取web文件夹下的所有的loader文件, 这些loader实际上就是接口
 * @type {{}}
 */
let fs = require('fs');
let globalConf = require('./config');

// 存放读取进来的文件
let controllerSet = [];
// 全局映射
let pathMap = new Map();

// 读取web下的所有文件
let files = fs.readdirSync(globalConf['web_path']);

for(let i = 0; i < files.length; i ++) {
  let temp = require('./' + globalConf['web_path'] + '/' + files[i]);
  // 判断路径是否存在
  if(temp.path) {
    // 如果存在, 以键值对的形式遍历path
    for(let [key, value] of temp.path) {
      // 判断全局映射集合中是否存存在这个路径, 不存在才添加进去
      // 这是为了以防后面有相同的路径打进去之后覆盖了之前的
      if(pathMap.get(key) == null) {
        pathMap.set(key, value);
      } else {
        throw new Error('url path 异常, url: ' + key);
      }
    }
    controllerSet.push(temp);
  }
}

// 所有的url都存放在pathMap里面
module.exports = pathMap;