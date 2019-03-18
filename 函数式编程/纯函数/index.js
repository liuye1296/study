const num = 3;

function fn(x) {
    return x > num
}
//纯函数的定义是 接受参数返回参数 不依赖函数外的对象 也不影响外界的对象
console.log(fn(2)) //这个函数 不是一个纯函数  因为它依赖外界变量 

function fnn(x,y) {
    return x > y
}

console.log(fnn(2,3)) //纯函数