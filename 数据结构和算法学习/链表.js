/**
 * 链表是由一组节点组成的集合。
 * 每一个节点都使用一个对象的引用指向它的后续借点。
 * 指向另外一个借点的引用叫做链
 * 插入非常效率
 */
function LinkedList() {
    let tail = null, head = null;
    this.length = 0;
    /**
     * 查找一个节点
     * @param {*} data 
     */
    const find = function (data) {
        let currNode = head;  //从表头查找
        while (currNode.element !== data) {
            currNode = currNode.next;
        }
        return currNode;
    }
    /**
     * 删除并返回第一个表
     */
    this.shift = function () {
        if (head !== null) {
            this.length--;
            let _head = head;
            head = head.next;
            _head.next = null;
            if (head === null) tail = null;
            return _head.data;
        } else {
            return undefined;
        }

    }
    /**
     * 删除并返回最后个表
    */
    this.pop = function () {
        let current = head;//当前遍历的
        let previous = head;//当前遍历的上一个
        let elem;
        while (current !== null) {
            if (tail === current) {
                if (current === head) {
                    elem = tail.data;
                    head = null;
                    break;
                }
                tail = previous;
                previous.next = current.next;
                elem = current.data;
                break;
            }
            previous = current;
            current = current.next;
        }
        if (head === null) tail = null;
        if (elem) {
            this.length--;
            return elem
        } else {
            return undefined
        }
    }
    /**
     * 末尾插入
     */
    this.push = function (data) {
        let node = { data, next: null };
        if (head !== null) {
            tail.next = node;
            tail = tail.next;
        } else {
            head = node;
            tail = node;
        }
        this.length++;
        return this.length
    }
    /**
     * 开头插入
     */
    this.unshift = function (data) {
        let node = { data, next: null };
        if (head === null) {
            head = node;
            tail = node;
        } else {
            head.next = node;
            head = head.next;
        }
        this.length++;
        return this.length
    }
    /**
     * 删除一个
     */
    this.remover = function (data) {
        let current = head;
        let previous = head;
        let elem;
        while (current !== null) {
            if (data === current.data) {
                if (current === head) {
                    head = current.next;
                    elem = current.data;
                    break;
                }
                if (current === tail) tail = previous;
                previous.next = current.next;
                elem = current.data;
                break;
            }
            previous = current;
            current = current.next;
        }
        if (head === null) tail = null;
        if (elem) {
            this.length--;
            return elem
        } else {
            return false
        }
    }
    /**
     * 在什么后面插入
     */
    this.insert = function (data, item) {
        let newNode = { data, next: null };
        let _item = this.find(item); //找到这个节点
        newNode.next = _item.next;
        _item.next = newNode;
        this.length++;
        return this.length
    }
}

