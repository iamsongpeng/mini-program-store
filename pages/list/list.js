Page({
  data: {

  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var that = this;
    wx.request({
      url: 'http://huanqiuxiaozhen.com/wemall/goods/inqGoodsByTypeBrand?brand=' + options.brand + '&typeid=' + options.typeid,
      data: {},
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        // success
        console.log(res)
        that.setData({
          list: res.data.data
        })
      }
    })
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