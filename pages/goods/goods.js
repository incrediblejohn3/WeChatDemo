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
    imgurl: "https://img11.360buyimg.com/cms/jfs/t1/43665/32/14756/2824061/5d77f8b8E3e335a82/af0a3a0ac16b6bb2.png",
    imageWidth:0,
    imageHeight:0 ,

    // banner
    imgUrls: [
      "http://static.home.mi.com/app/shop/img?id=shop_904608692a4d8415d0de39a0a5897e80.jpeg&w=1080&h=600&crop=a_0_120_1080_480&t=webp&z=1.15&q=78",
      "http://static.home.mi.com/app/shop/img?id=shop_0f5e43035a8b8d27a4b6f315d222fd9b.jpeg&w=1080&h=600&crop=a_0_120_1080_480&t=webp&z=1.15&q=78",
      "http://static.home.mi.com/app/shop/img?id=shop_4ba3d814639ab27570f174467133619f.png&w=1080&h=600&crop=a_0_120_1080_480&t=webp&z=1.15&q=78",
      "http://static.home.mi.com/app/shop/img?id=shop_91f29509f14ea243958285aaf5d5b640.jpeg&w=1080&h=600&crop=a_0_120_1080_480&t=webp&z=1.15&q=78",
      "http://static.home.mi.com/app/shop/img?id=shop_5c752db8097555831469356f5f389078.jpeg&w=1080&h=600&crop=a_0_120_1080_480&t=webp&z=1.15&q=78"
    ],
    indicatorDots: true, //是否显示面板指示点
    autoplay: true, //是否自动切换
    interval: 3000, //自动切换时间间隔,3s
    duration: 1000, //  滑动动画时长1s

    // 商品详情介绍
    detailImg: ["img"],
  },
  //预览图片
  previewImage: function (e) {
    var current = e.target.dataset.src;

    wx.previewImage({
      current: current, // 当前显示图片的http链接  
      urls: this.data.imgUrls // 需要预览的图片http链接列表  
    })
  },
  // 收藏
  addLike() {
    this.setData({
      isLike: !this.data.isLike
    });
  },
  // 跳到购物车
  toCar() {
    wx.switchTab({
      url: '/pages/cart/cart'
    })
  },
  // 立即购买
  immeBuy() {
    wx.showToast({
      title: '购买成功',
      icon: 'success',
      duration: 2000
    });
  },

  onLoad: function (params) {
    this.setData({
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
        console.log(result)
        this.setData({
          name: result.data.name,
          title: result.data.title,
          price: result.data.price,
          img: result.data.img
        })
      }
    })
    imgload: function(e){
      console.log("图片加载完成="+e.detail);
      //用来计算高宽
      this.setData(wxAutoImageCal(e));
   }
  
  }

})