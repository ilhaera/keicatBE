const colors = require('colors')
clog = console.log
module.exports = class {
  constructor() {
    this.status = ""
    this.doingArray = []
  }
  notice(text){
    clog(('[ '+text+' ]').white.bgBlue+'\n')
  }
  set(status){
    clog(' '+'STAT'.white.bgBlue+' '+status+'\n')
    this.status = status
  }
  log(text){
    clog(' '+'LOG '.white.bgBlack+' '+text)
  }
  doing(text){
    clog(' '+'DO  '.white.bgBlack+' '+text+'...')
    this.doingArray.push(text)
  }
  success(text){
    if (typeof text == 'undefined'){
      text = this.doingArray.pop()
      clog(' '+'SUCC'.white.bgGreen+' '+text+' 완료')
    }
    else {
      clog(' '+'SUCC'.white.bgGreen+' '+text+' 완료')
    }
  }
  error(text){
    clog(' '+'ERR '.white.bgRed+' '+text)
  }
  throwError(tesxt){
    if (typeof text == 'undefined'){
      text = this.doingArray[this.doingArray.length-1]
      clog(' '+'ERR '.white.bgRed+' '+text+' 완료')
    }
    else {
      clog(' '+'ERR '.white.bgRed+' '+text+' 완료')
    }
  }
  warning(text){
    clog(' '+'WARN'.white.bgYellow+' '+text)
  }
}
