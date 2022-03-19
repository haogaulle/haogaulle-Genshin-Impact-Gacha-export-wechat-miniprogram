// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    jsc: {
      sum: 0,
      start: "无数据",
      end: "无数据",
      r5_info: [],
      r5_info_wq: [],
      r5_info_js: [],
      r5_sum: 0,
      r4_js: 0,
      r4_wq: 0,
      lj: 0,
      avg: 0,
      counter: 0
    },
    wqc: {
      sum: 0,
      start: "",
      end: "",
      r5_info_wq: [],
      r5_info_js: [],
      r5_info: [],
      r5_sum: 0,
      r4_js: 0,
      r4_wq: 0,
      lj: 0,
      avg: 0,
      counter: 0
    },
    czc: {
      sum: 0,
      start: "",
      end: "",
      r5_info: [],
      r5_info_wq: [],
      r5_info_js: [],
      r5_sum: 0,
      r4_js: 0,
      r4_wq: 0,
      lj: 0,
      avg: 0,
      counter: 0
    },
  }
})
