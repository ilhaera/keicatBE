const fs = require('fs')
const http = require('http')
const https = require('https')
const cors = require('@koa/cors')
const option = {
  ca : fs.readFileSync('/etc/letsencrypt/live/newline.kr/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/newline.kr/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/newline.kr/cert.pem')
}
const koa_ssl = require('koa-sslify')

const Koa = require('koa')
const logger = require('./module/logger.js')
const debug = new logger()
const serve = require('koa-static')

const app = new Koa()
const PORT = 3000
const sslPORT = 3001
app.use(cors())
const route = require('./route.js')(app,debug)
http.createServer(app.callback()).listen(PORT)
https.createServer(option,app.callback()).listen(sslPORT)
debug.notice(PORT+' 포트 작동 중')
debug.notice(sslPORT+' 포트 작동 중 (ssl)')
