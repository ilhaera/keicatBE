const ft = require('../module/ft.js')
const ftSync = require('../module/ftSync.js')

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
    this.view = JSON.parse(ftSync.read('data/view.json'))
    this.today = (new Date()).yyyymmdd()
    this.update()
  }
  update(){
    this.today = (new Date()).yyyymmdd()
    const today = this.today
    if (typeof this.view[today] == 'undefined'){
      this.view[today] = 0
    }
  }
  save(){
    ft.write('data/view.json',JSON.stringify(this.view))
  }
  viewer(){
    const today = this.today
    this.update()
    this.view[today] += 1
    this.save()
    return this.view[today]
  }
}
