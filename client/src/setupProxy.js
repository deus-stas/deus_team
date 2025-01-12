const {createProxyMiddleware} = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: process.env.NODE_ENV === 'development' ? process.env.REACT_APP_LOCALHOST_URI : "http://v2.deus.team",
            changeOrigin: true,
            secure: false,
            timeout:10000
        })
    );
    app.use(
        '/uploads',
        createProxyMiddleware({
            target: process.env.NODE_ENV === 'development' ? process.env.REACT_APP_LOCALHOST_URI : "http://v2.deus.team",
            changeOrigin: true,
            secure: false,
            timeout:10000
        })
    );
};