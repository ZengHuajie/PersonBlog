/**
 * 连接数据库的接口, 返出去给服务器, 服务器再把它发出去, 客户端得以请求
 * 用于处理博客插
 * 导入dao层的数据处理方法
 * @type {Map<any, any>}
 */
const blogDao = require('../dao/blogDao');
const tagDao = require('../dao/tagDao');
const tagblogmappingDao = require('../dao/tagblogmappingDao');
const timeUtil = require('../util/timeUtil');

let path = new Map();

/**
 * 最近热门
 */
function queryHoltBlog(request, response, next) {
  blogDao.queryHoltBlog((result) => {
    response.json({
      data: result
    })
  })
}
path.set('/api/queryHoltBlog', queryHoltBlog);



/**
 * 根据标签查找博客数量
 */
function queryBlogCountByTags(request, response, next) {
  let tag = request.body['tag'];
  blogDao.queryBlogCountByTags(tag, (result) => {
    response.json({
      data: result
    })
  })
}
path.set('/api/queryBlogCountByTags', queryBlogCountByTags);


/**
 * 根据标签查找博客
 * @param request
 * @param response
 * @param next
 */
function queryBlogByTags(request, response, next) {
  console.log(request.body['tag'])
  let tag = request.body['tag'];
  let page = request.body['page'];
  let pageSize = request.body['pageSize'];
  blogDao.queryBlogByTags(tag, page, pageSize, (result) => {
    response.json({
      data: result
    })
  })
}
path.set('/api/queryBlogByTags', queryBlogByTags);



/**
 * 查找所有标签
 */
function queryAllTags(request, response, next) {
  tagDao.queryAllTags((result) => {
    response.json({
      data: result
    })
  })
}
path.set('/api/queryAllTags', queryAllTags);



/**
 * 查找全部博客
 */
function queryAllBlog(request, response, next) {
  blogDao.queryAllBlog((result) => {
    response.json({
      data: result
    })
  })
}
path.set('/api/queryAllBlog', queryAllBlog);


/**
 * 查找第一条博客
 */
function queryFirstBlog(request, response, next) {
  blogDao.queryFirstBlog((result) => {
    response.json({
      data: result
    })
  })
}
path.set('/api/queryFirstBlog', queryFirstBlog);

/**
 * 查找最后一条博客
 */
function queryLastBlog(request, response, next) {
  blogDao.queryLastBlog((result) => {
    response.json({
      data: result
    })
  })
}
path.set('/api/queryLastBlog', queryLastBlog);

/**
 * 根据传进来的id查找下一条
 * @param request
 * @param response
 * @param next
 */
function queryNextBlogById(request, response, next) {
  let detailId = request.body['detailId'];
  blogDao.queryNextBlogById(detailId, (result) => {
    response.json({
      data: result
    })
  })
}
path.set('/api/queryNextBlogById', queryNextBlogById);

/**
 * 根据传进来的id查找上一条
 */
function queryPrevBlogById(request, response, next) {
  let detailId = request.body['detailId'];
  blogDao.queryPrevBlogById(detailId, (result) => {
    if(result == null) {
      return;
    }
    response.json({
      data: result
    })
  })
}
path.set('/api/queryPrevBlogById', queryPrevBlogById);

/**
 * 根据id查找博客
 */
function queryBlogById(request, response, next) {
  let detailId = request.body['detailId'];
  blogDao.queryBlogById(detailId, (result) => {
    response.json({
      data: result
    })
  });
  // 浏览次数
  blogDao.addBlogViews(detailId);
}
path.set('/api/queryBlogById', queryBlogById);

/**
 * 查找博客数量
 */
function queryBlogCount(request, response, next) {
  blogDao.queryBlogCount((result) => {
    response.json({
      data: result
    })
  })
}
path.set('/api/queryBlogCount', queryBlogCount);

/**
 * 查找所有博客
 */
function queryBlogByPage(request, response, next) {
  let page = request.body['page'];
  let pageSize = request.body['pageSize'];
  blogDao.queryBlogByPage(page, pageSize, (result) => {
    response.json({
      data: result
    })
  })
}
path.set('/api/queryBlogByPage', queryBlogByPage);

/**
 * 插入博客步骤:
 * 1. 编辑页面发送axios请求，传参 ---> 插入blog表
 * 2. 博客插入的同时，需要把tag标签也插入到tag表里
 * 3. 插入tag的时候，也需要tag插入到tag和blog映射的那张表
 * (这样才算一次完整的插入）
 */

function blogEdit(request, respone, next) {
  let time = timeUtil.getTime();
  let blogTitle = request.body['blogTitle'];
  // 替换空格和中文逗号
  let blogTags = request.body['blogTags'].replace(/ /g, '').replace('，', ',');
  let blogContent = request.body['blogContent'];
  // 这里插入博客
  blogDao.insertBlog(blogTitle, blogTags, blogContent, time, time, (result) => {
    respone.json({
      data: result.insertId
    })
    console.log('博客id-->', result.insertId)
    /**
     * 插入博客后, 先遍历标签, 如果标签在数据表里不存在, 才插入到tag表
     */
    const blogId = result.insertId;
    let tagList = blogTags.split(',');
    for(let i = 0; i < tagList.length; i ++) {
      if(tagList[i] === '') {
        continue;
      }
      // 这里查询标签
      queryTag(tagList[i], blogId);
    }

  });;
}

/**
 * 查找标签
 */
function queryTag(tag_name, blogId) {
  tagDao.queryTag(tag_name, (result) => {
    let time = timeUtil.getTime();
    // 返回的result为空的话, 表示里面没有, 没有就插入
    if(result == null || result.length == 0) {
      insertTag(tag_name, blogId);
    } else {
      // 如果tag表里有这个标签, 就顺便插入到映射表里
      insertTagBlogMapping(result[0].id, blogId, time, time);
    }
  })
}

/**
 * 插入标签
 */
function insertTag(tag_name, blogId) {
  let time = timeUtil.getTime();
  tagDao.insertTag(tag_name, time, time, (result) => {
    // 标签插入后, 同时要把相关信息插入到id和标签的映射表中
    insertTagBlogMapping(result.insertId, blogId);
  })
}

/**
 * 插入映射表
 */
function insertTagBlogMapping(tag_id, blog_id) {
  let time = timeUtil.getTime();
  tagblogmappingDao.insertTagBlogMapping(tag_id, blog_id, time, time)
}

path.set('/api/blogEdit', blogEdit);


module.exports.path = path;