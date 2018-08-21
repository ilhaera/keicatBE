const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

module.exports = {
  async get (cls, ban) {
    return await readFile(`data/timetable/${cls}/${ban}.json`)
  },
  async ver () {
    return await readFile('data/timetable/version.json')
  }
}
