function SupClass(id) {
    this.id=id;
    this.names=['1','2']
}

SupClass.prototype.showName=function (){
    console.log(this.names)
}

function SubClass(id) {
    SupClass.call(this,id)
}

const sub1= new SubClass('1_1')
const sub2= new SubClass('2_2')

/* console.log(sub1.names)
sub2.names.push('3')
console.log(sub1.names)



// 这种方式也 实现了继承  但是呢 没有涉及到  prototype  所以 子类不能继承 父类的原型属性和函数  
//  sub1.showName 会报错
 try {
    console.log(sub1.showName())
 } catch (error) {
    console.warn(error) 
 }

 console.log(sub2.names) */



 // 组合模式

 SubClass.prototype = new SupClass('9_9')

 const sub3= new SubClass('1_3')

 const sub4= new SubClass('1_4')

 sub3.showName() 
 sub4.showName()
 sub3.names=['e','w']

 sub4.showName()
sub3.showName()