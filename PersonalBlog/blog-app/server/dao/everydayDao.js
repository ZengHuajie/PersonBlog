/**
 * 操作everyday数据表
 */

const dbutil = require('./dbutil');

function insertEveryDay(content, ctime) {
  let insertSql = 'insert into everyday(`content`, `ctime`) values(?, ?);';
  let params = [content, ctime];
  let connection = dbutil.createConnection();
  // 连接数据库
  connection.connect();
  /**
   * connection.query 执行sql语句
   * param1: 需要执行的语句
   * param2: 是一个数组, 数组中的值代表param1中的?所对应的值
   * param3: 回调函数(error异常, result结果), 有异常就没结果, 有结果就没异常
   */
  connection.query(insertSql, params, (error, result) => {
    if (error === null) {
      // console.log(result);
    } else {
      console.log(error);
    }
  })
  // 查完记得立马关闭
  connection.end();
}

/**
 * 查找最新的每日一句
 */
function queryEveryDay(success) {
  // 倒序查找, 只找第一个
  let querySql = 'select * from everyday order by id desc limit 1;';
  let connection = dbutil.createConnection();
  connection.connect();
  connection.query(querySql, (error, result) => {
    if(error === null) {
      success(result);
    } else {
      console.log(error);
    }
  })
  connection.end();
}

module.exports.insertEveryDay = insertEveryDay;
module.exports.queryEveryDay = queryEveryDay;