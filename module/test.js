class testClass{
  constructor(var1){
    this.var1 = var1
    this.method1()
  }
  method1(){
    console.log(this.var1)
  }
  get var1double(){
    return this.var1*2
  }
}
const test = new testClass(10)
console.log(test.var1double)
