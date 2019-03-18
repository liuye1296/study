

function add(a, b, c, d) {//把这个函数curry化
    return a + b + c + d
}


// 函数curry化  分两个步骤
// 需要一个掺入固定参数的函数

function fixedParams(fn) {
    //slice 从已有的数组中返回新的数组  [1,2,3].slice(1) === [2,3] 
    //console.log(Object.prototype.toString.call(arguments))
    const _arg = [].slice.call(arguments, 1);//第一个参数是 函数 我们需要后面的参数 在这里就是 1 2
    return function () {
        const params = _arg.concat([].slice.call(arguments, 0))
        return fn.apply(this, params)
    }
}
// 这个函数 怎么用 有什么用？

/***
 * 给 fixedParams 传入了一个函数add 还传入了2个参数  但是呢 add 是需要4个参数的 
 * 那么我们执行 newAdd 在需要2个参数 才能真正执行 add函数
*/
//const newAdd = fixedParams(add, 1, 2);

//const a = newAdd(3, 4);

//console.log(a)
/***
 * fixedParams 函数的意思是  接收的第一个参数 是需要执行函数(add)  其他的参数不固定  
 * 返回一个函数（newAdd）   newAdd.length === add.length - (fixedParams.length -1)
 * 就是说 newAdd的参数个数必须 加上之前传给 fixedParams参数 总和 必需满足 add的参数要求
 */

// 真正curry函数  接收一个需要固定参数的函数  第二参数是需要参数个数 返回一个 期望你把满足参数的函数
function curry(fn, length = fn.length) {
    return function () {
        //执行函数（newAdd_）的参数个数已经满足了 （fn==add）的参数个数 那么就执行
        if (length === arguments.length) {// a1_
            return fn.apply(this, arguments)
        } else {//没有满足 a2_
            /* 这里 a2_ 传入了一个 1  那么假如我返回fixedParams 那么就是 a2_ 必需传入 4-1=3个参数
             其实执行到这里 a2_ 其实已经是一个add了  但是他是一个需要3个参数的add 
            那么我们在把  fixedParams([fn].concat(arguments))  再次curry  每次都减少需要的参数 一直到 满足为止 */
            //arguments 是对象型数组 但不是真数组  需要转换的呀
            const _list = [fn].concat([].slice.call(arguments, 0))
            return curry(fixedParams.apply(this, _list), length - arguments.length)
        }
    }
}

// const newAdd_ = curry(add);
// const a1_ = newAdd_(1, 2, 3, 4) //得到结果
// console.log(a1_)
// const a2_ = newAdd_(1)  //没有满足

// console.log(a2_(2, 3, 4))

// 到这里 函数的通用curry函数已经完成  但是呢  函数curry有什么用？

// ajax 需要三个参数   ajxa 函数肯定是代码里面重复用到函数 是不是每次都要三个参数 但是curry 之后 就不一定了
function ajax(method, url, data) {
    console.log(`给${url}发送${method}请求 参数是${data}`)
}
// ajax('get', 'baidu', {1:'a'})
// ajax('get', 'wanyi', {1:'b'})
const ajaxCurry = curry(ajax)
const ajaxGet = ajaxCurry('get')
const ajaxPost = ajaxCurry('post')
ajaxGet('百度','bbbb') //这样就可以少传一个函数了
ajaxGet('网易','www')

const txgetajax = ajaxGet('腾讯')
ajaxPost('阿里','aaa')
txgetajax('ttt')
txgetajax('gg')