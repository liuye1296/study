/**
 *  最基本的 Promise
 *  new Promise((resolve, reject)=>{
 *      resolve(22)
 *  }).then(function(a){console.log(a)})
 */
class Promise {
    constructor(fn) {
        // pending  初始态  可以转化为fulfilled（成功态）和rejected（失败态）   状态模式
        this.state = 'pending';
        this.value = undefined; //成功的返回值
        this.error = undefined; //失败原因
        const _this = this;
        function resolve(value) {
            if (_this.state === 'pending') {
                _this.state = 'fulfilled';
                _this.value = value;
            }
        }
        function reject(error) {
            if (_this.state === 'pending') {
                _this.state = 'rejected';
                _this.error = error;
            }
        }
        try {
            fn(resolve, reject)
        } catch (error) {
            this.error = error
            reject(this.error)
        }

    }
    // 实例函数 接受两个函数参数 成功的函数 失败的函数
    then(onFulfilled, onRejected) {
        if (Object.prototype.toString.call(onFulfilled) !== '[object Function]') {
            console.error(`${onFulfilled} is not a function`)
            return this;
        }
        if (this.state === 'fulfilled') {
            onFulfilled(this.value)
        }
        if (this.state === 'rejected') {
            onRejected(this.error)
        }
        return this;
    }
}
new Promise((resolve, reject) => {
    resolve(22)
}).then(null)

// new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve(333)
//     }, 0);
// }).then((res) => {
//     console.log(res) //不会执行
// })

