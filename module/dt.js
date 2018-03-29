const ft = require('./ft.js')

module.exports = class {
  async constructor(path){
    this.data = await ft.read
  }
}

test = new module.exports('data/main.js')
