const parser = (input) => {
  input = input.split('\n')
  input = input.slice(1,-1)
  input.splice(20,0,"")
  const ret = []
  const yoil = ["MON","TUE","WED","THR","FRI"]
  count=0
  ret.push(["","1","2","3","4","5","6","7"])
  while(count<5){
    const day = [yoil[count]].concat(input.slice(0,7))
    input = input.slice(7)
    ret.push(day)
    count+=1
  }
  return ret
}

const swaper = (input) => {
  const ret = []
    for (let i = 0; i <= 7; i++) {
      const miniret = []
      for (let j = 0; j <= 5; j++) {
        miniret.push(input[j][i])
      }
      ret.push(miniret)
    }
  return ret
}

const call = (data) => {
  console.log(JSON.stringify(swaper(parser(data))))
}
