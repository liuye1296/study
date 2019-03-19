/**
 *  带异步的 可以链式调用的 promise
 *  new Promise((resolve, reject)=>{
 *      resolve(22)
 *  }).then(function(a){console.log(a)})
 */
class Promise {
    constructor(fn) {
        // pending  初始态  可以转化为fulfilled（成功态）和rejected（失败态）  状态模式
        this.state = 'pending';
        this.value = undefined; //成功的返回值
        this.error = undefined; //失败原因
        this.resolveCallBackList = []; // 成功的回调函数
        this.rejectCallBackList = []; // 失败的回调函数
        //const _this = this;
        const resolve = (value) => {
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
                //被观察对象操作成功  执行观察者的函数
                this.resolveCallBackList.forEach(fn => fn())
            }
        }
        const reject = (error) => {
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.error = error;
                this.rejectCallBackList.forEach(fn => fn())
            }
        }
        try {
            fn(resolve, reject)
        } catch (error) {
            this.error = error
            reject(this.error)
        }

    }
    //实例函数 接受两个函数参数 成功的函数 失败的函数
    then(onFulfilled, onRejected) {
        if (Object.prototype.toString.call(onFulfilled) !== '[object Function]') {
            console.error(`${onFulfilled} is not a function`)
            return this
        }
        if (this.state === 'fulfilled') {
            onFulfilled(this.value)
        }
        if (this.state === 'rejected') {
            onRejected(this.error)
        }
        //观察者模式 给被观察目标  添加观察者通知函数
        if (this.state === 'pending') {
            this.resolveCallBackList.push(() => {
                onFulfilled(this.value)
            })
            this.rejectCallBackList.push(() => {
                onRejected(this.error)
            })
        }
        return this;
    }
}
new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(22)
    }, 0);
}).then((res) => {
    console.log(res)
})