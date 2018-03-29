const Router = require('koa-router')
const ftSync = require("../module/ftSync.js")
const config = JSON.parse(ftSync.read("config.json"))

router = new Router()
module.exports = (app, debug) => {
  router.get('/', (ctx, next) => {
    ctx.redirect('http://github.com/ilhaera')
  })
  router.get('/page/:page', (ctx, next) => {
    const page = ctx.params.page
    switch (page) {
      case 'all':
        const obj = {}
        for (let key in config.index) {
          obj[config.index[key]] = JSON.parse(ftSync.read("data/" + config.index[key] + ".json"))
        }
        ctx.body = JSON.stringify(obj)
        break;
      default:
        ctx.body = ftSync.read("data/" + page + ".json")
        break;
    }
  })
  router.get('/schedule/:ban', (ctx, next) => {
    const ban = ctx.params.ban
    switch (ban) {
      case 'all':
        const obj = []
        for (let i = 1; i <= config.class.age; i++) {
          const objinobj = []
          for (let j = 1; j <= config.class.ban; j++) {
            objinobj.push(JSON.parse(ftSync.read("data/schedule/" + i + "/" + j + ".json")))
          }
          obj.push(objinobj)
        }
        ctx.body = JSON.stringify(obj)
        break;
      default:
        const age = ban.slice(0, 1)
        ban = ban.slice(1)
        ctx.body = ftSync.read("data/schedule/" + age + "/" + ban + ".json")
        break;
    }
  })
  app.on('error', (err) => {
    debug.error(err)
  })
  app.use(router.routes())
  app.use(router.allowedMethods())
}
