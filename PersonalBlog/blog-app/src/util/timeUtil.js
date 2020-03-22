/**
 * 传入毫秒, 返回年月日格式的日期
 * @param ms
 * @returns {string}
 */
function getDate(ms) {
  let time = new Date(ms);
  let year = time.getFullYear();
  let month = time.getMonth() + 1 > 9 ? time.getMonth() + 1 : '0' + (time.getMonth() + 1);
  let date = time.getDate() > 9 ? time.getDate() : '0' + time.getDate();
  let hour = time.getHours();
  let min = time.getMinutes() > 9 ? time.getMinutes() : '0' + time.getMinutes();
  let sec = time.getSeconds() > 9 ? time.getSeconds() : '0' + time.getSeconds();
  let dateline = `${year}年${month}月${date}日 ${hour}:${min}:${sec}`;
  return dateline;
}

/**
 * 传入毫秒数
 * 返回几秒、分、小时、天、月、年前
 */
function getTimeStamp(ms) {
  let curTime = new Date();
  let lastTime = new Date(ms);

  let timeDiff = curTime.getTime() - lastTime.getTime();
  // 单位换算
  var min = 60 * 1000;
  var hour = min * 60;
  var day = hour * 24;
  var week = day * 7;
  var month =  week*4;
  var year = month*12;

  // 计算发布时间距离当前时间的周、天、时、分
  var  exceedyear = Math.floor(timeDiff/year);
  var exceedmonth = Math.floor(timeDiff/month);
  var exceedWeek = Math.floor(timeDiff/week);
  var exceedDay = Math.floor(timeDiff/day);
  var exceedHour = Math.floor(timeDiff/hour);
  var exceedMin = Math.floor(timeDiff/min);

  // 最后判断时间差到底是属于哪个区间，然后return
  if(exceedyear<100&&exceedyear>0){
    return exceedyear + '年前';
  }else{
    if(exceedmonth<12&&exceedmonth>0){
      return exceedmonth + '月前';
    }else{
      if(exceedWeek<4&&exceedWeek>0){
        return exceedWeek + '星期前';
      }else{
        if(exceedDay < 7 && exceedDay > 0){
          return exceedDay + '天前';
        }else {
          if (exceedHour < 24 && exceedHour > 0) {
            return exceedHour + '小时前';
          } else {
            return exceedMin + '分钟前';
          }
        }
      }
    }
  }

}

module.exports.getDate = getDate;
module.exports.getTimeStamp = getTimeStamp;