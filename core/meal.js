const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const klunch = require('k-lunch')

const callbob = function (date, time) {
  return new Promise(resolve => {
    klunch.getLunch(
      {
        year: date.yyyy(),
        month: date.mm(),
        day: date.dd(),
        time: time,
        name: config.schoolname,
        phase: 4
      },
      (err, output) => {
        if(err) {debug.log(err, 'err'); resolve(err)}
        resolve(output)
      },
      {
        autoCode: true,
        autoDomain: true
      }
    )
  })
}

const getbob = async function (date, time) {
  let bob = await callbob(date, time)
  const ret = []
  if (typeof bob == "string"){
   bob = []
  }
  for (let i = 0; i < bob.length; i++) {
    ret.push(bob[i].menu)
  }
  return ret
}

module.exports = {
  bob: [],
  lastday: undefined,
  check () {
    const today = (new Date()).yyyymmdd()
    return (this.lastday==today)?true:false
  },
  async load () {
    debug.log('급식 로드', 'imp')
    const today = (new Date())
    const todaystr = today.yyyymmdd()
    const nextday = new Date()
    nextday.setTime(today.getTime()+(24*60*60*1000))
    const nextdaystr = nextday.yyyymmdd()
    this.lastday = todaystr
    this.bob[todaystr] = await Promise.all([getbob(today, 1), getbob(today, 2), getbob(today, 3)])
    this.bob[nextdaystr] = await Promise.all([getbob(nextday, 1), getbob(nextday, 2), getbob(nextday, 3)])
  },
  todaybob () {
    const today = (new Date()).yyyymmdd()
    return this.bob[today]
  },
  nextdaybob () {
    const nextday = new Date()
    nextday.setTime(nextday.getTime()+(24*60*60*1000))
    return this.bob[nextday.yyyymmdd()]
  }
}
