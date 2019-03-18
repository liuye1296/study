//接收者   命令对象   触发者
class 接收者{
    zx(){
        console.log('我执行了')
    }
}


class 命令者{
    //命令者 需要一个接收者 
    constructor(obj){
        this.obj=obj
    }
    执行(){
        this.obj.zx()
    }
}

class 触发者{

}