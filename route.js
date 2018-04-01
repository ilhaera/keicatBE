const Router = require('koa-router')
const ftSync = require("./module/ftSync.js")
const global = JSON.parse(ftSync.read("data/global.json"))
const Meal = require('./engine/meal.js')
const meal = new Meal()
meal.update()

router = new Router()
module.exports = (app, debug) => {
  router.get('/', (ctx, next) => {
    ctx.redirect('http://github.com/ilhaera')
  })
  router.get('/notice', (ctx, next) => {
    ctx.body = ftSync.read('data/notice.json')
  })
  router.get('/notice/:index', (ctx, next) => {
    const index = ctx.params.index
    ctx.body = ftSync.read('data/notice/'+index+'.html')
  })
  router.get('/calendar', (ctx, next) => {
    ctx.body = ftSync.read('data/calendar.json')
  })
  router.get('/meal', async (ctx, next) => {
    ctx.body = await meal.callBob()
  })
  router.get('/schedule/:ban', (ctx, next) => {
    let ban = ctx.params.ban
    switch (ban) {
      case 'all':
        const obj = []
        for (let i = 1; i <= global.class.age; i++) {
          const objinobj = []
          for (let j = 1; j <= global.class.ban; j++) {
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
