"use strict";
const fs = require('fs')
const logger = require('./util/logger.js')
const cors = require('@koa/cors')

const https = require('https')
// const https = require('http')
const option = {
  ca : fs.readFileSync('/etc/letsencrypt/live/keicat.com/fullchain.pem'),
  key: fs.readFileSync('/etc/letsencrypt/live/keicat.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/keicat.com/cert.pem')
} // 인증서를 발급받고 도메인을 변경하세요
const koa_ssl = require('koa-sslify')

Date.prototype.yyyy = function () {
  return this.getFullYear()
}
Date.prototype.mm = function () {
  return this.getMonth() + 1
}
Date.prototype.dd = function () {
  return this.getDate()
}

global.debug = new logger('log.txt')
global.config = {
  schoolname: "계성고등학교"
}
debug.err = (err) => {
  debug.log(err, 'err')
}
const Koa = require('koa')

const app = new Koa()
const PORT = 3390
app.use(cors())
debug.log(PORT+' 포트 작동 중','imp')
const route = require('./route.js')(app)
const server = https.createServer(option,app.callback())
// const server = http.createServer(app.callback())
server.listen(PORT)

Date.prototype.yyyymmdd = function () {
  var mm = this.getMonth() + 1
  var dd = this.getDate()

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('');
}

const exitcall = async function () {
  server.close()
  return
}

process.on('SIGINT', function() {
    debug.log("정상 종료", "imp")
    exitcall().then(() => {
        process.exit()
    })
});