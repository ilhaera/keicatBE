const fs = require('fs')

function promfun(x){
  return new Promise((res) => {
    setTimeout(() => {
      res(x)
    }, 2000)
  })
}

async function asyncfun(x){
  return new Promise((res) => {
    setTimeout(() => {
      res(x)
    }, 2000)
  })
}

const read = async (path) => {
  return new Promise(function(resolve, reject) {
    fs.readFile(path, 'utf8', function(err, data) {
      if (err==null){
        resolve(data)
      }
      else{
        reject(err)
      }
    })
  });
}

(async ()=>{
  console.log(await read('data/main.json'))
})()
