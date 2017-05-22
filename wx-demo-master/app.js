//app.js
App({
  onLaunch: function () {
    wx.login({
      success: function(res) {
        if (res.code) {
          //发起网络请求
          console.log(res);
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  }
})