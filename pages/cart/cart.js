//cart.js
Page ({
  data: {
    hasList: true,
    // id: '',
    // num: '',
    totalCount: 0,
    totalMoney: 0,
    selectAllStatus: false,
    // uid: 0,
    carts: []
  },

  onLoad: function(params) {
    var that = this;
    // that.setData({
    //   id: params.id,
    //   num: params.num
    // })
    that.getCart()
    
  },

  //设置文本框值
  bindIptCartNum: function (e) {
    const index = e.currentTarget.dataset.index;
    var num = e.detail.value;
    let carts = this.data.carts;
    carts[index].num = num;
     
    this.setData({
      carts: carts
    });
  },
 
  /* 点击减号 */
  bindMinus: function (e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    if (num <= 1) {
      return false;
    }
    num = num - 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },
 
  /* 点击加号 */
  bindPlus: function (e) {
    const index = e.currentTarget.dataset.index;
    let carts = this.data.carts;
    let num = carts[index].num;
    num = num + 1;
    carts[index].num = num;
    this.setData({
      carts: carts
    });
    this.getTotalPrice();
  },
 
  //删除商品
  bindCartsDel(e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '您确定要删除吗？',
      success: function (res) {
        
        if (res.confirm) {
          //网络请求删除购物车数据
        }
      }
    })
  },
 
  //计算总价
  getTotalPrice() {
    let carts = this.data.carts;                  // 获取购物车列表
    let total = 0;
    let num = 0;
    for (let i = 0; i < carts.length; i++) {         // 循环列表得到每个数据
      if (carts[i].isSelect) {                   // 判断选中才会计算价格
        total += carts[i].num * carts[i].price;    // 所有价格加起来
        num += carts[i].num;
      }
    }
    this.setData({                                // 最后赋值到data中渲染到页面
      carts: carts,
      totalCount: num,
      totalMoney: total.toFixed(2)
    });
  },
 
  //绑定单选
  bindCheckbox: function (e) {
    var that = this;
    const idx = e.currentTarget.dataset.index;
    let carts = that.data.carts;
    const isSelect1 = carts[idx].isSelect;
    carts[idx].isSelect = !isSelect1;
    that.setData({
      carts: carts,
      selectAllStatus: false
    });
    that.getTotalPrice();
  },
 
 
  //绑定多选
  bindSelectAll: function (e) {
    var that = this;
    let selectedAllStatus = that.data.selectAllStatus;
    let carts = that.data.carts;
    selectedAllStatus = !selectedAllStatus;
    for (var i = 0; i < carts.length; i++) {
      carts[i].isSelect = selectedAllStatus;
    }
    that.setData({
      carts: carts,
      selectAllStatus: selectedAllStatus
    });
    that.getTotalPrice();
  },
 
  //购物车结算
  bindjiesuan: function () {
    var that = this;
    let carts = that.data.carts;
    let jscart = [];
    var j = 0
    for (var i = 0; i < carts.length; i++) {
      if (carts[i].isSelect) {
        jscart[j] = carts[i];
        j++;
      }
    }
    if (jscart.length <= 0) {
      wx.showToast({
        title: '未选择商品',
        icon: 'success',
        duration: 1000
      })
      return;
    }
    // wx.setStorageSync('jscart', jscart);//存入缓存
    // //转到结算页面
    // wx.navigateTo({
    //   url: 'jiesuan?amount=' + that.data.totalMoney
    // });
 
  },

  //加载购物车
  getCart: function () {
    var that = this;
    // var uid = that.data.uid;
    //网络请求获取购物车数据
    wx.request({
      url: 'http://192.168.1.118/findCart',
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      success: (result) => {
        that.setData({
          carts: result.data
        })
        console.log(result.data)
      }
    })
  }

})
