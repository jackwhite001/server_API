const express = require('express');
const cors = require('cors');
// 导入aip接口
const userRouterAPI = require('../router/userRouter');
const bookRouterAPI = require('../router/bookRouter');
const authorRouterAPI = require('../router/authorRouter');
// 导入swagger
const swaggerUi = require('swagger-ui-express');
const document = require('../config/swaggerOptions');

const app = express();
// use middleware to from our current for incoming json
app.use(express.json());
// use middleware for url encoding
app.use(express.urlencoded({ extended: true }));
// use middleware to handle cors
app.use(cors());
// 挂载API接口
app.use('/user', userRouterAPI);
app.use('/book', bookRouterAPI);
app.use('/author', authorRouterAPI);

// use middleware for api-docs swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(document));
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
