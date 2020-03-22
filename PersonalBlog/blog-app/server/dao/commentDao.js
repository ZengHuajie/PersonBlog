const dbutil = require('./dbutil');


/**
 * 最新评论
 */
function queryNewComment(success) {
  let insertSql = 'select * from comment order by id desc limit 5;';
  let connection = dbutil.createConnection();

  connection.connect();
  connection.query(insertSql, (error, result) => {
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
 * 插入评论(showMessage表)
 * mark为-1表示关于页面的插入
 * mark为1表示留言页面的插入
 */
function insertShowMessage(mark, username, content, ctime, atime, email, parentName, success) {
  let insertSql = 'insert into showmessage(`mark`, `username`, `content`, `ctime`, `atime`, `email`, `parentName`) values(?, ?, ?, ?, ?, ?, ?);';
  let params = [mark, username, content, ctime, atime, email, parentName];
  let connection = dbutil.createConnection();

  connection.connect();
  connection.query(insertSql, params, (error, result) => {
    if(error == null) {
      // console.log('插入评论(showMessage表)返回的信息--->', result);
      success(result);
    } else {
      console.log(error);
    }
  })
  connection.end();
}


/**
 * 查找评论(showMessage表)
 */
function queryShowMessage(mark, success) {
  let insertSql = 'select * from showMessage where mark = ?';
  let params = [mark];
  let connection = dbutil.createConnection();

  connection.connect();
  connection.query(insertSql, params, (error, result) => {
    if(error == null) {
      console.log('查找评论(showMessage)返回的信息--->', result);
      success(result);
    } else {
      console.log(error);
    }
  })
  connection.end();
}


/**
 * 插入评论
 */
function insertComment(blog_id, parent, parentName, username, content, ctime, atime, email, success) {
  let insertSql = 'insert into comment(`blog_id`, `parent`, `parentName`, `username`, `content`, `ctime`, `atime`, `email`) values(?, ?, ?, ?, ?, ?, ?, ?);';
  let params = [blog_id, parent, parentName, username, content, ctime, atime, email];
  let connection = dbutil.createConnection();

  connection.connect();
  connection.query(insertSql, params, (error, result) => {
    if(error == null) {
      // console.log('插入评论返回的信息--->', result);
      success(result);
    } else {
      console.log(error);
    }
  })
  connection.end();
}

/**
 * 根据博客id查找相应的评论
 */
function queryCommentByBlogId(blog_id, success) {
  let insertSql = 'select * from comment where blog_id = ?;';
  let params = [blog_id];
  let connection = dbutil.createConnection();

  connection.connect();
  connection.query(insertSql, params, (error, result) => {
    if(error == null) {
      // console.log('根据博客id查找相应的评论返回的信息--->', result);
      success(result);
    } else {
      console.log(error);
    }
  })
  connection.end();
}

module.exports.insertComment = insertComment;
module.exports.queryCommentByBlogId = queryCommentByBlogId;
module.exports.queryShowMessage = queryShowMessage;
module.exports.insertShowMessage = insertShowMessage;
module.exports.queryNewComment = queryNewComment;

