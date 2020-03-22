/**
 * 操作blog数据表
 */
const dbutil = require('./dbutil');

/**
 * 查找最近热门, 浏览次数前10
 */
function queryHoltBlog(success) {
  let querySql = "select * from blog order by views desc limit 5;";
  let connection = dbutil.createConnection();

  connection.connect();
  connection.query(querySql, (error, result) => {
    if(error == null) {
      // console.log('查找最近热门--->', result);
      success(result);
    } else {
      console.log(error);
    }
  })
  connection.end();
}



/**
 * 浏览次数
 */
function addBlogViews(id) {

  let querySql = "update blog set views = views + 1 where id = ?;";
  let params = [id]
  let connection = dbutil.createConnection();

  connection.connect();
  connection.query(querySql, params, (error, result) => {
    if(error == null) {
      // console.log('浏览次数--->', result);
    } else {
      console.log(error);
    }
  })
  connection.end();
}


/**
 * 根据标签查找博客数量
 */
function queryBlogCountByTags(tags, success) {

  let querySql = "select count(1) as count from blog where tags like ?;";
  // let params = ["%"+tags+"%"]
  let params = ['%' + tags + '%']
  // 试一下,应该是这里穿params的时候,都不用'号了,内部可能拼接自动加上了 找不到,可能得官方文档了行,那就看看connecttion的文档

  let connection = dbutil.createConnection();

  connection.connect();
  connection.query(querySql, params, (error, result) => {
    if(error == null) {
      // console.log('根据标签查找博客数量--->', result);
      success(result);
    } else {
      console.log(error);
    }
  })
  connection.end();
}


/**
 * 根据博客标签查找博客
 */
function queryBlogByTags(tag, page, pageSize, success) {
  let querySql = "select * from blog where tags like ? order by id desc limit ?, ?;";
  let params = ["%"+tag+"%", page, pageSize];
  let connection = dbutil.createConnection();

  connection.connect();
  connection.query(querySql, params, (error, result) => {
    if (error == null) {
      // console.log('根据博客标签查找博客--->', result)
      success(result);
    } else {
      console.log(error);
    }
  });
  connection.end();
}

/**
 * 查找所有博客
 */
function queryAllBlog(success) {
  let querySql = 'select * from blog;';
  let connection = dbutil.createConnection();

  connection.connect();
  connection.query(querySql, (error, result) => {
    if(error == null) {
      // console.log(result)
      success(result);
    } else {
      console.log(error);
    }
  })
  connection.end();
}


/**
 * 查找第一条博客
 */
function queryFirstBlog(success) {
  let querySql = 'select * from blog limit 1;';
  let connection = dbutil.createConnection();

  connection.connect();
  connection.query(querySql, (error, result) => {
    if(error == null) {
      // console.log('查找第一条博客返回的信息--->',result);
      success(result);
    } else {
      console.log(error);
    }
  })
  connection.end();
}

/**
 * 查找最后一条博客
 */
function queryLastBlog(success) {
  let querySql = 'select * from blog order by id desc limit 1;';
  let connection = dbutil.createConnection();
  connection.connect();
  connection.query(querySql, (error, result) => {
    if(error == null) {
      // console.log('查找最后一条博客返回的信息--->',result);
      success(result);
    } else {
      console.log(error);
    }
  })
  connection.end();
}

/**
 * 根据传进来的id查找下一条
 */
function queryNextBlogById(id, success) {
  let querySql = 'select * from blog where id > ? order by id asc limit 1;';
  let connection = dbutil.createConnection();
  let params = [id]

  connection.connect();
  connection.query(querySql, params, (error, result) => {
    if(error == null) {
      // console.log('根据id查找下一条博客返回的信息--->',result);
      success(result);
    } else {
      console.log(error);
    }
  })
  connection.end();
}


/**
 * 根据传进来的id查找上一条
 */
function queryPrevBlogById(id, success) {
  let querySql = 'select * from blog where id < ? order by id desc limit 1;';
  let params = [id];
  let connection = dbutil.createConnection();

  connection.connect();
  connection.query(querySql, params, (error, result) => {
    if(error == null) {
      // console.log('根据id查找上一条博客返回的信息--->',result);
      success(result);
    } else {
      console.log(error);
    }
  })
  connection.end();
}

/**
 * 根据id查找博客
 */
function queryBlogById(id, success) {
  let querySql = 'select * from blog where id = ?;';
  let params = [id];
  let connection = dbutil.createConnection();

  connection.connect();
  connection.query(querySql, params, (error, result) => {
    if(error == null) {
      // console.log('根据id查找博客返回的信息--->',result);
      success(result);
    } else {
      console.log(error);
    }
  })
  connection.end();
}


/**
 * 查找所有博客
 * param1: 偏移量
 * param2: 一页有几个
 */
function queryBlogByPage(page, pageSize, success) {
  let querySql = `select * from blog order by id desc limit ?, ?;`;
  let params = [page*pageSize, pageSize];
  let connection = dbutil.createConnection();
  connection.connect();
  connection.query(querySql, params, (error, result) => {
    if(error == null) {
      // console.log('查找博客返回的信息--->', result);
      success(result);
    } else {
      console.log(error);
    }
  })
  connection.end();
}

/**
 * 插入博客
 * success 用来把插入成功后的信息返回出去
 */
function insertBlog(title, tags, content, ctime, utime, success) {
  let insertSql = 'insert into blog(`title`, `tags`, `content`, `ctime`, `utime`) values(?, ?, ?, ?, ?);';
  let params = [title, tags, content, ctime, utime];
  let connection = dbutil.createConnection();

  connection.connect();
  connection.query(insertSql, params, (error, result) => {
    if(error == null) {
      // console.log(result);
      success(result);
    } else {
      console.log(error);
    }
  });
  connection.end();
}

/**
 * 查找博客数量
 */
function queryBlogCount(success) {
  let querySql = 'select count(1) as count from blog;';

  let connection = dbutil.createConnection();
  connection.connect();
  connection.query(querySql, (error, result) => {
    if(error == null) {
      // console.log('查找博客数量返回的信息:', result);
      success(result);
    } else {
      console.log(error);
    }
  })
  connection.end();
}


module.exports.insertBlog = insertBlog;
module.exports.queryBlogByPage = queryBlogByPage;
module.exports.queryBlogCount = queryBlogCount;
module.exports.queryBlogById = queryBlogById;
module.exports.queryPrevBlogById = queryPrevBlogById;
module.exports.queryNextBlogById = queryNextBlogById
module.exports.queryFirstBlog = queryFirstBlog;
module.exports.queryLastBlog = queryLastBlog;
module.exports.queryAllBlog = queryAllBlog;
module.exports.queryBlogByTags = queryBlogByTags;
module.exports.queryBlogCountByTags = queryBlogCountByTags;
module.exports.addBlogViews = addBlogViews;
module.exports.queryHoltBlog = queryHoltBlog;