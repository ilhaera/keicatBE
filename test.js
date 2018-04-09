const ft = require('./module/ft.js')
const ftSync = require('./module/ftSync.js')

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('');
}

module.exports = class{
  constructor(){
    this.data = JSON.parse(ftSync.read('data/view.json'))
    this.update()
  }
  update(){
    const data = this.data
    const today = (new Date()).yyyymmdd()
    if (data.date != today){
      data.date = today
      data.view = 0
    }
  }
  save(){
    ft.write('data/view.json',JSON.stringify(this.data))
  }
  view(){
    this.update()
    this.data.view += 1
    this.save()
    return this.data.view
  }
}

test = new module.exports()
console.log(test.view())
console.log(test.view())
