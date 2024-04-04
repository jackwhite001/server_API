const http = require('http');
// 导入入口文件app
const app = require('./apps/app');
require('dotenv').config();
// 挂载app
http.createServer(app).listen(process.env.PORT, () => {
    console.log(`server already successful run on port: ${process.env.PORT}!`);
});
