/**
 * 数组操作
 */

/**
 * 
 * fill()  用于将一个固定值替换数组的元素。
 */
let fillArray = new Array(5);
fillArray.fill('33');
console.log(fillArray);//输出 33 33 33 33 33

/**
 * array1.concat(array2,array3,...,arrayX)
 * concat() 连接两个或更多的数组，并返回结果。
 */

let concatArray_0 = ['2', '3'], concatArray_1 = ['3', '4'], concatArray_2 = ['5', '6'];
let newConcatArray = concatArray_0.concat(concatArray_1, concatArray_2);
console.log(newConcatArray)// ['2','3','3','4','5','6']


/**
 * array.copyWithin(target, start, end)
 * target copy的截止位置  start copy的开始位置
 * copyWithin()
 */

/**
 * entries() 创建一个可迭代对象 
 */

let fruits = ["Banana", "Orange", "Apple", "Mango"];
console.log(fruits.entries());

/**
 * filter() 过滤  传入一个函数  会把数组 遍历 返回 
 */

let filterArray = [1, 2, 3];
const newFilterArray = filterArray.filter(function (res) {
    return res <= 2
})
console.log(newFilterArray)