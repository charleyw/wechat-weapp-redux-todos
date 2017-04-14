export const fetchJson = (url, options = {}) => {
  const requestHeaders = options.header || {Accept: 'application/json'};

  if (options.auth && options.auth.authenticated && options.auth.token) {
    requestHeaders['Authorization'] = `Bearer ${options.auth.token}`;
  }

  return new Promise((resolve, reject) => {
    wx.request({
      url,
      ...options,
      header: requestHeaders,
      success: resolve,
      fail: reject
    })
  })
};

export const queryParameters = (data) => Object.keys(data)
  .map(key => [key, data[key]].map(encodeURIComponent).join('='))
  .join('&');
