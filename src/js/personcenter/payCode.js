/**
 * Created by Administrator on 2017/7/10.
 */

"use strict"
function importPaypwd(ele) {
    var $paypwd = $(ele),
        _input = $paypwd.find("input[type='password']"),
        _i = $paypwd.find("i"),
        _b = $paypwd.find("b"),
        k = 0;
    //当点击隐藏input时，让6个显示密码的框的第一个显示光标
    _input.on("focus", function () {
        if ($paypwd.attr("data-busy") === "0") {
            _i.eq(k).addClass("active");
            $paypwd.attr("data-busy", "1");
        }
    });
    //当隐藏input中的值发生变化时，改变光标的位置
    _input.on("change", function () {
        _i.eq(k).removeClass("active");
        $paypwd.attr("data-busy", "0");
    }).on("blur", function () {
        _i.eq(k).removeClass("active");
        $paypwd.attr("data-busy", "0");
    });
    //通过keyup绑定键盘事件
    _input.on("keyup", function (event) {
        var event = event || window.event,
            keyCode = event.keyCode,
            j = _i.length;
        //输入框中只能输入数字
        if (keyCode == 8 || (keyCode > 47 && keyCode < 58) || (keyCode > 95 && keyCode < 106)) {
            k = $(this).val().length;
            for (; j--;) {
                if (j === k) {
                    _i.eq(j).addClass("active");
                    _b.eq(j).css({"visibility": "hidden"});
                } else {
                    _i.eq(j).removeClass("active");
                    _b.eq(j).css("visibility", j < k ? "visible" : "hidden");
                }
            }
        } else {
            //当用户输入其他字符时，将其清除
            var _inputValue = $(this).val();
            this.value = _inputValue.replace(/\D/g, '');
        }
    });
}
