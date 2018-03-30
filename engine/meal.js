const client = require('cheerio-httpcli')
const request = require('request')
const ft = require('../module/ft.js')

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('');
}
const saveBob = (data,callback) => {
  ft.read('data/')
}
const getBob = (callback) => {
  const url = 'http://www.keisung.hs.kr/user/carte/list.do'
  const param = {}
  const ret = {}
  const today = new Date()
  ret.today = today.yyyymmdd()
  client.fetch(url, param, function(err, $, res){
    if(err) {console.log(err); return;}
    $('.meals_today_list li').each(function(idx){
      let time
      let menu
      $(this).find('img').each(function(idx){
        time = $(this).attr('alt')
      })
      menu = $(this).text()
      menu = menu.replace(/[ㆍ0-9\. \t\r]/g,'').trim().split('\n')
      ret[time] = menu
    })
    callback(ret)
  })
}
module.exports = class{
  constructor(){
      this.bob = {}
  }
  callBob(){
    return new Promise((res,rej) => {
      const date = new Date()
      console.log('급식 요청 '+date.yyyymmdd())
      const todayString = date.yyyymmdd()
      if (typeof this.bob[todayString] == "undefined"){
        this.update().then((result) => {
          res(result)
        })
      }
      else{
        res(this.bob[todayString])
      }
    })
  }
  update(){
    return new Promise((res,rej) => {
      const date = new Date()
      const todayString = date.yyyymmdd()
      console.log('급식 정보를 불러옵니다.')
      getBob((output) => {
        this.bob[todayString] = output
        console.log('성공!')
        console.log(output)
        res(output)
      })
    })
  }
}
