Page({
    data: {
        classifyDetail: [],
        productNewList: []
    },
    onLoad: function (options) {
        // 生命周期函数--监听页面加载
        console.log(options)
        var that = this;
        //分类详情页数据
        wx.request({
            url: 'https://api.leancloud.cn/1.1/classes/ClassifyDetail/' + options.id,
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
                that.setData({
                    classifyDetail: res.data.data,
                    productNewList: res.data.data
                })
                //动态改变标题
                wx.setNavigationBarTitle({
                    title: res.data.data[0].name
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
    }
})