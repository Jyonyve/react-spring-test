const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
app.use(
'/club',
    createProxyMiddleware({

            target: 'http://localhost:8080',
            changeOrigin: true,
            ws: true,
            

        })

    )

};