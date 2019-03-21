/**
 * 1.重复的操作 2.结束条件 两大核心
 * ip复原
 */

function ip(str) {
    let arr = []
    let search = (cur, sub) => {
        if (cur.length === 5 && cur.jion('') === str) {
            arr.push(cur)
        } else {
            for (let i = 0, len = Math.min(3, sub.length), tmp; i < len; i++) {
                tmp = sub.substr(0, i + 1)
                if (tmp < 256) {
                    search(cur.concat([tmp]), sub.substr(i + 1))
                }
            }
        }
    }
}