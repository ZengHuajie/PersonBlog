const express = require('express');
// 引入配置文件
const globalConf = require('./config');
// 导出接口
const loader = require('./loader');

const app = new express();

// 引入body-parser, 后台就可以通过req.body获取到前台传过去的数据
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 设置服务器默认的启动文件夹
app.use(express.static('../dist'));

/**
 * 接口: loader通过读取web获取接口
 * param1: web里自行设置的接口
 * param2: web里接口所对应的方法
 */
// 插入每日一句
app.post('/api/everydayEdit', loader.get('/api/everydayEdit'));
// 获取最新的每日一句
app.post('/api/queryEveryday', loader.get('/api/queryEveryday'));
// 插入博客
app.post('/api/blogEdit', loader.get('/api/blogEdit'));
// 查找所有博客
app.post('/api/queryBlogByPage', loader.get('/api/queryBlogByPage'));
// 查找博客数量
app.post('/api/queryBlogCount', loader.get('/api/queryBlogCount'));
// 根据id查找博客
app.post('/api/queryBlogById', loader.get('/api/queryBlogById'));
// 查找上一篇博客
app.post('/api/queryPrevBlogById', loader.get('/api/queryPrevBlogById'));
// 查找下一条博客
app.post('/api/queryNextBlogById', loader.get('/api/queryNextBlogById'));
// 查找第一条博客
app.post('/api/queryFirstBlog', loader.get('/api/queryFirstBlog'));
// 查找最后一条博客
app.post('/api/queryLastBlog', loader.get('/api/queryLastBlog'));
// 插入评论
app.post('/api/insertComment', loader.get('/api/insertComment'));
// 验证码
app.post('/api/queryRandomCode', loader.get('/api/queryRandomCode'));
// 根据博客id查找评论
app.post('/api/queryCommentByBlogId', loader.get('/api/queryCommentByBlogId'));
// 查找评论showMessage表
app.post('/api/queryShowMessage', loader.get('/api/queryShowMessage'));
// 插入评论showMessage表
app.post('/api/insertShowMessage', loader.get('/api/insertShowMessage'));
// 查找全部博客queryAlltBlog
app.post('/api/queryAllBlog', loader.get('/api/queryAllBlog'));
// 查找所有标签
app.post('/api/queryAllTags', loader.get('/api/queryAllTags'));
// 根据标签查找博客
app.post('/api/queryBlogByTags', loader.get('/api/queryBlogByTags'));
// 根据标签查找博客数量
app.post('/api/queryBlogCountByTags', loader.get('/api/queryBlogCountByTags'));
// 最近热门
app.post('/api/queryHoltBlog', loader.get('/api/queryHoltBlog'));
// 最新评论
app.post('/api/queryNewComment', loader.get('/api/queryNewComment'));



app.listen(globalConf['port'], function () {
  console.log('服务器已启动');
});