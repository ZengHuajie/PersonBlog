/**
 * 操作id和标签映射表
 * 如果在写博客时, 一个博客有多个标签, 那么这些标签的id都指向同一个博客的id
 */
 const dbutil = require('./dbutil');
 
 function insertTagBlogMapping(tag_id, blog_id, ctime, atime) {
   let insertSql = 'insert into tag_blog_mapping(`tag_id`, `blog_id`, `ctime`, `atime`) values(?, ?, ?, ?);';
   let params = [tag_id, blog_id, ctime, atime];

   const connection = dbutil.createConnection();
   connection.connect();
   connection.query(insertSql, params, (error, result) => {
     if(error == null) {
       // console.log('插入映射表返回的信息--->', result);
     } else {
       console.log(error);
     }
   })
 }

 module.exports.insertTagBlogMapping = insertTagBlogMapping;