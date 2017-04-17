const base = {
  apiBaseUrl: 'https://redux-todos.leanapp.cn',
};

let appConfig = base;

if(process.env.NODE_ENV == 'development') {
  appConfig = {apiBaseUrl: "http://localhost:3000"};
}
export default appConfig;