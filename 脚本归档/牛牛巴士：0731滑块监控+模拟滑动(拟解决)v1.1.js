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

//本脚本单独执行，模拟点击脚本也单独执行

//步骤一：定义滑块标识
var reconizeSliper = "向右滑动验证";
//var reconizeSliper = "厂牌号";//用于测试，这里"厂牌号"是APP中"话剧音乐剧"模块内的一个标识

//步骤二：根据手机情况定义滑块偏移量
//滑块横坐标偏移量
var offsetX = 20;
//滑块纵坐标偏移量
var offsetY = 0;

//步骤三：根据手机情况设置滑块的滑动距离
var swipeLength = 800;

//步骤四：设置多少毫秒内滑完滑块
var swipeTime = 300


//以上变量需要自己定义
/************************************************************************/
//以下程序不需要动

//清屏函数
var loopT = 1;
//找到滑块
var findSliper = false;

//浮窗指示器
var logThreads = threads.start(
    function(){
        while(!findSliper){
            print("牛牛巴士");
            print("检测滑块标识(" + reconizeSliper + ")ing：" + (loopT++) + "次");
            sleep(200);
            if(loopT%3==0){
                //print("清屏，放内存")
                console.clear()
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
         
            //var x = tt.bounds().centerX()
            //var y = tt.bounds().centerY()
            var x = tt.bounds().left
            var y = tt.bounds().centerY()
            print("找到滑块坐标(" + x + "," + y + ")尝试滑动")
            findSliper = true;          
            swipe(x+offsetX, y+offsetY, x+swipeLength, y+offsetY, swipeTime);
            sleep(2000)
            findSliper=false
            
            threads.start(
                function(){
                    while(!findSliper){
                    print("牛牛巴士");
                    print("检测滑块标识(" + reconizeSliper + ")ing：" + (loopT++) + "次");
                    sleep(200);
                    if(loopT%3==0){
                        //print("清屏，放内存")
                        console.clear()
                        }
                    }
                }
            )
            }
        }
    )


