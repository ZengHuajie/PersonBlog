/**
 * 连接数据库的接口, 返出去给服务器, 服务器再把它发出去, 客户端得以请求
 * 用于处理每日一句
 * 导入dao层的数据处理方法
 * @type {Map<any, any>}
 */
const everydayDay = require('../dao/everydayDao');
const timeUtil = require('../util/timeUtil');

let path = new Map();

/**
 * 插入每日一句
 * @param request
 * @param respone
 * @param next
 */
function everydayEdit(request, respone, next) {
  let time = timeUtil.getTime();
  console.log('进入everydayEdit');
  console.log('编辑框里的每日一句:', request.body['content']);
  let content = request.body['content'];
  everydayDay.insertEveryDay(content, time)
  respone.json({
    data: '成功!'
  })
}
/**
 * 键值对的形式, 一个url对应一个方法
 * 服务器就可以通过loder.get(key)获取到这个方法
 */
path.set('/api/everydayEdit', everydayEdit);

/**
 * 查找最新的每日一句
 */
function queryEveryday(request, response, next) {
  everydayDay.queryEveryDay((result) => {
    response.json({
      // 通过result[0]拿到这个对象
      data: result
    })
  });

}
path.set('/api/queryEveryday', queryEveryday);


module.exports.path = path;
