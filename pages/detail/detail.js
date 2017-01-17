Page({
  data:{
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000
  },
  onLoad:function(options){
    // 生命周期函数--监听页面加载
    var that = this
    wx.request({
      url: 'http://huanqiuxiaozhen.com/wemall/goods/inqgoods?id='+options.id,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res)
        that.setData({
          shoppingDetails: res.data.data
        })

        var goodsPicsInfo = []
        var goodspic = res.data.data.goodspics
        var goodspics = goodspic.substring(0,goodspic.length-1) //去掉字符串最后一个#
        var goodspicsArr = goodspics.split("#") //通过字符串中间间隔 # 来剪短字符串
        for (var i=0; i<goodspicsArr.length; i++) { //
          goodsPicsInfo.push({
            "picurl": goodspicsArr[i]
          })
        }
        that.setData({
          goodsPicsInfo: goodsPicsInfo
        })
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
    
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
    
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
    
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
    
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
    
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
    
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})