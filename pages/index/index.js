//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    imgUrls: [],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    classesPic: [],
    shelf: {
      english_name: "New Arrivals",
      name: "新品上架"
    },
    productNewList: [],
    bindtapName: "index",
    hiddenNew: true,
    hiddenHot: true,
    hiddenIndex: false
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var that = this;
    //首页，轮播图
    wx.request({
      url: 'https://api.leancloud.cn/1.1/classes/Swiper/587d6cd75c497d0058b0ea7c',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        // 设置请求的 header，content-type 默认为 'application/json'
        'X-LC-Id': 'NifgaRbeW9zYQU8pP4zxPC9S-gzGzoHsz',
        'X-LC-Key': 'Ygv6uGw1TQmpB2Kk18m5TgvX'
      },
      success: function (res) {
        // success
        that.setData({
          imgUrls: res.data.data
        })
      }
    });

    //货架分类
    wx.request({
      url: 'https://api.leancloud.cn/1.1/classes/Classify/587ed398128fe100570ad98d',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        // 设置请求的 header，content-type 默认为 'application/json'
        'X-LC-Id': 'NifgaRbeW9zYQU8pP4zxPC9S-gzGzoHsz',
        'X-LC-Key': 'Ygv6uGw1TQmpB2Kk18m5TgvX'
      },
      success: function (res) {
        // success
        console.log(res)
        var classesPic = res.data.data;
        that.setData({
          classesPic: classesPic
        })
      }
    });
    //货架列表
    wx.request({
      url: 'https://api.leancloud.cn/1.1/classes/ProductDetail',
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        // 设置请求的 header，content-type 默认为 'application/json'
        'X-LC-Id': 'NifgaRbeW9zYQU8pP4zxPC9S-gzGzoHsz',
        'X-LC-Key': 'Ygv6uGw1TQmpB2Kk18m5TgvX'
      },
      success: function (res) {
        // success
        console.log(res.data.results)
        let productNewList = res.data.results
        that.setData({
          productNewList: productNewList
        })
      }
    });

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
  },
  toNew: function (res) {
    this.setData({
      hiddenNew: false,
      hiddenHot: true,
      hiddenIndex: true
    })
  },
  toHot: function (res) {
    this.setData({
      hiddenNew: true,
      hiddenHot: false,
      hiddenIndex: true
    })
  },
  toIndex: function () {
    this.setData({
      hiddenNew: true,
      hiddenHot: true,
      hiddenIndex: false
    })
  }
})