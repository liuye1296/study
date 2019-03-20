 //父类
 function SupClass() {
     this.name='Lydia'
     this.list=['1','2']
    // console.log(`${this.name}`)    
 }
 SupClass.prototype.getName=function () {
     return this.name
 } 
 
 const obj = Object.create(new SupClass())
 const obj1 = Object.create(new SupClass())
 console.log(obj.list)
 obj1.list.push('3')
 console.log(obj.list)
 function  SubClass() {
     this.year=25
 }
    /***
        每个函数都有一个属性叫做prototype
        prototype的值是一个对象
        prototype一定有个constructor的属性 他指向函数本身 

        每个对象都有一个隐藏的属性——“__proto__”  这个属性引用了  创建这个对象   的函数的prototype
        即  每个函数function都有一个prototype（原型），每个对象都有一个__proto__， （隐式原型）。
    ***/
   // supClass 的 __proto__ 指向 SupClass的prototype 
  //  supClass.__proto__ === SupClass.prototype
  //  supClass.__proto__.constructor ===  SupClass
  const supClass =  new SupClass(); 
 // console.log(supClass)
 // console.log(supClass.__proto__)
 // console.log(supClass.__proto__.constructor ===  SupClass) // 输出 true 
 //console.log(`supClass.__proto__ ===  SupClass.prototype ? ${supClass.__proto__ ===  SupClass.prototype}`)

 SubClass.prototype =  supClass  // 实现原型继承
 
 // 正常情况  子类对象.__proto__ ===  子类.prototype
 // 但是 子类.prototype = supClass 的 赋值操作  
 // 子类对象.__proto__ === supClass父类对象
 //  supClass父类对象.__proto__ ===  SupClass.prototype
 //  所以子类对象.__proto__.__proto__ === SupClass.prototype  // 这个叫原型连 
 const subClass = new SubClass() 
/* console.log(subClass.__proto__.__proto__ === SupClass.prototype) // 输出true
console.log(subClass) */
console.log(subClass.name)  
console.log(subClass.list) //父类的 引用类型都是 公用的 所以存在多个子类 改变一个  会改变所有

const subClass1 = new SubClass() 

subClass1.name='Lydia鸭'
subClass1.list.push('3') // 改变其中 一个 

console.log(subClass.getName())  // 但是基础类型不变
console.log(subClass.list) // 另一个也变了



