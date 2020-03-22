/**
 * 负责连接数据库
 */
// 引入mysql
const mysql = require('mysql');

/**
 * 创建连接数据库 mysql.createConnection
 * params: host地址 port端口 user用户名 password密码 database要连接的数据库
 * 如果只创建一次连接的话, 连续点击多次, 请求会失败, 所以每次请求都创建一次新的连接, 写成函数的形式
 */

function createConnection() {
  let connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'my_blog'
  })
  return connection;
}

module.exports.createConnection = createConnection;