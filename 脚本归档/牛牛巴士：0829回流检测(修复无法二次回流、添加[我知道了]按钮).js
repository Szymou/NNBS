auto.waitFor();
app.launchApp("大麦");
console.show();
console.setPosition(100,100)
console.setTitle("牛牛巴士：回流检测","#ff11ee00",30);
console.setLogSize(10);
console.setMaxLines(500);
//console.setBackgroud("#33ef0000");
console.setSize(700, 1000);
console.setCanInput(false);
/**********脚本免费，偷脚本去卖的小人，全家生大病。没骂过人，不好意思，说这么粗鲁的话。，***********/ 

/************更多最新脚本，欢迎进群604964470了解，验证信息填写：在哪里看到本脚本****************/
/***
牛牛巴士APP：
1.某麦抢票消息、波泼页码生成、JJ20扫文识字搜答案；
2.某麦模拟点击脚本已完成；优先购脚本、滑块脚本正在拟测中...
https://wwxz.lanzouw.com/b0aug8sjc
密码：9alc
***/
//本脚本是通过github大神们的脚本，模仿写出，用来学习使用

/******************[回流检测设置start]*******************/ 
//如果需要指定周几的场次，就填周几，如我想检测周六的，那就" 周六"
var dateStrs= [""];//默认循环所有场次
//var dateStrs= ["周五", "周日"];//指定场次
var moneyStr = "元";//默认选择价位最低，如果想等980的回流，那就填"980元"
var listenDelay = 500;//点击间隔时间
var buyNum = 1;//买几张票。不指定观影人，默认顺序选择；如果需要指定，请看下方参数
//[高级设置]
var isCustom = false;//默认为false表示下方指定姓名的参数不生效，如果需要生效，则改为true
var personNames = ["杨", "叶", "刘", "宗"];//指定观影人，买几张票就写几个人的名字

/*************[努力刷新]按钮设置*********/
var freshBtnReconize= "努力刷新";

/*************[我知道了]按钮设置*********/
var iKnowBtnReconize= "我知道了";//后期优化成数组

/*************[滑块模拟滑动]设置*********/
//步骤一：定义滑块标识
var reconizeSliper = "向右滑动验证";
//var reconizeSliper = "法语音乐剧";//用于测试，这里"厂牌号"是APP中"话剧音乐剧"模块内的一个标识
//步骤二：根据手机情况定义滑块偏移量
//滑块横坐标偏移量
var offsetX = 25;
//滑块纵坐标偏移量
var offsetY = 0;
//步骤三：根据手机情况设置滑块的滑动距离
var swipeLength = 2000;
//步骤四：设置多少毫秒内滑完滑块
var swipeTime = 100
/*************[滑块模拟滑动]设置结束*********/



/******************自动点击[努力刷新]按钮程序*******************/
function jumpFreshBtu(reconizeFlag){
    threads.start(
        function(){
            while(true){
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
function sliperFunc(){
    //清屏函数
    var loopT = 1;
    //找到滑块
    var findSliper = false;

    //浮窗指示器
    var logThreads = threads.start(
        function(){
            while(true){    
                if(findSliper) continue;
                print("牛牛巴士");
                print("检测滑块标识(" + reconizeSliper + ")ing：" + (loopT++) + "次");
                sleep(1000);
                if(loopT%20==0){
                    //print("清屏，放内存")
                    //console.clear()
                }
            }
        }
    )

//检测滑块方式一：假如命中滑块
    threads.start(
        function(){
            while(true){
                var tt = textContains(reconizeSliper).findOne();
                //var tt = id("nc_1__scale_text").findOne();
                findSliper = true;  
                var x = tt.bounds().left
                var y = tt.bounds().centerY()
                print("找到滑块坐标(" + x + "," + y + ")");
                print("尝试滑动");        
                swipe(x+offsetX, y+offsetY, x+swipeLength, y+offsetY, swipeTime);
                sleep(500)
                findSliper=false
            }
        }
    )
}
/******************结束：滑块程序:模拟滑动*******************/ 


/******************回流检测逻辑*******************/ 
for(;;){
    dateStrs.forEach(function(dateStr){
        var dates = textContains(dateStr).untilFind();
        dates.forEach(function(date){
            click(date.text());
            var tickets = textContains("元").find();//untilFind
            var ticketNulls = text("缺货登记").find();//untilFind
            if((tickets.length == ticketNulls.length)){
               print("牛牛巴士：" + date.text() + "->无回流票");
               if(dates.length ==1){
                   sleep(200);
                   loopTickets(tickets);
               }
            }else{
               print("牛牛巴士：" + date.text() + "->有回流票");
               loopTickets(tickets);
            }
          sleep(listenDelay);
        });
        toast("牛牛巴士：努力加载回流中...");
        print("循环ing");
    });
}
function loopTickets(tickets){
    tickets.forEach(function(ticket){
                 print(ticket.text());  
                 click(ticket.text());
                 sleep(200);
                 var label = text("价格明细").find();
                         
                 if(ticket.text().includes(moneyStr)){
                       if(label.length == 1){
                         print("有票的");   
                          //按钮检测
                         jumpFreshBtu(iKnowBtnReconize);
                         jumpFreshBtu(freshBtnReconize);
                         //滑动检测开始
                        sliperFunc();  
                     
                         for(i = 1; i < buyNum; i++){
                             id("img_jia").findOne().click();
                             sleep(100);
                         }    
                         id("btn_buy").findOne().click();
                         if(isCustom){
                             for(i = 0; i < buyNum; i++){
                                 var person = personNames[i];
                                 click(textContains(person).findOne().text());                 
                                 sleep(50);
                             }
                         }else{
                             var persons = id("text_num").untilFind();//untilFind
                             for(i = 0; i < buyNum; i++){
                                 var person = persons[i];
                                 click(person.text());
                                 sleep(50);
                             }     
                         }
                            
                     
                         //text("提交订单").findOne().click();
                         for(i = 0; i < 5; i++){
                             print("检测[提交订单]按钮");
                             var confirm = text("提交订单").findOne();
                             if(confirm !== null){
                                 confirm.click();
                                 print("点击提交订单");
                                 break
                             }
                             sleep(200);
                         }
                   
                     }
                 }else{
                    print("你预先选择的票是：" + moneyStr);
                 }
               
               });
    
}    
 