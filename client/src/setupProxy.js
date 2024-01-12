const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: process.env.NODE_ENV === 'development' ? process.env.REACT_APP_LOCALHOST_URI : "http://converter.web-hands.ru",
            changeOrigin: true,
            secure: false
        })
    );
    app.use(
        '/uploads',
        createProxyMiddleware({
            target: process.env.NODE_ENV === 'development' ? process.env.REACT_APP_LOCALHOST_URI : "http://converter.web-hands.ru",
            changeOrigin: true,
            secure: false
        })
    );
};