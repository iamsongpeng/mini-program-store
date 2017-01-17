const AV = require('../../libs/av-weapp-min.js');
Page({
  data: {
    phone: "您的手机号是？",
    todos: [],
    swiper: []
  },
  onLoad: function (options) {
    

  },

  onReady: function () {
    // new AV.Query('Swiper')
    //   .descending('createdAt')
    //   .find()
    //   .then(todos => this.setData({ swiper }))
    //   .catch(console.error);
    // new AV.Query('Todo')
    //   .descending('createdAt')
    //   .find()
    //   .then(todos => this.setData({ todos }))
    //   .catch(console.error);

  },

  //
  requestCode: function (e) {
    console.log(e.detail.value.phone);
    var that = this;
    that.setData({
      "phone": e.detail.value.phone
    })
    AV.Cloud.requestSmsCode({
      mobilePhoneNumber: that.data.phone,
      name: '宋鹏商城',
      op: '手机验证',
      ttl: 10
    }).then(function () {
      wx.showToast({
        "title": "获取验证码",
        "icon": "success"
      });
    }, function (err) {
      console.log(err);
    });
  },
  //
  verifyCode: function (e) {
    AV.Cloud.verifySmsCode(e.detail.value.code, this.data.phone).then(function () {
      wx.showToast({
        "title": "验证成功",
        "icon": "success"
      })
    }, function (err) {
      console.log(err);
    });
  }

})