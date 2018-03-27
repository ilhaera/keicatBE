const route = require('koa-route')
const ftSync = require("../module/ftSync.js")
const config = JSON.parse(ftSync.read("config.json"))

module.exports = (app,debug) => {
  app.use(route.get('/', (ctx) => {
    ctx.redirect('http://github.com/ilhaera')
  }))

  app.use(route.get('/data/:page', (ctx,page) => {
    switch(page){
      case 'all':
        const obj = {}
        for( let key in config.index ) {
          obj[config.index[key]] = JSON.parse(ftSync.read("data/"+config.index[key]+".json"))
        }
        ctx.body = JSON.stringify(obj)
      break;
      default:
        ctx.body = ftSync.read("data/"+page+".json")
      break;
    }
  }))

  app.on('error',(err) => {
    debug.error(err)
  })
}
