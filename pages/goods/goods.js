//goods.js
// Page({
//   data: {
//     goods_id: ''
//   },
//   onLoad: function (params) {
//     this.setData({
//       goods_id: params.id
//     })
//     console.log(params.id)
//   }
// })
Page({
  data: {
    id: '',
    name: '',
    title: '',
    price: '',
    img: '',
    isLike: true,
    imgurl: '',
     // input默认是1  
     num: 1,  
     // 使用data数据对象设置样式名  
     minusStatus: 'disabled',

    // banner
    imgUrls: [],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s

    // 商品详情介绍
    detailImg: ["img"]
  },

  /* 点击减号 */  
  bindMinus: function() {  
    var num = this.data.num;  
    // 如果大于1时，才可以减  
    if (num > 1) {  
        num --;  
    }  
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';  
    // 将数值与状态写回  
    this.setData({  
        num: num,  
        minusStatus: minusStatus  
    });  
},  
  /* 点击加号 */  
  bindPlus: function() {  
    var num = this.data.num;  
    // 不作过多考虑自增1  
    num ++;  
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';  
    // 将数值与状态写回  
    this.setData({  
        num: num,  
        minusStatus: minusStatus  
    });  
  },  
  /* 输入框事件 */  
  bindManual: function(e) {  
      var num = e.detail.value;  
      // 将数值与状态写回  
      this.setData({  
          num: num  
      });  
  },

  
  //预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src;

    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgUrls // 需要预览的图片http链接列表  
    })
  },
  // // 收藏
  // addLike() {
  //   this.setData({
  //     isLike: !this.data.isLike
  //   });
  // },
  // 跳到购物车
  toCar: function(e) {
    var that = this;
    var goodsId = that.data.id
    var goodsNum = that.data.num
    console.log('goodsId='+goodsId+',goodsNum='+goodsNum)
    wx.reLaunch({
      url: '../cart/cart?id='+goodsId+'&num='+goodsNum
    })
    // wx.switchTab({
    //   url: '/pages/cart/cart'
    // })
  },
  // 立即购买
  immeBuy() {
    wx.showToast({
      title: '购买成功',
      icon: 'success',
      duration: 2000
    });
  },

  addCar: function () {
    
  },

  onLoad: function (params) {
    var that = this;
    that.setData({
      id: params.id
    })
    console.log(params.id)

    wx.request({
      url: 'http://192.168.1.118/findItemById',
      method: "GET",
      data: {
        id: params.id
      },
      header: {
        'content-type': 'application/json'
      },
      success: (result) => {
        console.log(result.data)
        that.setData({
          name: result.data.name,
          title: result.data.title,
          price: result.data.price,
          img: result.data.img,
          imgurl: result.data.info,
          imgUrls: result.data.swiper.split(",")
        })
      },
    })
  
  }

})