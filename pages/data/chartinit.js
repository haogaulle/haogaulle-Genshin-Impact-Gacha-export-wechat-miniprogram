import * as echarts from '../../ec-canvas/echarts';
const message = require("../search/message.js");

var upBug = function(authkey, info="错误发生") {
  wx.request({
    url: 'https://haogaulle.top/gachaapi/gachabug/',
      method: 'POST',
      data: {
          info: info,
          authkey: "xxx=" + authkey + "&xxx"
      },
      dataType: 'json',
      success: () => {}
  })
}

var init = {

    canvas_1: function(canvas, width, height, dpr) {
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // 像素
        });
        canvas.setChart(chart);
      
        var app = getApp();
        try {
          var r3_sum = app.globalData.jsc.sum - app.globalData.jsc.r5_sum - app.globalData.jsc.r4_wq - app.globalData.jsc.r4_js;
          var option = {
              title: {
                text: '角色活动祈愿',
                subtext: app.globalData.jsc.end + " - " + app.globalData.jsc.start,
                left: 'center',
                top: '20',
                textStyle: {
                  color: "#ffffff"
                },
                subtextStyle: {
                  color: "rgba(255,255,255,0.5)"
                }
              },
              legend: {
                left: 'center',
                bottom: '20',
                textStyle: {
                  color: "rgba(255,255,255,0.8)"
                }
              },
              series: [
                {
                  name: 'Access From',
                  type: 'pie',
                  radius: ['25%', '40%'],
                  label: {
                    fontWeight: 'lighter',
                    fontStyle: 'normal',
                    color: 'rgba(255,255,255,0.8)',
                    formatter: '{b}\n{d}%',
                  },
                  data: [
                    { value: app.globalData.jsc.r5_js_sum, name: '五星角色' },
                    { value: app.globalData.jsc.r4_js, name: '四星角色' },
                    { value: app.globalData.jsc.r4_wq, name: '四星武器' },
                    { value: r3_sum, name: '三星武器' },
                  ],
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
          };
        } catch (err) {
          upBug(app.globalData.authkey);
          message.unknowErrorForData();
        }
        chart.setOption(option);
        return chart;
      },

      canvas_2: function(canvas, width, height, dpr) {
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // 像素
        });
        canvas.setChart(chart);
      
        var app = getApp();
        try {
          var r3_sum = app.globalData.czc.sum - app.globalData.czc.r5_sum - app.globalData.czc.r4_wq - app.globalData.czc.r4_js;
          var option = {
              title: {
                text: '常驻活动祈愿',
                subtext: app.globalData.czc.end + " - " + app.globalData.czc.start,
                left: 'center',
                top: '20',
                textStyle: {
                  color: "#ffffff"
                },
                subtextStyle: {
                  color: "rgba(255,255,255,0.5)"
                }
              },
              legend: {
                left: 'center',
                bottom: '20',
                textStyle: {
                  color: "rgba(255,255,255,0.8)"
                }
              },
              series: [
                {
                  name: 'Access From',
                  type: 'pie',
                  radius: ['25%', '40%'],
                  label: {
                    fontWeight: 'lighter',
                    fontStyle: 'normal',
                    color: 'rgba(255,255,255,0.8)',
                    formatter: '{b}\n{d}%',
                  },
                  data: [
                    { value: app.globalData.czc.r5_js_sum, name: '五星角色' },
                    { value: app.globalData.czc.r4_js, name: '四星角色' },
                    { value: app.globalData.czc.r4_wq, name: '四星武器' },
                    { value: r3_sum, name: '三星武器' },
                    { value: app.globalData.czc.r5_wq_sum, name: '五星武器' }
                  ],
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
          };
        } catch (err) {
          this.upBug(app.globalData.authkey);
          message.unknowErrorForData();
        }
        chart.setOption(option);
        return chart;
      },

      canvas_3: function(canvas, width, height, dpr) {
        const chart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // 像素
        });
        canvas.setChart(chart);
      
        var app = getApp();
        try {
          var r3_sum = app.globalData.wqc.sum - app.globalData.wqc.r5_sum - app.globalData.wqc.r4_wq - app.globalData.wqc.r4_js;
          var option = {
              title: {
                text: '武器活动祈愿',
                subtext: app.globalData.wqc.end + " - " + app.globalData.wqc.start,
                left: 'center',
                top: '20',
                textStyle: {
                  color: "#ffffff"
                },
                subtextStyle: {
                  color: "rgba(255,255,255,0.5)"
                }
              },
              legend: {
                left: 'center',
                bottom: '20',
                textStyle: {
                  color: "rgba(255,255,255,0.8)"
                }
              },
              series: [
                {
                  name: 'Access From',
                  type: 'pie',
                  radius: ['25%', '40%'],
                  label: {
                    fontWeight: 'lighter',
                    fontStyle: 'normal',
                    color: 'rgba(255,255,255,0.8)',
                    formatter: '{b}\n{d}%',
                  },
                  data: [
                    { value: app.globalData.wqc.r5_wq_sum, name: '五星武器' },
                    { value: app.globalData.wqc.r4_js, name: '四星角色' },
                    { value: app.globalData.wqc.r4_wq, name: '四星武器' },
                    { value: r3_sum, name: '三星武器' },
                  ],
                  emphasis: {
                    itemStyle: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                  }
                }
              ]
          };
        } catch (err) {
          this.upBug(app.globalData.authkey);
          message.unknowErrorForData();
        }
        chart.setOption(option);
        return chart;
      }
}

module.exports = init;