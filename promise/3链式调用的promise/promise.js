/**
 *  带异步的promise
 *  new Promise((resolve, reject)=>{
 *      resolve(22)
 *  }).then(function(a){console.log(a)})
 * 每个then方法都返回一个新的Promise对象（原理的核心）
 * 如果then方法中显示地返回了一个Promise对象就以此对象为准，返回它的结果
 * 如果then方法中返回的是一个普通值（如Number、String等）就使用此值包装成一个新的Promise对象返回。
 * 如果then方法中没有return语句，就视为返回一个用Undefined包装的Promise对象
 * 若then方法中出现异常，则调用失败态方法（reject）跳转到下一个then的onRejected
 * 如果then方法没有传入任何回调，则继续向下传递（值的传递特性）。
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
            setTimeout(() => {
                if (this.state === 'pending') {
                    this.state = 'fulfilled';
                    this.value = value;
                    //被观察对象操作成功  执行观察者的函数
                    this.resolveCallBackList.forEach(fn => fn())
                }
            });
        }
        const reject = (error) => {
            setTimeout(() => {
                if (this.state === 'pending') {
                    this.state = 'rejected';
                    this.error = error;
                    this.rejectCallBackList.forEach(fn => fn())
                }
            });
        }
        try {
            fn(resolve, reject)
        } catch (error) {
            this.error = error
            reject(this.error)
        }

    }
    //实例函数 接受两个函数参数 成功的函数 失败的函数
    then(resolveFn, rejectFn) {
        // 兼容 .then().then() 这种写法 穿透
        if (Object.prototype.toString.call(resolveFn) !== '[object Function]') {
            resolveFn = function (value) { return value }
        }
        if (Object.prototype.toString.call(rejectFn) !== '[object Function]') {
            rejectFn = function (reason) { return reason }
        }
        const _this = this; //缓存上一个promise this
        // 实例化一个新的Promise对象
        const promise = new this.constructor(function (resolve, reject) {
            //这里会立即执行
            if (_this.state === 'fulfilled') { //上一个已经是执行的了 那么立即执行上一个的resolveFn
                //保证这个一定是异步执行
                setTimeout(() => {
                    try {
                        const resolveValue = resolveFn(_this.value)
                        //返回结果是 Promise 
                        if (resolveValue instanceof Promise) {
                            // 递归
                            resolveValue.then(resolve, reject)
                        } else {//假如不是  那么直接执行新的Promise 的resolve 这样就可以传递上一个Promise的值了
                            resolve(_this.value)
                        }
                    } catch (error) {
                        this.error = error
                        reject(error)
                    }
                })
            }
            if (_this.state === 'rejected') {
                setTimeout(() => {
                    try {
                        const resolveValue = rejectFn(_this.value)
                        if (resolveValue instanceof Promise) {
                            resolveValue.then(resolve, reject)
                        } else {//假如不是  那么直接执行返回的Promise 的resolve
                            reject(_this.value)
                        }
                    } catch (error) {
                        this.error = error
                        reject(error)
                    }
                })

            }
            if (_this.state === 'pending') {
                _this.resolveCallBackList.push(() => {
                    try {
                        const resolveValue = resolveFn(_this.value)
                        //返回结果是 Promise 
                        if (resolveValue instanceof Promise) {
                            // 调用返回Promise的then  返回一个Promise
                            resolveValue.then(resolve, reject)
                        } else {//假如不是  那么直接执行返回的Promise 的resolve
                            resolve(_this.value)
                        }
                    } catch (error) {
                        this.error = error
                        reject(error)
                    }

                })
                _this.rejectCallBackList.push(() => {
                    const resolveValue = rejectFn(_this.error)
                    if (resolveValue instanceof Promise) {
                        resolveValue.then(resolve, reject)
                    } else {//假如不是  那么直接执行返回的Promise 的resolve
                        this.error = error
                        reject(_this.error)
                    }
                })
            }
        });
        return promise
    }
    // fn1().catch(()=>{})
    catch(reject) {
        return this.then(null, reject)
    }
    // fn1().wait(2000).then(res=>console.log(res),err=>console.log(err))
    wait(time) {
        return this.then(res => {
            return new this.constructor(function (resolve, reject) {
                setTimeout(function () { resolve(res); }, time)
            })
        }, err => {
            return new this.constructor(function (resolve, reject) {
                setTimeout(function () { reject(err); }, time)
            })
        })
    }
    // fn1().finally(()=>{}) 不管成功还是失败都会执行这个
    finally(fn) {
        return this.then(res => {
            return fn(res), res;
        }, err => {
            throw fn(err), err;
        })
    }
    static resolve(data) {
        return new this.constructor((resolve, reject) => {
            resolve(data)
        })
    }
    static reject(data) {
        return new this.constructor((resolve, reject) => {
            reject(data)
        })
    }
    static all(array) {
        return new this.constructor((resolve, reject) => {
            if (Object.prototype.toString.call(array) === '[object Array]') {
                let i = 0;
                let backList = new Array(array.length), isOK = false;
                array.forEach((fn, index) => {
                    if (fn instanceof Promise) {
                        if (isOK) return
                        try {
                            fn().then(res => {
                                i++;
                                backList[index] = res
                                if (i === array.length) {
                                    resolve(backList)
                                }
                            }, err => {
                                isOK = true
                                reject(err)
                            })
                        } catch (error) {
                            isOK = true
                            reject(err)
                        }
                    } else {
                        i++
                        backList[index] = fn
                        if (i === array.length) {
                            resolve(backList)
                        }
                    }
                })
            } else {
                reject('参数不是数组')
            }
        })
    }
}

new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(22)
    }, 0);
}).then((res) => {
    console.log(res)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(res + 22)
        }, 0);
    })
}, (err) => {
    console.log('异常' + err)
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(err + 22 + 3)
        }, 0);
    })
}).then().then().then(res => {
    console.log('正常' + res)
}, err => { console.log(err) })