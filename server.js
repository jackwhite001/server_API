const http = require('http');
// 引入mongoose
const mongoose = require('mongoose');
// 引入db
const db = require('./database/db');
// 导入入口文件app
const app = require('./apps/app');
require('dotenv').config();
// 挂载app
db(() => {
    http.createServer(app).listen(process.env.PORT, () => {
        console.log(`server already successful run on port: ${process.env.PORT}!`);
    });
});
