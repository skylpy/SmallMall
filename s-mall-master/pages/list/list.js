Page({
  data:{
    hidden:false
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载

    var that=this;
    console.log(options)
    wx.request({
      url: 'http://www.huanqiuxiaozhen.com/wemall/goods/inqGoodsByTypeBrand?brand=' + options.brand + "&typeid=" + options.typeid,
           
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
          'accept':'application/json'
      }, // 设置请求的 header
      success: function(res){
        console.log(res.data.data)
        that.setData({
          list:res.data.data
        })
        setTimeout(function(){
          that.setData({
            hidden:true
          })
        },500)
      },     
    })
  }
  
})