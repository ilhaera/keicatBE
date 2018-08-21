const fs = require('fs')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

Date.prototype.yyyymmdd = function () {
  const mm = this.getMonth() + 1
  const dd = this.getDate()

  return [
          this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('');
}

module.exports = {
  async view () {
    const allView = JSON.parse(await readFile('data/global/view.json'))
    const today = (new Date()).yyyymmdd()
    todayView = allView[today]?allView[today]:0
    todayView += 1
    allView[today] = todayView
    await writeFile('data/global/view.json', JSON.stringify(allView), 'utf-8')
    return todayView
  }
}
