
//获得 leanCloud AV 的引用
const AV = require('../../libs/av-weapp-min.js');

//获取应用实例
var app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {}

  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var that = this
    // 调用应用实例的方法获取全局数据
    console.log(app.globalData.user)
    var userInfo = app.globalData.user
    that.setData({
      userInfo: userInfo
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