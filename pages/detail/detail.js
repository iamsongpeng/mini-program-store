Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    hiddenDetail: false,
    hiddenSpecification: true,
    hiddenBrand: true,
    payNow: true,
    maskVisual: 'hidden'
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    console.log(options)
    var that = this
    //商品详情页
    wx.request({
      url: 'https://api.leancloud.cn/1.1/classes/ProductDetail/' + options.id,
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
          shoppingDetails: res.data.object
        })
        var goodsPicsInfo = []
        var goodspic = res.data.object.swiper
        var goodspics = goodspic.substring(0, goodspic.length - 1) //去掉字符串最后一个#
        var goodspicsArr = goodspics.split("#") //通过字符串中间间隔 # 来剪断字符串
        for (var i = 0; i < goodspicsArr.length; i++) { //
          goodsPicsInfo.push({
            "picurl": goodspicsArr[i]
          })
        }
        that.setData({
          goodsPicsInfo: goodsPicsInfo
        })
        console.log(that.data.goodsPicsInfo)
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
  // 细节描述
  toDetail: function () {
    this.setData({
      hiddenDetail: false,
      hiddenSpecification: true,
      hiddenBrand: true
    });
  },
  // 规格参数
  toSpecification: function () {
    this.setData({
      hiddenDetail: true,
      hiddenSpecification: false,
      hiddenBrand: true
    });
  },
  // 品牌描述
  toBrand: function () {
    this.setData({
      hiddenDetail: true,
      hiddenSpecification: true,
      hiddenBrand: false
    });
  },
  bindCheckout: function () {
    this.setData({
      payNow: false
    })
  },
  bindClose: function () {
    this.setData({
      payNow: true
    })
  },
  //马上购买事件
  cascadePopup: function() {
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease-in-out'
    });
    this.animation = animation;
    animation.translateY(-336).step();
    this.setData({
      animationData: this.animation.export(),
      maskVisual: 'show'
    })
  },
  //点击遮区域关闭弹窗
  cascadeDismiss: function () {
    this.animation.translateY(285).step();
    this.setData({
      animationData: this.animation.export(),
      maskVisual: 'hidden'
    });
  },
  //添加购物车事件方法
  toCart: function (event) {
    var animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease-in-out'
    });
    this.animation = animation;
    animation.translateY(-336).step();
    this.setData({
      animationData: this.animation.export(),
      maskVisual: 'show'
    });
    var that = this
    //获取缓存中的已添加购物车信息
    var cartItems = wx.getStorageSync('cartItems') || []
    console.log(cartItems)
    //
    var exist = cartItems.find(function (ele) {
      return ele.id === event.target.dataset.id
    })
    console.log(exist)
    if (exist) {
      exist.quantity = parseInt(exist.quantity) + 1
    } else {
      cartItems.push({
        id: event.target.dataset.id,
        quantity: 1,
        price: event.target.dataset.price,
        title: event.target.dataset.title,
        goodsPicsInfo: event.target.dataset.pic
      })
    }
    //加入购物车数据，存入缓存
    wx.setStorage({
      key: 'cartItems',
      data: cartItems,
      success: function (res) {
        // success
      }
    })
    //添加购物车的消息提示框
    // wx.showToast({
    //   title: "添加购物车",
    //   icon: "success",
    //   durantion: 2000
    // })
  }
})