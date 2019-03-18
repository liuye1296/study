
class Judge {
    constructor() { }
    static isEmpty(str, msg) {
        if ((typeof (str) == "undefined" || str == null || str == "" || str == "undefined" || str == "null")) {
            return msg;
        }
    }
    static isNumeric(value, msg) {
        var pattern = /^[0-9]*$/;
        if (!pattern.test(value)) {
            return msg;
        }
    }
    static isPhone(value, msg) {
        var pattern = /^(1)[0-9]{10}$/;
        if (!pattern.test(value)) {
            return msg;
        }
    }
}
class Validator {
    constructor() {
        this._list = []
    }
    add(value, validator) {
        if (Object.prototype.toString.call(validator) === '[object Array]') {
            validator.map(res => {
                this._list.push(function () {
                    return Judge[res.strategy].apply("", [value, res.msg]);
                })
            })
        } else {
            this._list.push(function () {
                return Judge[validator.strategy].apply("", [value, validator.msg]);
            })
        }
        return this
    }
    start() {
        for (let i = 0; i < this._list.length; i++) {
            const msg = this._list[i]()
            if (msg) {
                return msg
            }
        }
    }
}
let validator = new Validator()
validator = validator.add('3333', [{
    strategy: 'isEmpty',
    msg: "姓名不能为空"
}]).add('', {
    strategy: 'isEmpty',
    msg: "哈哈哈不能为空"
});

//console.log(validator)


/* function currying(fn) {
    let args = []
    return function () {
        if (arguments.length === 0) {
            return fn.apply(this, args)
        } else {
            [].push.apply(args, arguments)
            return arguments.callee
        }
    }
} */


// var curry = function (fn) {
//     var _args = []
//     return function cb() {
//         if (arguments.length == 0) {
//             return fn.apply(this, _args)
//         }
//         Array.prototype.push.apply(_args, arguments);
//         return arguments.callee;
//     }
// }

// curry(function () {
//     let aa = []
//     return function () {

//     }
// })

// var add = function () {
//     var _this = this,
//         _args = arguments
//     return function () {
//         if (!arguments.length) {
//             var sum = 0;
//             for (var i = 0,
//                 c; c = _args[i++];) sum += c
//             return sum
//         } else {
//             Array.prototype.push.apply(_args, arguments)
//             return arguments.callee
//         }
//     }
// }

// console.log(add(1)(2)(3)(4)())


// 惰性单列 通用函数
const lazyNew = function (fn) {
    let __res = null;
    return function () {
        return __res || (__res = fn.apply(this, arguments))
    }
}
const getValidator = function (Validator) {

    return function () {
        return new Validator()
    }
}
const a = lazyNew(getValidator(Validator))
const b = a();
const c = a();
b.add('222', {
    strategy: 'isEmpty',
    msg: "哈哈哈不能为空"
})
console.log(c)

console.log(c === b)