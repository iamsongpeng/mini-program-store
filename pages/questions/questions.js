const AV = require('../../libs/av-weapp-min.js');
Page({
  data: {
    "page": 0
  },
  onLoad: function (options) {
    var that = this;
    var query = new AV.Query('question');
    query.limit(10);
    query.include('replyer', 'asker');
    query.find().then(function (results) {
      results.forEach(function (result) {
        result.set('asker', result.get('asker') ? result.get('asker').toJSON() : null);
        result.set('replyer', result.get('replyer') ? result.get('replyer').toJSON() : null);
      });
      that.setData({
        "data": results
      })
    }, function (error) {
    });
  },
  onPullDownRefresh: function () {
    var that = this;
    var query = new AV.Query('question');
    query.limit(10);
    query.include("replyer");
    query.find().then(function (results) {
      that.setData({
        "data": results,
        "page": 0
      })
      wx.stopPullDownRefresh()
    }, function (error) {
    });
  },
  onReachBottom: function () {
    var that = this;
    that.setData({
      "page": that.data.page + 1
    })
    console.log(that.data.page);
    var newdata = that.data.data;
    var query = new AV.Query('question');
    query.limit(10);
    query.include("replyer");
    query.skip(10 * that.data.page)
    query.find().then(function (results) {
      newdata.push(...results);
      that.setData({
        "data": newdata
      })
    }, function (error) {
    });
  },
  onClick: function (e) {
    wx.navigateTo({
      url: '../question/question?id=' + e.currentTarget.dataset.id
    })
  },
  onShareAppMessage: function () {
    return {
      "title": "极客分答",
      "desc": "这里是极客分答",
      "path": "/pages/index/index"
    }
  }
})