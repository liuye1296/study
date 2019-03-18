const http = require('http')
http.createServer((request, response) => {
    const url = request.url;
    let data = {}
    switch (url) {
        case '/3102':
            data = {
                "success": {
                    "station_name": "测试店22",
                    "title": "突突突图",
                    "end_date": "2019-03-20",
                    "activity_id": "a5c1fe616110444284683579bc719f7e",
                    "status": "N",
                    "remark": "提醒我一下下雨天",
                    "order_num": "3",
                    "brand_id": "CS",
                    "sale_url": "https://www.isales.cn/jikeshenqi/chj/index.html?activity_id=a5c1fe616110444284683579bc719f7e",
                    "start_date": "2019-03-14"
                }
            }
            break;
        case '/8000':
            data = {
                "success": {
                    "station_name": "测试店22",
                    "title": "突突突图",
                    "status": "N",
                    "qrc_url": "https://isalesimg.oss-cn-shanghai.aliyuncs.com/qrcode/966f27bdf2be4b0a9b77ed926c01901d.jpg",
                    "items": getList(),
                    "people_num": 99,
                    "key_num": "扫码"
                },
            }
            break;
        default:
            break;
    }
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.writeHead(200, { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' });
    response.end(JSON.stringify(data))
}).listen(8080)



  
    function getList() {
        let items = []
        for (let i = 0; i <100; i++) {
            items.push({
                "phone": "15013723079",
                "seat": Math.floor(Math.random() * 10 + 1),
                "name": "风中的承诺",
                "cust_id": i,
                "weixin_top": "https://isalesimg.oss-cn-shanghai.aliyuncs.com/activity/75e4c1847c0a48089f6c1585794bd4a1.jpg"
            })
        }
        return items
    }


