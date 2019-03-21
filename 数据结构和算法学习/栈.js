/**
 *  stack  堆栈 先进后出
 * 其限制是仅允许在表的一端进行插入和删除运算。这一端被称为栈顶，相对地，把另一端称为栈底
 */
function Stack() {
    let Node = function (data) {
        this.data = data;
        this.next = null;
    };
    let top = null; //栈顶对象
    let length = 0;
    /**
     * 压栈
     */
    this.push = function (data) {
        const node = new Node(data);
        if (length === 0) { // 空栈 
            top = node;
        } else {
            node.next = top // 新的对象 存储上一个对象 也就是栈顶
            top = node // 替换栈顶
        }
        length++;
        return true
    }

    /**
     * 出栈
     */
    this.pop = function () {
        if (top || length !== 0) {
            let _top = top; // 临时存放栈顶 最好是用深copy
            top = _top.next; // 把下一个对象  顶替栈顶
            length--;
            _top.next = null;
            return _top.data;
        } else {
            console.warn('栈已经空了')
            return undefined
        }
    }
    /**
     * 清空栈
     */
    this.clear() = function () {
        top = null;
        length = 0
    }
    /**
     * 栈长度
     */
    this.size = function () {
        return length;
    }
    /**
     * 查看栈顶
     */
    this.top = function () {
        return top.data;
    }
}


// class Stack {
//     constructor() {
//         this.stackList = [];
//         this.legth = 0;
//     }
//     /**
//      * 压栈
//      */
//     push(data) {
//         this.stackList.push(data)
//         this.legth += 1;
//         return true;
//     }
//     /**
//      * 出栈
//      */
//     pop() {
//         if (this.legth > 0) this.legth -= 1;
//         return this.stackList.length !== 0 ? this.stackList.pop() : null
//     }
//     /**
//      * 查看栈顶 但是不取出
//      */
//     top() {
//         return this.legth > 0 ? this.stackList[this.legth - 1] : null;
//     }
//     /**
//      * 清空栈
//      */
//     clear() {
//         this.stackList = [];
//         this.legth = 0;
//         return true;
//     }
// }
// let stack = new Stack();
// console.log('初始化长度' + stack.legth)
// stack.push(2)
// debugger
// stack.push(3)
// stack.push(4)
// console.log('压栈之后长度' + stack.legth)

// console.log('压栈之后栈顶' + stack.top())

// console.log('出栈' + stack.pop())

// console.log('出栈之后长度' + stack.legth)

// stack.clear()
// console.log('清空之后' + stack.pop())
// console.log('清空之后长度' + stack.legth)


// function Stack() {
//     let arr = [];
//     this.length = 0;
//     //压栈操作  
//     this.push = function (element) {
//         arr.push(element);
//         this.length += 1;
//         return true;
//     }
//     //出栈操作  
//     this.pop = function () {
//         if (this.length > 0) this.length -= 1;
//         return arr.pop();
//     }
//     //获取栈顶元素  
//     this.top = function () {
//         return arr[arr.length - 1];
//     }
//     //清空栈  
//     this.clear = function () {
//         arr = [];
//         this.length = 0;
//         return true;
//     }

//     this.toString = function () {
//         return arr.toString();
//     }
// }

// let stack = new Stack();

// console.log('初始化长度' + stack.length)
// stack.push(2)
// debugger
// stack.push(3)
// stack.push(4)
// console.log('压栈之后长度' + stack.length)

// console.log('压栈之后栈顶' + stack.top())

// console.log('出栈' + stack.pop())

// console.log('出栈之后长度' + stack.length)

// stack.clear()
// console.log('清空之后' + stack.pop())
// console.log('清空之后长度' + stack.length)