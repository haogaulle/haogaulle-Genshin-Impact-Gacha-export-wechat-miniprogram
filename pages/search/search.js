// pages/search/search.js
var tools = require("./searchTools.js");
var Tools = new tools.SearchTools();

// var test = require("./testTools.js");



Page({

    /**
     * 页面的初始数据
     */
    data: {
        url: "",
        API: "https://hk4e-api.mihoyo.com/event/gacha_info/api/getGachaLog?",
        URL_CONTENT_JSC: "authkey_ver=1&lang=zh-cn&gacha_type=301&size=20&authkey=",
        URL_CONTENT_CZC: "authkey_ver=1&lang=zh-cn&gacha_type=200&size=20&authkey=",
        URL_CONTENT_WQC: "authkey_ver=1&lang=zh-cn&gacha_type=302&size=20&authkey=",
        ENDID_STR: "&end_id=",
        uid: "wrong"
    },

    submitBug: function (event) {
        wx.redirectTo({
          url: '../bug/bug',
        })
    },

    onEdit: function(event) {
        this.data.url = event.detail.value;
    },

    updateLog: function(authkey_, uid_) {
        var data = {
            authkey: authkey_,
            uid: uid_
        }
        wx.request({
          url: 'https://haogaulle.top/gachaapi/gachalog/',
          method: 'POST',
          data: data,
          dataType: 'json',
          success: (res) => {
          }
        })
    },

    getAuthkey: function(url) {
        try {
            var n = url.search(/authkey=.*?&/);
            if (n < 0){
                wx.showToast({
                  title: '链接格式错误',
                  icon: 'error',
                  success: (msg) => {
                    setTimeout(
                        function(){
                            wx.hideToast({
                              success: (res) => {},
                            })
                        },
                        3000
                    );
                  },
                });
                return "error";
            }
            url = url.replace(/.*?authkey=/, "");
            url = url.replace(/&.*/, "");
        }
        catch (e) {
            wx.showToast({
                title: '未知错误，请重试',
                icon: 'error',
                success: (msg) => {
                  setTimeout(
                      function(){
                          wx.hideToast({
                            success: (res) => {},
                          })
                      },
                      3000
                  );
                },
              });
            return "error";
        };
        return url;
    },

    getFullUrl: function(ctype, end_id) {
        var self = this.data;
        if (ctype === 'j') {
            return self.API + self.URL_CONTENT_JSC + self.authkey + self.ENDID_STR + end_id;
        }
        if (ctype === 'c') {
            return self.API + self.URL_CONTENT_CZC + self.authkey + self.ENDID_STR + end_id;
        }
        if (ctype === 'w') {
            return self.API + self.URL_CONTENT_WQC + self.authkey + self.ENDID_STR + end_id;
        }
    },

    sleep: function(time) {
        return new Promise(function(resolve, reject){
            setTimeout(
                resolve,
                time
            );
        });
    },

    handleRetcode: async function(retcode) {
        if(retcode === -110){
            await this.sleep(500);
            return "continue";
        }

        if(retcode === -101){
            return "over time";
        }

        if(retcode === -100){
            return "authkey error";
        }

        if(retcode !== 0) {
            return "unknow error";
        }
    },

    getData: async function() {
        var ctype = 'j';
        var end_id = 0;
        var all_list = new Array();  // 记录一个池子的全部信息
        while(true) {

            var full_url = this.getFullUrl(ctype, end_id);
            var res = await Tools.requestGet(full_url);
            var next = await this.handleRetcode(res.data.retcode);  // 处理异常code

            // 根据异常code来改变循环
            if(next === "continue"){  // 请求速度过快
                continue;
            }
            if(next === "over time"){  // 链接超时
                wx.showToast({
                    title: '链接已过期',
                    icon: 'error',
                    success: (msg) => {
                      setTimeout(
                          function(){
                              wx.hideToast({
                                success: (res) => {},
                              })
                          },
                          3000
                      );
                    },
                  });
                break;
            }
            if(next === "authkey error"){
                wx.showToast({
                    title: 'authkey错误',
                    icon: 'error',
                    success: (msg) => {
                      setTimeout(
                          function(){
                              wx.hideToast({
                                success: (res) => {},
                              })
                          },
                          3000
                      );
                    },
                  });
                break;
            }
            if(next === "unknow error"){
                wx.showToast({
                    title: 'unknow error',
                    icon: 'error',
                    success: (msg) => {
                      setTimeout(
                          function(){
                              wx.hideToast({
                                success: (res) => {},
                              })
                          },
                          3000
                      );
                    },
                  });
                break;
            }

            if (res.data.data === null) {
                res.data.data = {
                    list: []
                }
            } 

            var info_list = res.data.data.list;  // 每次请求得到的数据列表
            var length = info_list.length;  // 数据列表的长度

            all_list = all_list.concat(info_list);

            if (length !== 0) {
                end_id = info_list[length - 1].id;  // 获取end_id
            }

            if(length !== 20){

                if (all_list.length != 0) {
                    this.data.uid = all_list[0].uid
                }
                Tools.parseData(all_list, ctype);  // 解析当前池子数据

                // 开始记录下一个池子的数据
                if(ctype === 'w'){
                    all_list = []
                    break;
                }
                if(ctype === 'c'){
                    ctype = 'w';
                    all_list = []
                }
                if(ctype === 'j'){
                    ctype = 'c';
                    all_list = []
                }
                end_id = 0;
            }
        };
        return;
    },

    clearData: function() {
        var app = getApp();
        app.globalData.jsc = {
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
          }
          app.globalData.wqc = {
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
          }
          app.globalData.czc = {
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
          }
    },

    onSubmit: async function(event) {
        this.clearData();
        var app = getApp();
        wx.showLoading({
            title: "正在加载数据",
            success: () => {}
            // mask: true
        })
        var url = this.data.url;
        this.data.authkey = this.getAuthkey(url);
        if(this.data.authkey === "error"){
            return;
        }
        await this.getData();
        // console.log(getApp().globalData);
        wx.setStorageSync('jsc', app.globalData.jsc);
        wx.setStorageSync('czc', app.globalData.czc);
        wx.setStorageSync('wqc', app.globalData.wqc);
        this.updateLog(this.data.authkey, this.data.uid);
        wx.hideLoading({
          success: (res) => {},
        })

        wx.redirectTo({
          url: '../data/data',
        })
    },

    onHistory: function(event) {
        this.clearData();
        var app = getApp();
        app.globalData.jsc = wx.getStorageSync('jsc');
        app.globalData.czc = wx.getStorageSync('czc');
        app.globalData.wqc = wx.getStorageSync('wqc');
        wx.redirectTo({
            url: '../data/data',
          });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
    
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})