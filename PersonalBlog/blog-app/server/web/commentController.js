/**
 * 连接数据库的接口, 返出去给服务器, 服务器再把它发出去, 客户端得以请求
 * 用于处理评论给
 * 导入dao层的数据处理方法
 * @type {Map<any, any>}
 */

const timeUtil = require('../util/timeUtil');
const commentDao = require('../dao/commentDao');

// 验证码需要的包
const captcha = require('svg-captcha');

let path = new Map();

/**
 * 最新评论
 */
function queryNewComment(request, response, next) {
  commentDao.queryNewComment((result) => {
    response.json({
      data: result
    })
  })
}
path.set('/api/queryNewComment', queryNewComment);




/**
 * 插入评论(showMessage表)
 * id为-1表示关于页面的插入
 * id为1表示留言页面的插入
 */
function insertShowMessage(request, response, next) {
  let mark = request.body['mark'];
  let username = request.body['username'];
  let content = request.body['content'];
  let ctime = timeUtil.getTime();
  let atime = timeUtil.getTime();
  let email = request.body['email'];
  let parentName = request.body['parentName'];
  commentDao.insertShowMessage(mark, username, content, ctime, atime, email, parentName, (result) => {
    response.json({
      data: result
    })
  })
}
path.set('/api/insertShowMessage', insertShowMessage);

/**
 * 查找评论(showMessage表)
 */
function queryShowMessage(request, response, next) {
  let mark = request.body['mark'];
  commentDao.queryShowMessage(mark, (result) => {
    response.json({
      data: result
    })
  })
}
path.set('/api/queryShowMessage', queryShowMessage);

/**
 * 根据博客id查找评论
 */
function queryCommentByBlogId(request, response, next) {
  let blog_id = request.body['blog_id'];
  commentDao.queryCommentByBlogId(blog_id, (result) => {
    response.json({
      data: result
    })
  })
}
path.set('/api/queryCommentByBlogId', queryCommentByBlogId);

/**
 * 验证码接口
 */
function queryRandomCode(request, response, next) {
  let img = captcha.create({
    noise: 6,
    fontSize: 50,
    width: 100,
    height: 40,
    color: true
  });
  response.json({
    data: img
  })
  response.end();
}
path.set('/api/queryRandomCode', queryRandomCode);

/**
 * 插入评论
 */
function insertComment(request, response, next) {
  let time = timeUtil.getTime();
  let blog_id = request.body['blog_id'];
  let parent = request.body['parent'];
  let parentName = request.body['parentName'];
  let username = request.body['nickname'];
  let content = request.body['content'];
  let ctime = time;
  let atime = time;
  let email = request.body['email'];
  commentDao.insertComment(blog_id, parent, parentName, username, content, ctime, atime, email, (result) => {
    response.json({
      data: result
    })
  });
}
path.set('/api/insertComment', insertComment);

module.exports.path = path;