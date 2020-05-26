// pay.js
Page({
  data: {
    adr0: '山东省济南市高新区',
    adr1: '丁豪广场',
    adrname: 'Wechat',
    adrtel: 13222213474,
    totalMoney: '', 
    totalCount: '',
    carts: [],
    id:''
  },
  onLoad: function (params) {
    var that = this;
    var list = JSON.parse(params.carts)
    that.setData({
      carts: list
    })
    
    // that.getCart()
  },
  onReady: function () {
    this.getTotalPrice()
  },

  //网络请求获取购物车数据
  // getCart: function () {
  //   var that = this;
  //   // var uid = that.data.uid;
  //   wx.request({
  //     url: 'http://192.168.1.118/findCart',
  //     method: "GET",
  //     header: {
  //       'content-type': 'application/json'
  //     },
  //     success: (result) => {
  //       that.setData({
  //         carts: result.data
  //       })
  //       console.log(result.data)
  //     }
  //   })
  // },
  getTotalPrice() {
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    let num = 0;
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
      total += carts[i].num * carts[i].price;    // 所有价格加起来
      num += carts[i].num;
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalCount: num,
      totalMoney: total.toFixed(2)
    });
  },

  pay: function(){
    wx.showToast({
      title: '购买成功',
      icon: 'success',
      duration: 3000
    })

    // wx.request({
    //   url: 'http://192.168.1.118/deleteCart',
    //   method: "GET",
    //   data: {
    //     id: id
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: (result) => {
    //     console.log(result)
    //     that.getCart()
    //   }
    // })

    wx.reLaunch({
      url: '../demo/demo'
    })
  }

})