const klunch = require('k-lunch')

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(),
          (mm>9 ? '' : '0') + mm,
          (dd>9 ? '' : '0') + dd
         ].join('');
}

const parseDate = (date)=>{
  return {
    year : date.getFullYear(),
    month : date.getMonth()+1,
    day : getDate()
  }
}

const parseBob = (output) => {
  const ret = []
  for (var i = 0; i < output.length; i++) {
    ret.push(output[i].menu)
  }
  return ret
}

module.exports = class{
  constructor(){
      this.bob = {}
      this.form.form = {
        time: time, // Breakfast = 1, Lunch = 2, Dinner = 3
        name: '계성고등학교',
        phase: 4 // Elementary School = 2, Middle School = 3, High School = 4
      }
      this.form.options = {
        autoCode: true,
        autoDomain: true
      }
  }
  getBob = (date) => {
    return new Promise((res,rej) => {
      const newdate = parseDate(date)
      this.form.form.year = newdate.year
      this.form.form.month = newdate.month
      this.form.form.day = newdate.month
      klunch.getLunch(this.form.form, (err, output) => {
        if(err) rej(err)
        res(parseBob(output))
      }, this.form.options)
    })
  }
  callBob = (date) => {
    return new Promise((res,rej) => {
      const todayString = date.yyyymmdd()
      if (typeof this.bob[todayString] == "undefined"){
        getBob(date).then((output) => {
          this.bob[todayString] = output
          res(output)
        })
      }
      else{
        res(this.bob[todayString])
      }
    })
  }

}
