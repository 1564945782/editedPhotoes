// pages/look/look.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      imgSrc:'',
    historyImg: [],
    optionsImg:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    // 预览图片
    // wx.previewImage({
    //   // current: '', // 当前显示图片的http链接
    //   urls: [options.ingSrc] ,// 需要预览的图片http链接列表
    //   success:function(res){
    //     console.log(res)
    //   }
    // })

    let _this = this
    // 调出历史保存图片
    wx.uploadFile({
      url: 'http://127.0.0.1:3000/upload', // 仅为示例，非真实的接口地址
      filePath: options.ingSrc,
      name: 'file',
      success(res) {
        console.log(res)
        const data = res.data
        // do something
        console.log("上传成功")
        console.log(JSON.parse(data).r)
        let address = JSON.parse(data).data.address;
        console.log(JSON.parse(data).data.address)
        console.log(JSON.parse(address).data)
        _this.setData({
          historyImg: JSON.parse(address).data
        })
        console.log("http://www.leaf.com:3000/" + JSON.parse(data).r)
        let src = "http://www.leaf.com:3000/" + JSON.parse(data).r
        //let data1 = _this.data.historyImg
       // data1.push(src)
        //let src = "http://www.leaf.com:3000/" + JSON.parse(data).r;
        _this.setData({
          optionsImg: src
        })

      }
    })
    // 显示传过来的图片
    _this.setData({
      imgSrc: options.ingSrc
    })
    console.log(options.ingSrc)
  },
  save:function(){
    let _this=this
    // ########################
   
    // ###############################
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success(res) {
              console.log(res)
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              setTimeout(function () {
                wx.saveImageToPhotosAlbum({
                  filePath: _this.data.imgSrc,
                  success(res) {
                    // #################
                    wx.request({
                      url: 'http://127.0.0.1:3000/imgSrc', // 仅为示例，并非真实的接口地址
                      data: {
                        x: _this.data.imgSrc,
                        y: ''
                      },
                      header: {
                        'content-type': 'application/json' // 默认值
                      },
                      success(res) {
                        console.log(res.data)
                        // setTimeout(function () {
                        //   wx.reLaunch({
                        //     url: '../index/index'
                        //   })
                        // }, 5000)
                      }
                    })
                    // ############
                  
                    //console.log(res)
                    
                  }
                })
              }, 500)
            }
          })
        } else {
          setTimeout(function () {
            wx.saveImageToPhotosAlbum({
              filePath: _this.data.imgSrc,
              success(res) { 
                console.log(res)
                // ######################
                wx.request({
                  url: 'http://127.0.0.1:3000/imgSrc', // 仅为示例，并非真实的接口地址
                  data: {
                    x: JSON.stringify(_this.data.optionsImg),
                    y: ''
                  },
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  success(res) {
                    console.log(res.data)
                    setTimeout(function () {
                      wx.reLaunch({
                        url: '../index/index'
                      })
                    }, 1000)
                  }
                })
                // #########################
              }
            })
          }, 500)
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})