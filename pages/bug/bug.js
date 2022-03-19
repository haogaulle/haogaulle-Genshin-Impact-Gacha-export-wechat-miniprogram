// pages/bug/bug.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        info: "",
        authkey: ""
    },

    saveInfo: function (event) {
        this.data.info = event.detail.value;
    },

    saveAuthkey: function (event) {
        this.data.authkey = event.detail.value;
    },

    onSubmit: function () {
        if (this.data.authkey === "" || this.data.info === "") {
            wx.showToast({
              title: '不允许为空',
              icon: 'error',
              mask: 'true',
              success: (res) => {
                  setTimeout(
                      function(){
                          wx.hideToast({
                            success: (res) => {},
                          })
                      },
                      3000
                  )
              }
            })
            return
        }
        wx.showLoading({
          title: '上传中',
        })
        wx.request({
          url: 'https://haogaulle.top/gachaapi/gachabug/',
          method: 'POST',
          data: {
              info: this.data.info,
              authkey: this.data.authkey
          },
          dataType: 'json',
          success: (res) => {
              if (res.data.message === "ok") {
                  wx.hideLoading({
                    success: (res) => {},
                  })
                  wx.showToast({
                    title: '提交成功',
                    icon: 'success',
                    success: () => {
                        setTimeout(
                            function() {
                                wx.hideToast({
                                  success: (res) => {},
                                })
                            },
                            3000
                        )
                    }
                  })
                  return
              }
              else {
                wx.hideLoading({
                  success: (res) => {},
                })
                wx.showToast({
                    title: '未知错误',
                    icon: 'error',
                    mask: 'true',
                    success: (res) => {
                        setTimeout(
                            function(){
                                wx.hideToast({
                                  success: (res) => {},
                                })
                            },
                            3000
                        )
                    }
                  })
              }
          },
          fail: (res) => {
            wx.hideLoading({
              success: (res) => {},
            })
            wx.showToast({
                title: '未知错误',
                icon: 'error',
                mask: 'true',
                success: (res) => {
                    setTimeout(
                        function(){
                            wx.hideToast({
                              success: (res) => {},
                            })
                        },
                        3000
                    )
                }
              })
          }
        })
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