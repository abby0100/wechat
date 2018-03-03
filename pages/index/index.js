//index.js
//获取应用实例
const app = getApp()

Page({

  data: {
    longitude: '志向',   //经度  
    latitude: '梦想',    //纬度  
    address: '人生定位',     //地址  
    cityInfo: {},     //城市信息 
    motto: '熊熊助手1号',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
    // Added by xy
  getLocationFunc: function () {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        // latitude = res.latitude // 经度
        // longitude = res.longitude // 纬度
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
      }
    })
    this.setData({ locationButtonMsg: "获取成功," + "时间:" })
  },
})
