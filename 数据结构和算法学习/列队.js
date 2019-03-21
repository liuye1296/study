/**
 *  列队：
 *  队列是一种先进先出的线性表。它只允许在表的一端进行插入，而在另一端删除元素
 *  插入 队尾tail   删除队头 head
 */

function Queue() {
    this.length = 0;
    let tail = null, head = null;
    /**
     * 清空列队
     */
    this.clear = function () {
        tail = null;
        head = null;
    }
    /**
     * 查看队头
     */
    this.head = function () {
        return head;
    }
    /**
     * 查看队尾
     */
    this.tail = function () {
        return tail;
    }
    /**
     * 入队
     */
    this.enQueue = function (data) {
        if (head === null) { // 队 头或者队尾不存在 说明是初始化
            head = tail = { data, next: null };
        } else {
            //操作队尾
            let _date = { data, next: null };
            tail.next = _date
            tail = _date
        }
        this.length++;
    }
    /**
     * 出队
     */
    this.doQueue = function () {
        if (head) {
            const data = head.data;
            head = head.next;
            if (head === null) { //说明这是最后一个列队 把队尾也KO掉
                tail = null;
            }
            this.length--;
            return data
        } else {
            console.warn('列队已空')
            return undefined
        }
    }
    /**
     * 遍历 入参 fn(item,index)
     */
    this.forEach = function (fn) {
        if (typeof fn === 'function') { // 必需要传入一个参数
            let item = head;
            let length = this.length;
            while (item) {
                if (fn(item, length)) break; // 如果返回一个true 就结束迭代 
                length--;
                item = item.next;
            }
        }
    }
}

/**
 * 循环列队
 */
class CirculaeQueue {
    constructor(k) {
        this._list = new Array(k);
        this._front = 0;//头指针
        this._rear = 0; //尾指针
        this.k = 0;
    }
    enQueue(data) {
        if (this.isFull) {
            return false
        } else {
            this._list[this._rear] = data;
            this._rear = (this._rear + 1) % this.k;
            return true
        }
    }
    doQueue() {
        let data = this._list[this._front];
        this._list[this._front] = '';
        this._front = (this._front + 1) % this.k;
        return data;
    }
    /**
     * 空列队
     */
    isEmpty() {

    }
    /**
     * 满列队
     */
    isFull() {

    }
}