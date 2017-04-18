const preDefinedError = {
  404: '请求地址不存在',
  500: '服务器发生错误',
  401: '用户未认证'
};

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
      success: function ({data, statusCode}) {
        if (statusCode < 200 || statusCode >= 300) {
          reject(new Error((data && data.message) || preDefinedError[statusCode] || '请求失败'));
        }
        resolve({data, statusCode});
      },
      fail: reject
    })
  })
};

export const queryParameters = (data) => Object.keys(data)
  .map(key => [key, data[key]].map(encodeURIComponent).join('='))
  .join('&');
