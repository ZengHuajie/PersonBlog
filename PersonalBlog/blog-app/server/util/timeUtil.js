/**
 * 获取当前时间毫秒
 * @returns {string}
 */
function getTime() {
  let date = new Date();
  return date.getTime();

}


module.exports.getTime = getTime;