
//蛋疼点 在于JS引用类型赋值。。。 
// function cloneLoop(x) {
//     const root = {};

//     // 栈
//     const loopList = [
//         {
//             parent: root,//上一个遍历的对象
//             key: undefined,
//             data: x,//要变量的对象
//         }
//     ];

//     while (loopList.length) {
//         // 深度优先
//         const node = loopList.pop();
//         const parent = node.parent;
//         const key = node.key;
//         const data = node.data;

//         // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
//         let res = parent;// 改变  res 的值 就会改变  parent的值  改变 parent的值 就会改变 root的值

//         if (typeof key !== 'undefined') {
//             res = parent[key] = {};
//         }
//         for (let k in data) {
//             if (data.hasOwnProperty(k)) {
//                 if (typeof data[k] === 'object') {
//                     // 下一次循环
//                     loopList.push({
//                         parent: res,
//                         key: k,
//                         data: data[k],
//                     });
//                 } else {
//                     res[k] = data[k];
//                 }
//             }
//         }
//     }

//     return root;
// }

const copy = {
    data: {
        isok: 'ok',
        ko:['2']
    },
    name: 'Lyd',
    age: '26',
    nae:{
        1:'a',
        2:'b'
    }

}

//const _copy = cloneLoop(copy)

//console.log(_copy)


// 递归 copy
function deepCopy(a, b = {}) {
    if (typeof a === 'object' && a !== null) { // typeof null === 'object'
        for (key in a) {
            if (typeof a[key] === 'object' && a[key] !== null) {
                // a[key].constructor === 'Array' or  Array.isArray(a[key])  or  a[key] instanceof  Array
                b[key] = Object.prototype.toString.call(a[key]) === '[object Array]' ? [] : {};
                deepCopy(a[key], b[key])
            } else { // 不是对象 直接赋值
                b[key] = a[key]
            }
        }
    } else { // copy的对象 不是对象 那么直接返回
        return a
    }
    //copyList = null
    return b
}
console.log(deepCopy(copy))
// JSON copy 最简单的深度copy
function deepByJSON(res) {
    return JSON.parse(JSON.stringify(res))
}
