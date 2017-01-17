//index.js
//获取应用实例
Page({
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    cnodeData: []
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var that = this;

    //首页，轮播图
    wx.request({
      url: 'http://huanqiuxiaozhen.com/wemall/slider/list',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
      console.log(res);
      that.setData({
        imgUrls: res.data
      })
      }
    });
    //主题馆
    wx.request({
      url: 'http://huanqiuxiaozhen.com/wemall/venues/venuesList',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res);
        that.setData({
          venues_items: res.data.data
        })
      }
    })

    //精选商品
    wx.request({
      url: 'http://huanqiuxiaozhen.com/wemall/goods/choiceList',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log(res);
        that.setData({
          choice_items: res.data.data.dataList
        })
      }
    })
  },
  onReady: function () {
    // 生命周期函数--监听页面初次渲染完成
    
  },
  onShow: function () {
    // 生命周期函数--监听页面显示
    
  },
  onHide: function () {
    // 生命周期函数--监听页面隐藏
    
  },
  onUnload: function () {
    // 生命周期函数--监听页面卸载
    
  },
  onPullDownRefresh: function () {
    // 页面相关事件处理函数--监听用户下拉动作
    
  },
  onReachBottom: function () {
    // 页面上拉触底事件的处理函数
    
  },
  onShareAppMessage: function () {
    // 用户点击右上角分享
    return {
      title: 'title', // 分享标题
      desc: 'desc', // 分享描述
      path: 'path' // 分享路径
    }
  }
})