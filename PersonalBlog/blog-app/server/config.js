/**
 * 读取配置文件
 * @type {module:fs}
 */

const fs = require('fs');

let conf = fs.readFileSync('./server.conf');

conf = conf.toString().split('\r\n');

let globalConf = {};

for(let i = 0; i < conf.length; i ++) {
  globalConf[conf[i].split('=')[0]] = conf[i].split('=')[1];
}
module.exports = globalConf;