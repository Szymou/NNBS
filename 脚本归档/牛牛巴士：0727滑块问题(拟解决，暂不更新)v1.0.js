auto.waitFor();
app.launchApp("大麦");
console.show();
//欢迎进群604964470，一起学习、讨论

//本脚本单独执行，模拟点击脚本也单独执行

//步骤一：定义滑块标识
var reconizeSliper = ">>";
//var reconizeSliper = "厂牌号";//用于测试，这里"厂牌号"是APP中"话剧音乐剧"模块内的一个标识

//步骤二：根据手机情况定义滑块偏移量
//滑块横坐标偏移量
var offsetX = 0;//如果能识别出滑块的标识是>>，那此处就不需要修改
//如果滑块标识不是>>
//那就需要找到滑块上面的文字"验证通过后可继续正常访问哦"作为检测标识
//然后添加偏移量，找到滑块。这个不同手机屏幕分辨率不一样，需要自己测试
var offsetY = 150;

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
            var tt = text(reconizeSliper).findOne();
            var x = tt.bounds().centerX();
            var y = tt.bounds().centerY();
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


