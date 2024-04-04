const express = require('express');
const cors = require('cors');
const app = express();
// use middleware to from our current for incoming json
app.use(express.json());
// use middleware for url encoding
app.use(express.urlencoded({ extended: true }));
// use middleware to handle cors
app.use(cors());
/* // 或 替换
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-headers',
        'Content-Type,Accept,Authorization,Origin,X-Requested-Width'
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Content-Allow-Methods', 'POST,PUT,PATCH,DELETE,GET');
    }
    next();
}); */
app.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Server is up',
    });
});
// 注册API接口
// const xxxAPI = require('./router/xxxAPI');
// app.use('/api',xxxAPI)
// 处理404页面
// bad url or error wo can handle
// with Middleware
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
// 获取next传来的的error
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message,
            status: error.status,
        },
    });
});
module.exports = app;
