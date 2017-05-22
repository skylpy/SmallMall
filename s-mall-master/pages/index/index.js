//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    hidden: false
  },
  //事件处理函数
  swiperchange: function (e) {
    //console.log(e.detail.current)
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this;

    wx.request({
      url: 'http://huanqiuxiaozhen.com/wemall/slider/list',
      data: {},
      method: 'GET',
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        //console.log(res)
        that.setData(
          { image: res.data }
        )
      }
    })

    wx.request({
      url: 'http://huanqiuxiaozhen.com/wemall/venues/venuesList',
      method: 'GET',
      data: {},
      header: {
        'accept': 'application/json'
      },
      success: function (res) {
        that.setData({
          venuesItems: res.data.data
        })
        setTimeout(function () {
          that.setData({
            hidden: true
          })
        }, 500)
      }
    })

    wx.request({
      url: 'http://huanqiuxiaozhen.com/wemall/goods/choiceList',
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        that.setData({
          choiceItems: res.data.data.dataList
        })
        setTimeout(function () {
          that.setData({
            hidden: true
          })
        }, 1500)
      }
    })

    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})
