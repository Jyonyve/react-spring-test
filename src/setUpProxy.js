const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
  app.use(
    createProxyMiddleware(
      ['/club', '/member'],
      {
        target: 'http://localhost:8080',
        changeOrigin: true,
        ws :true,
        router: {
          '/club': 'http://localhost:8080/club',
          '/member': 'http://localhost:8080/member'
        },
        // pathRewrite: {
        //   '^/v2': ''
        // }
      }
    )
  );
}