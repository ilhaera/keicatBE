const fs = require('fs')
module.exports = {
  read: (path) => {
    return fs.readFileSync(path, 'utf8')
  },
  // read(path)
  write: (path,content) => {
    fs.writeFileSync(path,content,'utf8')
  }
}
