const fs = require('fs')
const colors = require('colors');

colors.setTheme({
  error: ['bgRed', 'white', 'bold'],
  warning: ['bgYellow', 'white', 'bold'],
  success: ['bgGreen', 'white', 'bold'],
  important: ['bgBlue', 'white', 'bold']
})
//type is 'log' 'err' 'warn' 'succ' 'imp'
const fileLog = (text, type, output) => {
  type=(type=='log')?'':type+' '
  fs.appendFile(output, type+text+'\n', (err)=> {
    if (err) debug.err(err)
  })
}
const termLog = (text, type) => {
  switch (type) {
    case 'err':
      console.log('에러'.error+' '+text)
    break;
    case 'warn':
      console.log('경고'.warning+' '+text)
    break;
    case 'succ':
      console.log('성공'.success+' '+text)
    break;
    case 'imp':
      console.log('중요'.important+' '+text)
    break;
    case 'log':
      console.log(text)
    break;
    default:
      console.log(text)
  }
}
module.exports = class {
  constructor(output=null, opt={termLog: true}) {
    this.output = output
    this.opt = opt
    const now = new Date()
    if (output) fileLog(now+' 로깅 시작', '', output)
  }
  log(text, type='log') {
    if (this.output) fileLog(text, type, this.output)
    if (this.opt.termLog) termLog(text,type)
  }
  clear() {
    console.log('\x1Bc');
  }
}
