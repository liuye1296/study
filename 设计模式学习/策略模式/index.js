
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