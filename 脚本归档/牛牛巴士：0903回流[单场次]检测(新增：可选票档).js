auto.waitFor();
app.launchApp("大麦");
console.show();
console.setPosition(100, 100)
console.setTitle("牛牛巴士：回流检测", "#ff11ee00", 30);
console.setLogSize(10);
console.setMaxLines(500);
//console.setBackgroud("#33ef0000");
console.setSize(700, 1000);
console.setCanInput(false);
/**********脚本免费，偷脚本去卖的小人，全家生大病。没骂过人，不好意思，说这么粗鲁的话。，***********/

/************更多最新脚本，欢迎进群604964470()如果满了请进其他群了解，验证信息填写：在哪里看到本脚本****************/
/***
 牛牛巴士APP：
 1.某麦抢票消息、监控、JJ20扫文识字搜答案；
 2.某麦模拟点击脚本已完成；滑块脚本已完成...
 https://wwxz.lanzouw.com/b0aug8sjc
 密码：9alc
 ***/
//本脚本是通过github大神们的脚本，模仿写出，用来学习使用

/******************[单场次回流检测设置]*******************/
var mode = 1;//选择模式   填  1或者2
var dateStr = " 周";//单场次一般不需要动这个参数
var moneyStrs = ["元"];//默认选择价位最低的，如果想等980的回流，那就填["980元"]，如果想980和1980那就填  ["980元","1980元"]
var listenDelay = 500;//点击间隔时间
var jumpDelay = 200;//单场次专用参数：表示返回主页，重进下单页的间隔时间，越小越快
var buyNum = 1;//买几张票。不指定观影人，默认顺序选择；如果需要指定，请看下方参数

//[高级设置，请认真看注释，不要总是没设置好，就先说脚本有问题，自己多看看中文]
var clickPerson = false;//是否需要帮忙选择观影人，默认false不帮点,需要帮点则改为true
var isCustom = false;//默认为false,表示下方指定姓名的参数不生效，如果需要生效，则改为true
var personNames = ["杨xx", "叶xx", "刘xx", "宗xx"];//指定观影人，买几张票就写几个人的名字


/*******以下默认就行，不会代码，尽可能少动*********/

/*************[努力刷新]按钮设置，不用设置*********/
var freshBtnReconize = "努力刷新";

/*************[我知道了]按钮设置，不用设置*********/
var iKnowBtnReconize = "我知道了";//后期优化成数组

/*************[滑块模拟滑动]设置，如果不会设置，不动也可以*********/
//步骤一：定义滑块标识
var reconizeSliper = "向右滑动验证";
//var reconizeSliper = "法语音乐剧";//用于测试，这里"厂牌号"是APP中"话剧音乐剧"模块内的一个标识
//步骤二：根据手机情况定义滑块偏移量
//滑块横坐标偏移量
var offsetX = 25;
//滑块纵坐标偏移量
var offsetY = 0;
//步骤三：根据手机情况设置滑块的滑动距离
var swipeLength = 4000;
//步骤四：设置多少毫秒内滑完滑块
var swipeTime = 100

/*************[滑块模拟滑动]设置结束*********/


/******************自动点击[努力刷新]按钮程序*******************/
function jumpFreshBtu(reconizeFlag) {
    threads.start(
        function () {
            while (true) {
                var tt = textContains(reconizeFlag).findOne();
                var x = tt.bounds().left
                var y = tt.bounds().centerY()
                print("找到[" + reconizeFlag + "]坐标(" + x + "," + y + ")");
                print("点击[" + reconizeFlag + "]");
                sleep(300);
                tt.click();
            }
        }
    )
}

/******************滑块程序:模拟滑动*******************/
function sliperFunc() {
    //清屏函数
    var loopT = 1;
    //找到滑块
    var findSliper = false;

    //浮窗指示器
    threads.start(
        function () {
            while (true) {
                if (findSliper) continue;
                print("牛牛巴士");
                print("检测滑块标识(" + reconizeSliper + ")ing：" + (loopT++) + "次");
                sleep(1000);
                if (loopT % 20 == 0) {
                    //print("清屏，放内存")
                    //console.clear()
                }
            }
        }
    )

//检测滑块方式一：假如命中滑块
    threads.start(
        function () {
            while (true) {
                var tt = textContains(reconizeSliper).findOne();
                //var tt = id("nc_1__scale_text").findOne();
                findSliper = true;
                var x = tt.bounds().left
                var y = tt.bounds().centerY()
                print("找到滑块坐标(" + x + "," + y + ")");
                print("尝试滑动");
                swipe(x + offsetX, y + offsetY, x + swipeLength, y + offsetY, swipeTime);
                sleep(500)
                findSliper = false
            }
        }
    )
}

/******************结束：滑块程序:模拟滑动*******************/


