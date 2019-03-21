/**
 * 冒泡
 */

function sort(arr) {
    let array = [...arr]
    for (let i = array.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
            let tmp = array[j];
            if (tmp > array[j + 1]) {
                array[j] = array[j + 1];
                array[j + 1] = tmp;
            }
        }
        // let aa =[...array]
        // console.log(aa)
    }
    return array
}

//console.log(sort([1, 2, 5, 8, 10, 6]))


/**
 * 选择排序
 */

function sort1(arr) {
    let array = [...arr];
    for (let i = 0; i < array.length; i++) {
        let _this = array[i] // 当前值
        let min = array[i] // 最小值
        let key = i;
        for (let j = i + 1; j < array.length; j++) {
            if (min > array[j]) {
                min = array[j]; //保存最小
                key = j;
            }
        }
        array[i] = min
        array[key] = _this
    }
    return array
}

console.log(sort1([11, 2, 5, 8, 10, 6]))