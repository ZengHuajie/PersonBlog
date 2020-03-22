/**
 * 操作tag数据表
 */
const dbutil = require('./dbutil');

/**
 * 查找所有标签
 */
function queryAllTags(success) {
  let querySql = 'select tags from blog;';
  let connection = dbutil.createConnection();

  connection.connect()
  connection.query(querySql, (error, result) => {
    if(error == null) {
      success(result);
      // console.log(result);
    } else {
      console.log(error);
    }
  })
  connection.end();
}

/**
 * 查找标签
 */
function queryTag(tag_name, success) {
  let querySql = 'select * from tag where tag_name = ?;';
  let param = [tag_name];

  let connection = dbutil.createConnection();
  connection.connect();
  connection.query(querySql, param, (error, result) => {
    if(error == null) {
      // console.log('查找标签返回信息:',result);
      success(result);
    } else {
      console.log(error);
    }
  })
  connection.end();
}

/**
 * 插入标签
 */
function insertTag(tag_name, ctime, atime, success) {
  let querySql = 'insert into tag(`tag_name`, `ctime`, `atime`) values(?, ?, ?);';
  let param = [tag_name, ctime, atime];

  let connection = dbutil.createConnection();
  connection.connect();
  connection.query(querySql, param, (error, result) => {
    if(error == null) {
      // console.log('插入标签返回的信息--->', result);
      success(result);
    } else {
      console.log(error);
    }
  })
  connection.end();
}

module.exports.queryTag = queryTag;
module.exports.insertTag = insertTag;
module.exports.queryAllTags = queryAllTags;