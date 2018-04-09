const client = require('cheerio-httpcli')
const request = require('request')
const ft = require('../module/ft.js')
const klunch = require('k-lunch')

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('');
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
      menu = menu.replace(/[ㆍ0-9\. \t\r\/]/g,'').trim().split('\n')
      ret[time] = menu
    })
    callback(ret)
  })
}
const makeform = (today,time) => {
  return {
    year: today.getFullYear(),
    month: today.getMonth()+1,
    day: today.getDate(),
    time: time, // Breakfast = 1, Lunch = 2, Dinner = 3
    name: '계성고등학교',
    phase: 4 // Elementary School = 2, Middle School = 3, High School = 4
  }
}
const parseBob = (output) => {
  const ret = []
  for(let i=0;i<output.length;i+=1){
    ret.push(output[i].menu)
  }
  return ret
}
const getBob2 = (callback) => {
  const ret = {}
  const today = new Date()
  ret.today = today.yyyymmdd()
  const options = {
    autoCode: true,
    autoDomain: true
  }
  klunch.getLunch(makeform(today,1), (err, output) => {
    if(err) ret.조식 = []
    else ret.조식 = parseBob(output)
    klunch.getLunch(makeform(today,2), (err, output) => {
      if(err) ret.중식 = []
      else ret.중식 = parseBob(output)
      klunch.getLunch(makeform(today,3), (err, output) => {
        if(err) ret.석식 = []
        else ret.석식 = parseBob(output)
        callback(ret)
      }, options)
    }, options)
  }, options)

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
