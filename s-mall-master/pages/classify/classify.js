// pages/classify/classify.js
Page({
  data:{
    id:1,
    ind:0
  },
  onLoad:function(options){

    var that=this;
    // 页面初始化 options为页面跳转所带来的参数
    wx.request({
      url: 'http://huanqiuxiaozhen.com/wemall/goodstype/typebrandList',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'accept':'application/json'
      }, // 设置请求的 header
      success: function(res){
        that.setData({
          left:res.data,
          right:res.data,
        })
        console.log(res.data)
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })

  },

  click:function(e){
    let id=e.target.dataset.id;
    let index=e.target.dataset.index;
        console.log(e)
        console.log(e.target.dataset.id,e.target.dataset.index)
    this.setData({
      id:id,
      ind:index
    })
  }
  
})