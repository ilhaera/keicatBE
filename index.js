const fs = require('fs')
const logger = require('./module/logger.js')
const https = require('https')
const cors = require('@koa/cors')
const option = {
  ca : fs.readFileSync('/etc/letsencrypt/live/keicat.com/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/keicat.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/keicat.com/cert.pem')
}
const koa_ssl = require('koa-sslify')

const Koa = require('koa')
const debug = new logger()
const serve = require('koa-static')

const app = new Koa()
const PORT = 3001
app.use(cors())
const route = require('./route.js')(app,debug)
https.createServer(option,app.callback()).listen(PORT)
debug.notice(PORT+' 포트 작동 중')
