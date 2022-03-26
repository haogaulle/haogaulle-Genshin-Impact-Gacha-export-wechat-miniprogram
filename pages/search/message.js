var message = {
    overTime: () => {
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
    },

    authkeyError: () => {
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
    },

    unknowError: () => {
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
    },

    unknowErrorForData: () => {
        wx.showToast({
            title: '请提交bug',
            icon: 'error',
            success: (msg) => {
              setTimeout(
                  function(){
                      wx.hideToast({
                        success: (res) => {
                            wx.redirectTo({
                              url: '../search/search',
                            })
                        },
                      })
                  },
                  3000
              );
            },
        });
    }
}

module.exports = message