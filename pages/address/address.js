//获得 leanCloud AV 的引用
const AV = require('../../libs/av-weapp-min.js');

Page({
  data: {

  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var that = this;
    wx.request({
      url: 'https://api.leancloud.cn/1.1/classes/AddressData/58a0518a128fe1006cee6c85',
      data: {},
      method: 'GET',
      header: {
        // 设置请求的 header，content-type 默认为 'application/json'
        'X-LC-Id': 'NifgaRbeW9zYQU8pP4zxPC9S-gzGzoHsz',
        'X-LC-Key': 'Ygv6uGw1TQmpB2Kk18m5TgvX'
      }, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res.data)
        var array = res.data.data.p

        that.setData({
          array: array
        })
        console.log(array)
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
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
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  }
})

