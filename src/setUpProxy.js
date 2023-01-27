const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = (app) => {
  app.use(
    createProxyMiddleware(
      ['/v1', '/v2'],
      {
        target: 'http://localhost:8080',
        changeOrigin: true,
        router: {
          '/v2': 'http://localhost:3000'
        },
        pathRewrite: {
          '^/v2': ''
        }
      }
    )

  //   createProxyMiddleware(
  //     '/club',
  //     {
  //       target: 'http://localhost:8080/',
  //       changeOrigin: true,
  //     }
  //   )
  // )
  // app.use(
  //   createProxyMiddleware(
  //     '/member',
  //     {
  //       target: 'http://localhost:8080/',
  //       changeOrigin: true,
  //     }
  //   )
  );
}