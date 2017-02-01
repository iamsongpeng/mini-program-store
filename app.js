//app.js

//LeanCloud后端云服务，获得 AV 的引用
const AV = require('./libs/av-weapp-min.js');
//在 app.js 中初始化应用
AV.init({
  appId: 'NifgaRbeW9zYQU8pP4zxPC9S-gzGzoHsz',
  appKey: 'Ygv6uGw1TQmpB2Kk18m5TgvX',
});

App({
  onLaunch: function () {

    //使用当前用户身份登录
    AV.User.loginWithWeapp().then(user => {
      this.globalData.user = user.toJSON();
    }).catch(console.error);

    // 假设已经通过 AV.User.loginWithWeapp() 登录
    // 获得当前登录用户
    const user = AV.User.current(); //为啥把这句放在这就报错呢？
    // 调用小程序 API，得到用户信息
    wx.getUserInfo({
      success: ({userInfo}) => {
        // 更新当前用户的信息
        const user = AV.User.current();
        user.set(userInfo).save().then(user => {
          // 成功，此时可在控制台中看到更新后的用户信息
          this.globalData.user = user.toJSON();
        }).catch(console.error);
      }
    });

  },
  globalData: {
    userInfo: null
  }
})