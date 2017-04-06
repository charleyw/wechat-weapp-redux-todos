const WeAppStorage = {
  setItem: function (key, value, callback) {
    wx.setStorage({key, data: value, fail: callback})
  },
  getItem: function (key, callback) {
    wx.getStorage({key, success: (res) => callback && callback(undefined, res.data), fail: callback})
  },
  removeItem: function (key, callback) {
    wx.removeStorage({key, fail: callback})
  },
  getAllKeys: function (callback) {
    wx.getStorageInfo({success: res => callback && callback(undefined, res.keys), fail: callback})
  }
};

export default WeAppStorage