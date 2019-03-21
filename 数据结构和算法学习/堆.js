/**
 * 而堆就不同了，堆是一种经过排序的树形数据结构，每个结点都有一个值。
 * 通常我们所说的堆的数据结构，是指二叉堆。堆的特点是根结点的值最小（或最大），
 * 且根结点的两个子树也是一个堆
 * 在JS 里面 其实就是一个有序的数组
 * 取 可以利益位置  存必需要有序
 */
/**
*如果i=0，节点i是根节点，否则节点i的父节点为(i-1)/2
*2*i+1左子节点    2*i+2 右子节点
*/