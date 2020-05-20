//test.js
Page({
  data: {
    list: '',
    addhidden: false,
    datahidden: 'true',
    id: '',
    name: '',
    sex: '',
    age: '',
    url: '',
    checked: ''
  },

  inputname: function(v){
    console.log('name:'+v.detail.value)
    this.setData({
      name: v.detail.value
    })
  },
  inputsex: function(v){
    console.log('sex:'+v.detail.value)
    this.setData({
      sex: v.detail.value
    })
  },
  inputage: function(v){
    console.log('age:'+v.detail.value)
    this.setData({
      age: v.detail.value
    })
  },

  check: function(e){
    console.log('id='+e.detail.value)
    this.setData({
      id: parseInt(e.detail.value)
    })
  },

  btnback: function(){
    var that = this;
    this.setData({
      addhidden: false
    })
  },
  btnok: function(){
    var that = this;
    var id = this.data.id;
    var name = this.data.name;
    var sex = this.data.sex;
    var age = this.data.age;
    var url = this.data.url;
    console.log('id:'+id+',name:'+name+',sex:'+sex+',age:'+age);
    if(name==''||sex==''||age==''){
      wx.showToast({
        title: '请将数据填写完整',
        duration: 2000,
        icon: 'none'
      });
    }else{
      wx.request({
        url: url,
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        data: {
          id: id,
          name: name,
          sex: sex,
          age: age
        },
        success: (result) => {
          console.log('done!'+result.data)
          wx.showToast({
            title: '操作成功',
            duration: 1000,
            icon: 'success',
          });
          this.setData({
            addhidden: false,
            checked: false,
            id: ''
          });
          this.find();
        }
      })
    }
  },

  //-----------------------------

  find: function(){
    var that = this;
    wx.request({
      url: 'http://192.168.1.118/mpFindUser',
      method: "GET",
      header: {
        'content-type': 'application/json'
      },
      success: (result) => {
        console.log(result)
        that.setData({
          list: result.data,
          datahidden: false
        })
      }
    })
  },

  del: function(){
    var that = this;
    var id = this.data.id
    console.log(id)
    if (id=='') {
      wx.showModal({
        title: '提示',
        content: '请先选择一条要更新的数据',
        success: function (res) {
          if(res.confirm){
            that.find();
          }else if(res.cancel){
          }
        }
      })
    }else{
      wx.request({
        url: 'http://192.168.1.118/mpDeleteUser',
        method: "GET",
        data: {
          id: id
        },
        header: {
          'content-type': 'application/json'
        },
        // fail: (res) => {
        //   console.log(res.data)
        //   wx.showToast({
        //     title: '删除失败',
        //     duration: 1000,
        //     icon: 'none',
        //   });
        // },
        success: (result) => {
          console.log('done!'+result.data)
          if (result.data != 'delete ok') {
            wx.showToast({
              title: '删除失败',
              duration: 1000,
              icon: 'none',
            });
            that.find();
          } else {
            wx.showToast({
              title: '删除成功',
              duration: 1000,
              icon: 'success',
            });
            that.find();
          }  
          that.setData({
            id: ''
          })      
        },
      })
    }
  },

  add: function(){
    var that = this;
    this.setData({
      id: '',
      name: '',
      sex: '',
      age: '',
      addhidden: true,
      checked: false,
      url: 'http://192.168.1.118/mpInsertUser'
    })
    //that.find();
  },

  update: function(){
    var that = this;
    var id = this.data.id;
    var url = 'http://192.168.1.118/mpUpdateUser'
    if (id=='') {
      wx.showModal({
        title: '提示',
        content: '请先选择一条要更新的数据',
        success: function (res) {
          if(res.confirm){
            that.find();
          }else if(res.cancel){
          }
        }
      })
    }else{
      wx.request({
        url: 'http://192.168.1.118/mpFindUserById',
        method: 'GET',
        header: {
          'content-type': 'application/json'
        },
        data: {
          id: id,
        },
      // fail: (res) => {
      //   wx.showToast({
      //     title: '请先选择一条要更新的数据！',
      //     icon: 'none',
      //     duration: 3000
      //   })
      // },
        success: (result) => {
          console.log(result.data)
          // wx.showToast({
          //   title: '请先选择一条要更新的数据！',
          //   duration: 2000,
          //   icon: "none"
          // });
        
            that.setData({
              addhidden: true,
              id: id,
              name: result.data.name,
              sex: result.data.sex,
              age: result.data.age,
              url: url
            }) 
        } 
      })
    }
  }
})