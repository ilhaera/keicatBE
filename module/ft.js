const fs = require('fs')
module.exports = {
  isExist: (path) => {
    return new Promise(function(resolve,reject){
        fs.stat(path, function(err,stat) {
          if (err == null) {
            resolve(true)
          } else if (err.code == 'ENOENT') {
            resolve(false)
          } else {
            reject(err)
          }
        });
      }
    )
  },
  // isExist(path) => resolve(bool) or reject(err)
  read: (path) => {
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
  },
  // read(path) => resolve(data) or reject(err)
  write: (path,content) => {
    return new Promise(function(resolve, reject) {
      fs.writeFile(path, content, 'utf8', function(err){
        if (err==null){
          resolve()
        }
        else{
          reject(err)
        }
      })
    });
  }
  // write(path,content) => resolve() or reject(err)
}
