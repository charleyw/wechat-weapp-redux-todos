export const fetchJson = (url, options = {}) => {
  const requestHeaders = options.header || {Accept: 'application/json'};

  if (options.user && options.user.authenticated && options.user.token) {
    requestHeaders['Authorization'] = options.user.token;
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url,
      ...options,
      header: requestHeaders,
      success: res => resolve(res.data),
      fail: err => reject(err)
    })
  })
};

export const queryParameters = (data) => Object.keys(data)
  .map(key => [key, data[key]].map(encodeURIComponent).join('='))
  .join('&');