/******************回流检测逻辑*******************/
if (mode == 1) {

    for (; ;) {
        print("牛牛巴士：单场次检测模式1，在场次票档下单页执行才生效");
        var date = textContains(dateStr).findOne();/**周***/
        if (currentPackage() == "cn.damai" && currentActivity() == "cn.damai.trade.newtradeorder.ui.projectdetail.ui.activity.ProjectDetailActivity") {
            var buyB = id("tv_left_main_text").findOne();
            click(buyB.text());
        }
        click(date.text());
        var tickets = textContains("元").untilFind();//untilFind
        var ticketNulls = text("缺货登记").untilFind();//untilFind
        if ((tickets.length == ticketNulls.length)) {
            print("牛牛巴士：" + date.text() + "->无回流票");
            print("牛牛巴士：傻傻地返回主页面,再进来");
            sleep(jumpDelay);
            //如果这个无法返回
            //id("title_back_btn").findOne().click();
            //那就用这个，模拟左滑
            //swipe(device.width, device.height/2, device.width/2, device.height/2, 200);
            //还不行，用这个
            back();
            sleep(jumpDelay);
            //id("tv_left_main_text").findOne().click();
            var buyB = id("tv_left_main_text").findOne();
            click(buyB.text());
            // sleep(1000);
        } else {
            print("牛牛巴士：" + date.text() + "->有回流票");
            loopTickets(tickets);
            threads.shutDownAll();
        }
        sleep(listenDelay);

        toast("牛牛巴士：努力加载回流中...");
        print("循环ing");
    }
}

if (mode == 2) {
    for (; ;) {
        sleep(1000);
        print("牛牛巴士：单场次检测模式2，在票详情页执行才生效");
        if (currentPackage() == "cn.damai" && currentActivity() == "cn.damai.trade.newtradeorder.ui.projectdetail.ui.activity.ProjectDetailActivity") {
            swipe(device.width - 20, device.height / 3, device.width - 20, device.height, 200);
        }
        //抄吧抄吧，给你抄
        var buyBtn = id("tv_left_main_text").findOne();
        var btnText = buyBtn.text();
        if (btnText !== "立即购买" && btnText !== "立即预订") {
            print(btnText);
            print("继续下拉刷新");
        } else {
            click(btnText);
            print("牛牛巴士：点击" + btnText + "按钮");
            var date = textContains(dateStr).findOne();
            click(date.text());
            var tickets = textContains("元").untilFind();//untilFind
            var ticketNulls = text("缺货登记").untilFind();//untilFind
            if ((tickets.length == ticketNulls.length)) {
                print("牛牛巴士：" + date.text() + "->可惜了，进来就无回流票");
                print("牛牛巴士：傻傻地返回主页面,下拉刷新");
                sleep(jumpDelay);
                //id("title_back_btn").findOne().click();
                back();
            } else {
                print("牛牛巴士：" + date.text() + "->有回流票");
                loopTickets(tickets);
                //back();
                //sleep(300);
                threads.shutDownAll();
            }
        }


    }
}

function loopTickets(tickets) {
    var buying = false;
    tickets.forEach(function (ticket) {
        sleep(100);
        moneyStrs.forEach(function (moneyStr) {
            if (ticket.text().includes(moneyStr)) {
                // print(ticket.text());
                click(ticket.text());
                print("=======");
                var label = text("价格明细").find();
                if (label.length == 1) {
                    print("有票的");
                    var ths = threads.start(function () {
                        //异常按钮检测开始
                        jumpFreshBtu(iKnowBtnReconize);
                        jumpFreshBtu(freshBtnReconize);
                        //滑块检测开始
                        sliperFunc();
                    });

                    for (i = 1; i < buyNum; i++) {
                        id("img_jia").findOne().click();
                        sleep(100);
                    }

                    id("btn_buy").findOne().click();
                    if (clickPerson) {
                        if (isCustom) {
                            for (i = 0; i < buyNum; i++) {
                                var person = personNames[i];
                                click(textContains(person).findOne().text());
                                sleep(50);
                            }
                        } else {
                            var persons = id("text_num").untilFind();//untilFind
                            for (i = 0; i < buyNum; i++) {
                                var person = persons[i];
                                click(person.text());
                                sleep(50);
                            }
                        }
                    }
                    buying = true;
                    text("提交订单").findOne().click();
                    for (i = 0; i < 5; i++) {
                        print("检测[提交订单]按钮ing");
                        var confirm = text("提交订单").findOne();
                        if (confirm !== null) {
                            confirm.click();
                            print("点击提交订单!!");
                            break;
                        }
                        sleep(200);
                    }
                    print("等五秒，如果没结果，那得重新等待回流");
                    for (i = 0; i < 5; i++) {
                        print((5 - i) + "秒之后关闭滑块检测，以优化性能");
                        sleep(1000);
                    }
                } else {
                    print(ticket.text() + "   无票");
                }

            } else {
                print("你预先选择的票是：" + moneyStr);
            }
        });

    });
    if (!buying) {
        back();
        sleep(100);
    }

}    
 