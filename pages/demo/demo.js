//demo.js
var app = getApp()
Page({
  data: {
    motto: 'MiHome_Store',
    userInfo: {},
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 100,
    items: '',
    "banner_list": [
      {
        "banner": [
          {
            "pic_url": "https://img30.360buyimg.com/da/jfs/t1/111100/32/7988/166624/5ec77d50Edae3aecf/90b1d37b2f591529.jpg!q90.webp",
          },
          {
            "pic_url": "https://img14.360buyimg.com/da/jfs/t1/127887/2/2744/87534/5ec7fe37E9e1704db/b347d6f4e90a3739.jpg!q90.webp",
          },
          {
            "pic_url": "https://img12.360buyimg.com/da/jfs/t1/112092/31/6971/138221/5ebe6142E1317dccd/ef9f8837090b31d6.jpg!q90.webp",
          },
          {
            "pic_url": "https://img14.360buyimg.com/da/jfs/t1/54728/2/14637/57293/5db7a434Eeaf7e134/f3326afd7eb731ab.jpg!q90.webp",
          },
          {
            "pic_url": "https://img14.360buyimg.com/da/jfs/t1/127909/29/2523/93050/5ec62577E1f85780a/4bbeb4e04fa9053e.jpg!q90.webp",
          }
        ]
      }
    ],
  },
  //事件处理函数
  cliockToGoods: function (e) { 
    var goodsId = e.currentTarget.id
    console.log('goodsId='+goodsId)
    wx.navigateTo({
      url: '../goods/goods?id='+goodsId
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function (userInfo) {
    //   //更新数据
    //   that.setData({
    //     userInfo: userInfo
    //   })
    //   that.update()
    // })

    //获取商品信息------------
    wx.request({
      url: 'http://192.168.1.118/findItems',
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      success: (result) => {
        console.log(result.data)
        that.setData({
          items: result.data
        })
      }
    })
  }
})

