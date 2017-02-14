## 写在前面

本人是个初学者，2016年9月份开始接触编程，真正确定自学编程是10月份的事情，正好赶上微信小程序开发热潮，所以就以它为主要学习目标。

这个小作品是个人学习用，仅供学习参考！

欢迎前辈朋友给予指正问题和不足，也感谢鼓励，谢谢！

github地址：https://github.com/iamsongpeng/mini-program-store

## 待完善内容：

* 动态绑定标题
* 页面内刷新内容
* 马上购物和加入购物车按钮实现：sku商品组合
    * [Sku算法，Android实现，淘宝Sku实现](https://github.com/DesignPCode/Sku)
* LeanCloud 数据库更新，不合理之处修正修正
* 分类页背景颜色变化效果制作
* 最新页和最热页制作
* 购物车demo优化，逻辑层完善
* 我的页demo优化，逻辑层完善
* 新增地址页：逻辑层完善

## 已更新内容：

### 2017-2-14 更新日志

1. READEME.md文件增加日志内容
2. 优化添加地址页的 form 表单，使用伪元素和定位实现倒三角符号；

### 历史更新日志

[历史更新日志]()

## 微信小程序商城demo(模仿"Coolbuy玩物志"小程序)

![首页](http://odhng6tv1.bkt.clouddn.com/mini-program-store-index.png)

![分类页](http://odhng6tv1.bkt.clouddn.com/mini-program-store-classify.png)

![分类详情页](http://odhng6tv1.bkt.clouddn.com/mini-program-store-classifydetail.png)

![详情页](http://odhng6tv1.bkt.clouddn.com/mini-program-store-detail.png)

![详情页，加入购物车弹窗](http://odhng6tv1.bkt.clouddn.com/mini-program-store-to-cart.png)

![购物车](http://odhng6tv1.bkt.clouddn.com/mini-program-store-cart.png)

![我的页，我的订单](http://odhng6tv1.bkt.clouddn.com/mini-program-store-order.png)

![我的页，地址管理](http://odhng6tv1.bkt.clouddn.com/mini-program-store-address.png)

![新增地址](http://odhng6tv1.bkt.clouddn.com/mini-program-store-add-address01.png)

## 主要思路

持续待更新中~

### 首页
### 分类页
### 分类详情页
### 详情页
### 详情页，加入购物车弹窗
### 购物车
### 我的页，我的订单
### 我的页，地址管理

### 新增地址

#### 样式

##### 倒三角符号实现

主要利用了伪元素和定位来完成：

这里首先定义一个view（类比html中的div），给它加上一个`view`叫做`view-triangle`，主要是用来给它自身定义背景，宽高，并且需要加上相对定位，因为它里面的三角符号需要在它的基础上进行绝对定位；

在这个view class上面加一个before或者after的伪元素，这个就是三角符号，主要利用了它的border属性，定义三个border，让border-left和border-right透明，让border-top（或border-bottom）非透明，取决于你想将这个三角符号设置成什么颜色。

最后需要给这个三角符号进行绝对定位，如果你要将它放在这个view的最下面，可以设置bottom：0，如果你要做一个导航类的三角让它在view顶部并指向某元素，可以采用负的top值进行实现，其为负的border的宽度，就可以让它和view连在一起。

同时，要设置这个伪元素宽高为0，内容为空，剩下的工作就是调整它的位置了。

原文：[《使用html+css实现三角标示符号》](http://www.cnblogs.com/myzhibie/p/4103710.html)
