auto.waitFor();
app.launchApp("大麦");
console.show();
console.setPosition(100,100)

/************更多最新脚本，欢迎进群604964470了解，验证信息填写：在哪里看到本脚本****************/
/***
牛牛巴士APP：
1.某麦抢票消息、波泼页码生成、JJ20扫文识字搜答案；
2.某麦模拟点击脚本已完成；优先购脚本、滑块脚本正在拟测中...
https://wwxz.lanzouw.com/b0aug8sjc
密码：9alc
***/

//本脚本是通过github大神们的脚本，模仿写出，用来学习使用
//预先说明，滑块问题，需要更换设备和路由器，或者直接用手机网络，到手机网络会慢，自己抉择


//步骤1：在某麦的显示倒计时的页面，填好观影人

//步骤2：在此处填好你想看的场次(填周X)和票档(填数字)
var ticketInfo = {
    date: "周日",
    price: "2580"
}

//步骤2.1 倒计时0秒之后按钮会变"立即订购"，继而一瞬间又变回"立即预约"，说明APP，在0秒的时候还会再次请求服务器时间，所以此处新添抖动
var zeroToWait = 300;

//步骤3：打开某麦APP，进入有倒计时的页面，即预约界面

//步骤4：回到Autojs，点击本脚本的"运行"按钮，即会自动跳转到某麦APP


//下面不用管
main(ticketInfo);

function main(ticketInfo) {
    // 从界面上获取开抢时间
    var UIStartTime = id("id_project_count_sell_time").findOne();
    // 获取系统本地时间
    var strStartTime = UIStartTime.text();
    print("获取到开抢时间: " + strStartTime);

    // 通过viewId获取点击坐标
    //todo 如果大麦更新该id，得重新获取jdxd
    //var btnBuy = id("trade_project_detail_purchase_status_bar_container_fl").findOne();
    var btnBuy = id("tv_left_main_text").findOne();
    var rectBtnBuy = btnBuy.bounds();
    var clickPosX = rectBtnBuy.centerX();
    var clickPosY = rectBtnBuy.centerY();
    print("获取到的点击坐标: " + clickPosX + ", " + clickPosY);

    // 设置开抢时间
    var year = new Date().getFullYear();
    var month = strStartTime.slice(strStartTime.indexOf("月") - 2, strStartTime.indexOf("月")) - 1;
    var day = strStartTime.slice(strStartTime.indexOf("日") - 2, strStartTime.indexOf("日"));
    var hour = strStartTime.slice(strStartTime.indexOf(":") - 2, strStartTime.indexOf(":"));
    var minute = strStartTime.slice(strStartTime.indexOf(":") + 1, strStartTime.indexOf(":") + 3);
    var second = 0;
    var msecond = 0;
    var startTimestamp = new Date(year, month, day, hour, minute, second, msecond).getTime();
    startTimestamp = startTimestamp - 40; // 减去 40ms 的网络延迟
    var damaiTimestamp;
    var startTime = convertToTime(startTimestamp);
    print("开始时间：\n", startTime);
    print("等待开抢...");
    var i = 0;
     // 循环等待
    while (true) {
        damaiTimestamp = getDamaiTimestamp();
        if (damaiTimestamp >= startTimestamp) {
            print("到点了，自动开始。");
            break;
        }
        var mm = startTimestamp - damaiTimestamp;
        var ss = mm/1000;
        if(ss>100){
            print("剩余："+(ss)+"秒");
        }else{print("剩余："+(mm)+"毫秒");}
        
        i++;
        if(i%200==0){
            print("清屏");
            console.clear();
          //break;
        }
 
    }
    
    //2023.07.27  加个抖动，因为在0秒的时候，还会再次请求服务器时间回到APP校准，所以此处等几毫秒吧
    print("加入抖动：" + zeroToWait + "ms");
    sleep(zeroToWait);

    click(clickPosX, clickPosY);
    print("点击立即购买按钮");

    // 选择场次
    textContains(ticketInfo.date).findOne().parent().parent().parent().parent().click();
    print("选择场次ing");

    //选择票档
    textContains(ticketInfo.price).findOne().parent().parent().parent().parent().click();
    print("选择票档ing");

    id("btn_buy").findOne().click();
    print("点击红色确定按钮");
    
    //print("进入提交订单页面");
    
    //获取按钮位置
    text("提交订单").findOne().click();
    print("点击提交订单按钮");
 

    // 提交订单的大麦时间
    var endTime = convertToTime(getDamaiTimestamp());
    console.log("订单提交时间：" + endTime);
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

