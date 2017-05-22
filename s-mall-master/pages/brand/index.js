// pages/first/first.js
var app = getApp()
Page({
    data: {
        hidden:false
    },
    onLoad: function(options) {
        console.log(options);
        var that = this
        
        wx.request({
            url: 'http://www.huanqiuxiaozhen.com/wemall/venues/getBrandAndType?id=' + options.id,
            method: 'GET',
            data: {},
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
                console.log(res.data.data)
                that.setData({
                    brandList: res.data.data
                })
                setTimeout(function(){
                    that.setData({
                        hidden:true
                    })
                },500)
            }
        })
    }

})