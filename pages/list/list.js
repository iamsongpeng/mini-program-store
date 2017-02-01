Page({
  data: {

  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var that = this;
    //获取商品分类详情
    wx.request({
      url: 'https://api.leancloud.cn/1.1/classes/ClassifyDetail/'+options.id,
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
      }
    });
  },
  //添加购物车事件方法
  tocart: function (event) {
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
    wx.showToast({
      title: "添加购物车",
      icon: "success",
      durantion: 2000
    })
  }
})