const Router = require('koa-router')
const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const timetable = require('./core/timetable.js')
const view = require('./core/view.js')
const meal = require('./core/meal.js')
const card = require('./core/card.js')

router = new Router()
const initialMeal = async function () { await meal.load() }
initialMeal()
module.exports = (app) => {
  router.get('/view', async (ctx, next) => {
    ctx.body = await view.view()
    debug.log(`${ctx.body}회 조회`)
  })

  router.get('/timetable', async (ctx, next) => {
    const arr = []
    for (let i = 1; i <= 3; i++) {
      const innerArr = []
      for (let j = 1; j <= 10; j++) {
        innerArr.push(JSON.parse(await timetable.get(i,j)))
      }
      arr.push(innerArr)
    }
    ctx.body = JSON.stringify(arr)
  })

  router.get('/card', async (ctx, next) => {
    await card.make()
    ctx.body = card.data
  })

  router.get('/make', async (ctx, next) => {
    await card.make()
  })

  router.get('/meal', async (ctx, next) => {
    if (meal.check() == false) {
      await meal.load()
    }
    ctx.body = meal.todaybob()
  })

  app.on('error', (err) => {
    debug.err(err)
    throw err
  })
  app.use(router.routes())
  app.use(router.allowedMethods())
}
