const ft = require('./module/ft.js')

module.exports = class {
  constructor(path){
    this.path = path
  }
  async load(){
    return await ft.read(this.path)
  }
}

test = new module.exports('data/main.json')
test.load().then((v) => {
  console.log(v)
})
