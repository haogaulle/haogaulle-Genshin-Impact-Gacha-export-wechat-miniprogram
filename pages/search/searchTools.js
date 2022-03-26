var colorSet = {
  wind: ['温迪', '琴', '枫原万叶', '魈', '和璞鸢', '磐岩结绿', '天空之翼', '天空之脊', '风鹰剑', '#58FAAC'],
  stone: ['钟离', '阿贝多', '昆吾断虹', '斫峰之刃', '尘世之锁', '荒泷一斗', '赤角石溃杵', '无工之剑', '贯虹之槊', '#FACC2E'],
  fire: ['迪卢克', '宵宫', '胡桃', '可莉', '狼的末路', '护摩之杖', '#FA5858'],
  light: ['刻晴', '雾切之回光', '雷电将军', '薙草之稻光', '飞雷之弦振', '不灭月华', '八重神子', '神乐之真意', '#9A2EFE'],
  water: ['莫娜', '达达利亚', '阿莫斯之弓', '珊瑚宫心海', '冬极白星', '息灾', '神里绫人', '#5882FA'],
  ice: ['七七', '优菈', '甘雨', '神里绫华', '天空之刃', '天空之卷', '天空之傲', '申鹤', '终末嗟叹之诗', '苍古自由之誓', '松籁响起之时', '四风原典', '#2ECCFA'],
}


function SearchTools() {



  this.requestGet = function(url) {
    return new Promise(function(resolve, reject){
      wx.request({
        url: url,
        dataType: "json",
        success: (res) => {
          resolve(res);
        },
      })
  });
  }


  this.formatRes = function(data) {
    if (data.r5_info.length === 0){
      data.avg = 0;
    }
  }

  this.getColor = function(name) {
    for(var i=0; i<colorSet.wind.length-1; i++) {
      if (name.indexOf(colorSet.wind[i]) >= 0) {
        return colorSet.wind[colorSet.wind.length-1];
      }
    }
    for(var i=0; i<colorSet.fire.length-1; i++) {
      if (name.indexOf(colorSet.fire[i]) >= 0) {
        return colorSet.fire[colorSet.fire.length-1];
      }
    }
    for(var i=0; i<colorSet.stone.length-1; i++) {
      if (name.indexOf(colorSet.stone[i]) >= 0) {
        return colorSet.stone[colorSet.stone.length-1];
      }
    }
    for(var i=0; i<colorSet.light.length-1; i++) {
      if (name.indexOf(colorSet.light[i]) >= 0) {
        return colorSet.light[colorSet.light.length-1];
      }
    }
    for(var i=0; i<colorSet.ice.length-1; i++) {
      if (name.indexOf(colorSet.ice[i]) >= 0) {
        return colorSet.ice[colorSet.ice.length-1];
      }
    }
    for(var i=0; i<colorSet.water.length-1; i++) {
      if (name.indexOf(colorSet.water[i]) >= 0) {
        return colorSet.water[colorSet.water.length-1];
      }
    }
  }

  this.parseData = function(res, ctype){

    var dataset;
    var app = getApp();

    if(ctype === 'j'){
      dataset = app.globalData.jsc;
    }
    if(ctype === 'c'){
      dataset = app.globalData.czc;
    }
    if(ctype === 'w'){
      dataset = app.globalData.wqc;
    }

    dataset.sum = res.length;

    for(var i=res.length-1;i>=0;i--){

      dataset.counter++;  // 计数器加一

      if (res[i].rank_type === "5") {
        dataset.r5_sum++;
        var item_color = this.getColor(res[i].name);
        var item = {
          name: res[i].name,
          id: dataset.counter,
          color: item_color
        }
        dataset.r5_info.push(item);
        if (res[i].item_type === "武器") {
          dataset.r5_wq_sum++;
          dataset.r5_info_wq.push(item);
          dataset.counter = 0;
          continue;
        }
        dataset.r5_info_js.push(item);
        dataset.r5_js_sum++;
        dataset.counter = 0;
      }

      if ((res[i].rank_type === "4")) {
        if (res[i].item_type === "武器") {
          dataset.r4_wq++;
        } else {
          dataset.r4_js++;
        }
      }
    }

    // 反转数组，调整显示顺序
    dataset.r5_info_js.reverse();
    dataset.r5_info_wq.reverse();
    dataset.r5_info.reverse();

    // 计算平均数据
    dataset.avg = parseInt((dataset.sum - dataset.counter) / (dataset.r5_info.length));

    // 记录时间
    if (dataset.sum !== 0) {
      dataset.start = res[0].time;
      dataset.end = res[res.length - 1].time;
    }

    // 格式化数据
    this.formatRes(dataset);
  }
}



module.exports.SearchTools = SearchTools
