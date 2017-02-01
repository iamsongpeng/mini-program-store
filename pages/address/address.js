//获得 leanCloud AV 的引用
const AV = require('../../libs/av-weapp-min.js');

Page({
  isDefault: false,
  // 表单提交事件
  formSubmit: function (e) {
    console.log(e);
    // user 
    var user = AV.User.current();
    // detail 详情地址
    var detail = e.detail.value.detail;
    // realname 收件人姓名
    var realname = e.detail.value.realname;
    // mobile 手机号码
    var mobile = e.detail.value.mobile;
    // save address to leanCloud
    var address = new AV.Object('Address');
    // if isDefault address
    address.set('isDefault', this.isDefault);
    address.set('detail', detail);
    // set province city region
    address.set('province', this.data.province[this.data.provinceIndex]);
    address.set('city', this.data.city[this.data.cityIndex]);
    address.set('region', this.data.region[this.data.regionIndex]);
    address.set('user', user);
    address.set('realname', realname);
    address.set('mobile', mobile);
    // Address对象保存到LeanCloud链式调用
    address.save().then(function (address) { //then()接受两个函数参数，成功和失败
      console.log(address);
      wx.showToast({
        title: 'Add Success'
      });
      // navi back
      wx.navigateBack();
    }, function (error) {
      console.log(error);
    });
  },
  data: {
    current: 0,
    province: [],
    city: [],
    region: [],
    town: [],
    provinceObjects: [],
    cityObjects: [],
    regionObjects: [],
    townObjects: [],
    areaSelectedStr: '请选择省市区',
    maskVisual: 'hidden',
    provinceName: '请选择'
  },
  getArea: function (pid, cb) {
    var that = this;
    // query area by pid
    var query = new AV.Query('Area');
    query.equalTo('pid', pid);
    query.find().then(function (area) {
      cb(area);
    }, function (err) {

    });
  },
  //生命周期函数--监听页面加载
  onLoad: function () {
    var that = this;
    // load province
    this.getArea(0, function (area) {
      var array = [];
      for (var i = 0; i < area.length; i++) {
        array[i] = area[i].get('name');
      }
      that.setData({
        province: array,
        provinceObjects: area
      });
    });
    // if isDefault, address is empty
    this.setDefault();
    this.cascadePopup();
    // TODO:load default city...
  },
  setDefault: function () {
    var that = this;
    var user = AV.User.current();
    // if user has no address, set the address for default
    var query = new AV.Query('Address');
    query.equalTo('user', user);
    query.count().then(function (count) {
      if (count <= 0) {
        that.isDefault = true;
      }
    });
  },
  //请选择省市区 事件
  cascadePopup: function () {
    // 创建一个动画实例animation。调用实例的方法来描述动画。
    var animation = wx.createAnimation({
      duration: 500, // 动画持续时间
      timingFunction: 'ease-in-out', // 定义动画的效果，默认值"linear"
    });
    this.animation = animation;
    // 调用动画操作方法后要调用 step() 来表示一组动画完成
    animation.translateY(-285).step();
    this.setData({
      // 最后通过动画实例的export方法导出动画数据传递给组件的animation属性。
      animationData: this.animation.export(),
      maskVisual: 'show'
    });
  },
  //点击遮区域关闭弹窗
  cascadeDismiss: function () {
    this.animation.translateY(285).step();
    this.setData({
      animationData: this.animation.export(),
      maskVisual: 'hidden'
    });
  },
  provinceTapped: function (e) {
    // 标识当前点击省份，记录其名称与主键id都依赖它
    var index = e.currentTarget.dataset.index;
    // current为1，使得页面向左滑动一页至市级列表
    // provinceIndex是市区数据的标识
    this.setData({
      provinceName: this.data.province[index],
      regionName: '',
      townName: '',
      provinceIndex: index,
      cityIndex: -1,
      regionIndex: -1,
      townIndex: -1,
      region: [],
      town: []
    });
    var that = this;
    //provinceObjects是一个LeanCloud对象，通过遍历得到纯字符串数组
    // getArea方法是访问网络请求数据，网络访问正常则一个回调function(area){}
    this.getArea(this.data.provinceObjects[index].get('aid'), function (area) {
      var array = [];
      for (var i = 0; i < area.length; i++) {
        array[i] = area[i].get('name');
      }
      // city就是wxml中渲染要用到的城市数据，cityObjects是LeanCloud对象，用于县级标识取值
      that.setData({
        cityName: '请选择',
        city: array,
        cityObjects: area
      });
      // 确保生成了数组数据再移动swiper
      that.setData({
        current: 1
      });
    });
  },
  cityTapped: function (e) {
    // 标识当前点击县级，记录其名称与主键id都依赖它
    var index = e.currentTarget.dataset.index;
    // current为1，使得页面向左滑动一页至市级列表
    // cityIndex是市区数据的标识
    this.setData({
      cityIndex: index,
      regionIndex: -1,
      townIndex: -1,
      cityName: this.data.city[index],
      regionName: '',
      townName: '',
      town: []
    });
    var that = this;
    //cityObjects是一个LeanCloud对象，通过遍历得到纯字符串数组
    // getArea方法是访问网络请求数据，网络访问正常则一个回调function(area){}
    this.getArea(this.data.cityObjects[index].get('aid'), function (area) {
      var array = [];
      for (var i = 0; i < area.length; i++) {
        array[i] = area[i].get('name');
      }
      // region就是wxml中渲染要用到的城市数据，regionObjects是LeanCloud对象，用于县级标识取值
      that.setData({
        regionName: '请选择',
        region: array,
        regionObjects: area
      });
      // 确保生成了数组数据再移动swiper
      that.setData({
        current: 2
      });
    });
  },
  regionTapped: function (e) {
    // 标识当前点击镇级，记录其名称与主键id都依赖它
    var index = e.currentTarget.dataset.index;
    // current为1，使得页面向左滑动一页至市级列表
    // regionIndex是县级数据的标识
    this.setData({
      regionIndex: index,
      townIndex: -1,
      regionName: this.data.region[index],
      townName: ''
    });
    var that = this;
    //townObjects是一个LeanCloud对象，通过遍历得到纯字符串数组
    // getArea方法是访问网络请求数据，网络访问正常则一个回调function(area){}
    this.getArea(this.data.regionObjects[index].get('aid'), function (area) {
      // 假如没有镇一级了，关闭悬浮框，并显示地址
      if (area.length == 0) {
        var areaSelectedStr = that.data.provinceName + that.data.cityName + that.data.regionName;
        that.setData({
          areaSelectedStr: areaSelectedStr
        });
        that.cascadeDismiss();
        return;
      }
      var array = [];
      for (var i = 0; i < area.length; i++) {
        array[i] = area[i].get('name');
      }
      // region就是wxml中渲染要用到的县级数据，regionObjects是LeanCloud对象，用于县级标识取值
      that.setData({
        townName: '请选择',
        town: array,
        townObjects: area
      });
      // 确保生成了数组数据再移动swiper
      that.setData({
        current: 3
      });
    });
  },
  townTapped: function (e) {
    // 标识当前点击镇级，记录其名称与主键id都依赖它
    var index = e.currentTarget.dataset.index;
    // townIndex是镇级数据的标识
    this.setData({
      townIndex: index,
      townName: this.data.town[index]
    });
    var areaSelectedStr = this.data.provinceName + this.data.cityName + this.data.regionName + this.data.townName;
    this.setData({
      areaSelectedStr: areaSelectedStr
    });
    this.cascadeDismiss();
  },
  currentChanged: function (e) {
    // swiper滚动使得current值被动变化，用于高亮标记
    var current = e.detail.current;
    this.setData({
      current: current
    });
  },
  changeCurrent: function (e) {
    // 记录点击的标题所在的区级级别
    var current = e.currentTarget.dataset.current;
    this.setData({
      current: current
    });
  }
})