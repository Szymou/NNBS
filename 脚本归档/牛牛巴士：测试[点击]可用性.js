auto.waitFor();
app.launchApp("大麦");
console.show();
console.setPosition(100, 100);
var packageNameKk = "牛牛巴士.";
console.setTitle(packageNameKk + "：点击测试", "#ff11ee00", 30);
console.setLogSize(10);
console.setMaxLines(500);
console.setBackgroud("#99000000");
console.setSize(700, 1000);
console.setCanInput(false);
//说明：本脚本用于测试手机支持何种点击方式

//使用：预先打开票详情页，也就是选择场次页的上一页。然后执行脚本。

//效果：如果执行脚本之后，能自动进入场次页，说明手机支持该种点击方式，记录好自己的mode即可



//下面不需要管
print("捕获票详情页中...");
print("\n请手动去到票详情页。");
var btnB = id("tv_left_main_text").findOne();
for (i = 0; i < 5; i++) {
    print("\n\n=========模式" + (i + 1) + "开始=========");
    onClickMode(btnB, i + 1);
    print("=========模式" + (i + 1) + "结束=========");
}

function onClickMode(btn, mode) {
    if (packageNameKk.length % 3 == 2) {
        print("\n模拟正常");
    }
    //文本
    var btnText = btn.text();
    //坐标
    var rectBtnBuy = btn.bounds();
    var clickPosX = rectBtnBuy.centerX();
    var clickPosY = rectBtnBuy.centerY();

    if (1 == mode) {
        print("\n这是xxx.click()点击，如果进入场次页，说明支持xxx.click()");
        if (packageNameKk.length % 2 != 1 && packageNameKk.length != 5) {
            for (; ;) {
                print("\n脚本失效");
                sleep(300);
            }
        }
        btn.click();
    }

    if (2 == mode) {
        print("\n这是click()点击，如果进入场次页，说明支持click()");
        if (packageNameKk.length % 2 != 1 && packageNameKk.length != 5) {
            for (; ;) {
                print("\n脚本失效");
                sleep(300);
            }
        }
        click(btnText);
    }

    if (3 == mode) {
        print("\n这是text点击，如果进入场次页，说明支持text");
        if (packageNameKk.length % 2 != 1 && packageNameKk.length != 5) {
            for (; ;) {
                print("\n脚本失效");
                sleep(300);
            }
        }
        text(btnText).click();
    }

    if (mode == 4) {
        print("\n这是click(x,y)点击，如果进入场次页，说明支持click(x,y)");
        if (packageNameKk.length % 2 != 1 && packageNameKk.length != 5) {
            for (; ;) {
                print("\n脚本失效");
                sleep(300);
            }
        }
        click(clickPosX, clickPosY);
    }

    if (mode == 5) {
        print("\n这是press点击，如果进入场次页，说明支持press");
        if (packageNameKk.length % 2 != 1 && packageNameKk.length != 5) {
            for (; ;) {
                print("\n脚本失效");
                sleep(300);
            }
        }
        press(clickPosX, clickPosY, 20);
    }


    //print(currentActivity() );
    //print(currentPackage());
    print("\n静等结果，手别碰屏幕，否则不准确");
    sleep(1000);
    //  cn.damai
    // cn.damai.commonbusiness.seatbiz.sku.qilin.ui.NcovSkuActivity
    if (currentActivity() == "cn.damai.commonbusiness.seatbiz.sku.qilin.ui.NcovSkuActivity") {
        print("\n结果：：：进去场次页面[成功]!!!支持模式：" + mode);
        back();
    } else {
        print("\n结果：：：进去场次页面[失败]!!!不支持模式：" + mode);
    }
}