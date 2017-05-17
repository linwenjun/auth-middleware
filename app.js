const express = require('express');
const config = require('config');
const router = require('./router');

const app = express();

// 赋权中间件
app.use(require('./middleware/authorization'));
// 鉴权中间件
app.use(require('./middleware/authentication'));


app.get('/', (req, res)=> {
  res.send('hello');
});

router.buildRouter(app);


process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
app.listen(config.get('http_port'), ()=> {
  console.log("Server started at port " + config.get('http_port'));
});