const aa = function () { }
const array = ['1', '2', '3', '2', '4', '5', '1', aa]
/**
*  遍历数组 利用 indexOf  不存在就放入新的数组
*/
// function uniq0() {
//     const array = Array.prototype.concat.apply([], Array.from(arguments))
//     let newArray = [];
//     array.forEach(item => {
//         newArray.indexOf(item) === -1 ? newArray.push(item) : ''
//     });
//     return newArray
// }

// console.log(uniq0(array))

/**
 * 如果当前数组的第i项在当前数组中第一次出现的位置不是i，那么他是重复
 * @param {*} array   
 */
// function uniq1() {
//     const array = Array.prototype.concat.apply([], Array.from(arguments))
//     return array.filter((item, index) => {
//         return array.indexOf(item) === index
//     })
//     // return array
// }

// console.log(uniq1(array))

/**
 * 双重for 
 */
// function uniq2() {
//     const array = Array.prototype.concat.apply([], Array.from(arguments))
//     let arr = array
//     for (let i = 0, len = arr.length; i < len; i++) {
//         for (let j = i + 1; j < len; j++) {
//             if (arr[i] === arr[j]) {
//                 arr.splice(j, 1);//重复了 干掉他
//                 len--;
//                 j--
//             }
//         }
//     }
//     return arr
// }


// console.log(uniq2(array))

/**
 * 排序去重 排序之后 重复的值一定会相邻 那个就可以左右对比
 */
// function uniq3() {
//     const array = Array.prototype.concat.apply([], Array.from(arguments))
//     array.sort()
//     let newArray = [array[0]]
//     for (let i = 1, len = array.length; i < len; i++) {
//         array[i] !== array[i - 1] && newArray.push(array[i])
//     }
//     return newArray
// }

// console.log(uniq3(array))


/** 
 * 利用set 去重 set不能存放重复的值
 */

// function uniq4() {
//     const array = Array.prototype.concat.apply([], Array.from(arguments))
//     return [...new Set(array)]
// }
// console.log(uniq4(array))
/**
 * 利用object key 不能重复的特性 
 */

function uniq5() {
    const array = Array.prototype.concat.apply([], Array.from(arguments))
    let obj = {}, newArray = [];
    array.forEach((item) => {
        if (!obj[item]) {
            obj[item] = 1;
            newArray.push(item)
        }
    });
    obj = null;
    return newArray
}
console.log(uniq5(array))

/**
 * includes 也可以达到效果   includes 是判断是否存在这个值
 * for of  
 */

function uniq6() {
    const array = Array.prototype.concat.apply([], Array.from(arguments))
    let newArray = [];
    for (let obj of array) {
        !newArray.includes(obj) && newArray.push(obj)
    }
    return newArray
}
console.log(uniq6(array))


/**
 * 利用Map
 */
function uniq7() {
    const array = Array.prototype.concat.apply([], Array.from(arguments))
    let map = new Map, newArray = [];
    array.forEach(item => {
        if (!map.has(item)) {
            map.set(item, null)
            newArray.push(item)
        }
    });
    map = null;
    return newArray
}
console.log(uniq7(array))