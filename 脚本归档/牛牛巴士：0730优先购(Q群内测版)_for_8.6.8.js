auto.waitFor();
app.launchApp("大麦");
console.show()
console.setPosition(100,100)

/************更多最新脚本，欢迎进群604964470了解，验证信息填写：在哪里看到本脚本****************/
/***
牛牛巴士APP：
1.某麦抢票消息、波泼页码生成、JJ20扫文识字搜答案；
2.某麦模拟点击脚本已完成；优先购脚本、滑块脚本正在拟测中...
https://wwxz.lanzouw.com/b0aug8sjc
密码：9alc
***/

//是否为测试状态
var debug = false;


//步骤一：自定义开抢时间+优先购项目
var startTime = "07月31日 12:20";
var buyItem = "2023张杰" //项目名称太长，可以抽取中间不易写错的文字

//步骤二：打开vip会员中心，让手机屏幕完整显示你要优先购的项目

//步骤三：运行脚本，会自动打开某麦，在vip会员中心界面等待倒计时

//开抢时间戳
var startTimestamp = convertStartTime(startTime);
//print(startTimestamp);
//print(convertToTime(startTimestamp))

//大麦时间戳
var damaiTimestamp=0;
var i = 0;
 // 循环等待
while (true) {
    damaiTimestamp = getDamaiTimestamp();
    if (damaiTimestamp >= startTimestamp) {
            print("[" + startTime + "] 到点了，自动开始。");
            break;
        }
    var mm = startTimestamp - damaiTimestamp;
    var ss = mm/1000;
    if(ss>100){
             print("距离[" + startTime + "]剩余："+(ss)+"秒");
             sleep(200);
    }else{print("距离[" + startTime + "]剩余："+(mm)+"毫秒");}

    i++;
    if(i%200==0){
        print("清屏");
        console.clear();
    }
    if(i>20){if(debug){break;}}//测试用
}

 //项目：优先购项目
print("点击优先购项目[%" + buyItem + "%]");
textContains(buyItem).findOne().click()


//按钮：立即兑换
print("索引[立即兑换]按钮");
var go2look = text("立即兑换").findOne();
var go2lookX = go2look.bounds().centerX()
var go2lookY = go2look.bounds().centerY()
print("找到[立即兑换]按钮坐标="+go2lookX+","+go2lookY)
click(go2lookX, go2lookY)
print("点击[立即兑换]");

//按钮：立即使用
//此处不严谨，没试过优先购，所以，可能只需要点击上一步骤的立即兑换即可成功
print("索引[立即使用]按钮");
var confirmBtn = text("立即使用").findOne();
var confirmBtnX = confirmBtn.bounds().centerX()
var confirmBtnY = confirmBtn.bounds().centerY()
print("找到[立即使用]按钮坐标="+confirmBtnX+","+confirmBtnY)
click(confirmBtnX, confirmBtnY)
print("点击[立即使用]");



/*********************以下为函数工具*************************/

   // 设置开抢时间
function convertStartTime(startTime){
    var year = new Date().getFullYear();
    var month = startTime.slice(startTime.indexOf("月") - 2, startTime.indexOf("月")) - 1;
    var day = startTime.slice(startTime.indexOf("日") - 2, startTime.indexOf("日"));
    var hour = startTime.slice(startTime.indexOf(":") - 2, startTime.indexOf(":"));
    var minute = startTime.slice(startTime.indexOf(":") + 1, startTime.indexOf(":") + 3);
    var second = 0;
    var msecond = 0;
    startTimestamp = new Date(year, month, day, hour, minute, second, msecond).getTime();
    startTimestamp = startTimestamp - 60; // 减去 40ms 的网络延迟
    return startTimestamp;
}





/**
 * 感谢GitHub大佬提供
 * @param {时间戳} timestamp
 * @returns ISO 8601 格式的北京时间
 */
function convertToTime(timestamp) {
    var date = new Date(Number(timestamp));
    var year = date.getUTCFullYear();
    var month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    var day = date.getUTCDate().toString().padStart(2, "0");
    var hours = (date.getUTCHours() + 8).toString().padStart(2, "0");
    var minutes = date.getUTCMinutes().toString().padStart(2, "0");
    var seconds = date.getUTCSeconds().toString().padStart(2, "0");
    var milliseconds = date.getUTCMilliseconds().toString().padStart(3, "0");
    var iso8601 = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
    return iso8601;
}



/**
 *
 * @returns 大麦服务器时间戳
 */
function getDamaiTimestamp() {
    return JSON.parse(http.get("https://mtop.damai.cn/gw/mtop.common.getTimestamp/", {
        headers: {
            'Host': 'mtop.damai.cn',
            'Content-Type': 'application/json;charset=utf-8',
            'Accept': '*/*',
            'User-Agent': 'floattime/1.1.1 (iPhone; iOS 15.6; Scale/3.00)',
            'Accept-Language': 'zh-Hans-CN;q=1, en-CN;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive'
        }
    }).body.string()).data.t;
}
