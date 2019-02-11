// pages/index/index.js
const ctx = wx.createCanvasContext('shareCanvas')
var util=require("../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    originSrc:'https://i.loli.net/2019/01/17/5c403b7d0943e.png',
    imgInfo:"作者：leaf",
    imgTime:'2019.1.23',
    imgPath:'',
    width:'',
    height:'',
    screenWidth:0,
    screenHeight:0,
    savedImgUrl:'',
    canvasBackGround:"#F3E0AC",
    items: [
      { name: '#F8481E', value: '红色', color:'#F8481E'},
      { name: '#F3E0AC', value: '默认', checked: 'true', color:"#F3E0AC"},
      { name: '#F5F81E', value: '黄色', color:"#F5F81E" },
      { name: '#99F81E', value: '绿色', color: "#99F81E" },
      { name: '#1EF8E0', value: '浅蓝', color: "#1EF8E0" },
      { name: '#1E51F8', value: '蓝色', color: "#1E51F8" },
      { name: '#F51EF8', value: '紫色', color: "#F51EF8" },
      { name: '#FFFFFF', value: '白色', color: "#FFFFFF" }
    ]
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this=this
    // 获取屏幕宽度
    wx.getSystemInfo({
      success: function (res) {
        console.log("手机高宽")
        console.log(res)
        console.log("手机高宽")
        console.log(res.screenWidth)
        console.log(res.screenHeight)
        _this.setData({
          screenWidth: res.screenWidth,
          screenHeight:res.screenHeight
        })
      }
    })
    // 获取当前日期
    var TIME = util.formatDate(new Date());
    _this.setData({
      imgTime: TIME,
    });
    // 得到初始图片信息
    _this.getImageInfo()
  },
  // 获取图片信息方法
  getImageInfo:function(){
    let _this=this
    wx.getImageInfo({
      src: _this.data.originSrc,
      success: function (res) {
        console.log(res)
        // if (res.height>500 || res.width> _this.data.screenWidth){
        //   res.width = _this.data.screenWidth;
        //   res.height=parseInt(500*(res.width/res.height))
        // }
        _this.setData({
          imgPath: res.path,
          width: res.width,
          height: res.height
        })
        _this.drawImg()
      }
    })
  },
  // 绘制canvas
  drawImg:function(){
    let _this=this
    // 清空画布
    ctx.clearRect(0, 0, _this.data.screenWidth, 500)
    // 底图
    let w = parseInt((_this.data.screenWidth / 2) - (_this.data.width / 2))
    let h = parseInt((500/2)-( _this.data.height/2))
   
    // 绘制背景颜色
    ctx.rect(-1, -1, (_this.data.screenWidth*1+100), 555)
    ctx.setFillStyle(_this.data.canvasBackGround)
    ctx.fill()
    // 绘制图片
    ctx.drawImage(_this.data.imgPath, w, h, _this.data.width, _this.data.height)
    // 绘制作者
    ctx.setTextAlign('center')    // 文字居中
    ctx.setFillStyle('#000000')  // 文字颜色：黑色
    ctx.setFontSize(22)         // 文字字号：22px
    ctx.fillText(_this.data.imgInfo, 600 / 2, 450)
    ctx.stroke()
    // 绘制日期
    ctx.setFillStyle('#ACACAB')  // 文字颜色：灰色
    ctx.setFontSize(16)         // 文字字号：16px
    ctx.fillText(_this.data.imgTime, 600 / 2, 485)
    ctx.stroke()
    
    ctx.draw(setTimeout(function () {
      wx.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: _this.data.screenWidth,
        height:500,
        destWidth: _this.data.screenWidth,
        destHeight: 500,
        fileType:"jpg",
        canvasId: 'shareCanvas',
        success: function (res) {
          // 保存canvas图片路径
          _this.setData({
            savedImgUrl: res.tempFilePath
          })
         
        }
      })
    }, 100))

  },
  // 输入作者信息
  author: function (e) {
    let _this = this
    console.log(e.detail.value)
    _this.setData({
      imgInfo: e.detail.value
    });
    _this.drawImg()
  },
  // 选择底部图片
  changImg:function(){
    let _this=this
    console.log(333)
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(res.tempFilePaths[0])
        _this.setData({
          originSrc: res.tempFilePaths[0]
        })
        _this.getImageInfo()
      }
    })

  },
  // 保存图片到相册
  save:function(){
    let _this = this
    console.log(666)   
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
                  filePath: _this.data.savedImgUrl,
                  success(res) { 
                    console.log(res)
                    wx.showModal({
                      title: '保存图片成功',
                      content: '图片已经保存到相册，快去炫耀吧！',
                      success: function (res) {
                        if (res.confirm) {
                          console.log('用户点击确定')
                        } else if (res.cancel) {
                          console.log('用户点击取消')
                        }
                      }
                    })
                   
                  }
                  
                  })
                  
              }, 500)
             
            }
          })
        }else{
          setTimeout(function () {
            wx.saveImageToPhotosAlbum({
              filePath: _this.data.savedImgUrl,
              success(res) {
                console.log(res)
                wx.showModal({
                  title: '保存图片成功',
                  content: '图片已经保存到相册，快去炫耀吧！',
                  success: function (res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  }
                })

              }
            })
          }, 500)
        }
      }
    })
  },
  seen:function(){
    let _this=this
    wx.navigateTo({
      url: '../look/look?ingSrc=' + _this.data.savedImgUrl
    })
  },
  radioChange(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    let _this = this
    console.log(e.detail.value)
    _this.setData({
      canvasBackGround: e.detail.value
    });
    _this.drawImg()
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