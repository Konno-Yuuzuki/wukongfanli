/**
 * Created by Administrator on 2017/7/12.
 */

(function () {
    "use strict"
    var addStyle = function () {
        var param = vipspa.parse().url;
        param = param.split("/", 3)[1];
        console.log(param);
        var $a = $(".asidebar").find("a");
        for (var i = 0; i < $a.length; i++) {
            var a_param = $a.eq(i).attr("href").split("#/", "2")[1];
            //                console.log(a_param);
            if (a_param.indexOf(param) == 0) {
                $a.eq(i).addClass("active");
            } else {
                $a.eq(i).removeClass("active");
            }
        }
    };
    /*当url发生变化时，给相应的菜单栏添加active样式*/
    $(window).on("hashchange", function () {
        addStyle();
    }).on("load", function () {
        addStyle();
    });
    vipspa.start({
        view: "#ui-view",
        router: {
            "/basicinfo": {
                templateUrl: "basicinfo/basicinfo.html",
                controller: "../../js/personcenter/app/basicinfo.js"
            },
            "/safecenter": {
                templateUrl: "safecenter/safecenter.html",
                controller: "../../js/personcenter/app/basicinfo.js"
            },
            "/safecenter/changepwd": {
                templateUrl: "safecenter/view/changepwd.html",
                controller: "../../js/personcenter/app/basicinfo.js"
            },
            "/safecenter/sendemail": {
                templateUrl: "safecenter/view/email_01.html",
                controller: "../../js/personcenter/app/basicinfo.js"
            },
            "/safecenter/getemail": {
                templateUrl: "safecenter/view/email_02.html",
                controller: "../../js/personcenter/app/basicinfo.js"
            },
            "/safecenter/oldtel": {
                templateUrl: "safecenter/view/telephone_01.html",
                controller: "../../js/personcenter/app/basicinfo.js"
            },
            "/safecenter/bindnewtel": {
                templateUrl: "safecenter/view/telephone_02.html",
                controller: "../../js/personcenter/app/basicinfo.js"
            },
            "/txzh": {
                templateUrl: "txzh/cashsetting.html",
                controller: "../../js/personcenter/app/basicinfo.js"
            },
            "/txzh/alipay": {
                templateUrl: "txzh/view/addAlipay.html",
                controller: "../../js/personcenter/app/basicinfo.js"
            },
            "/txzh/bankCard": {
                templateUrl: "txzh/view/bankCard.html",
                controller: "../../js/personcenter/app/basicinfo.js"
            },
            "/bindothers": {
                templateUrl: "bindothers/bindothers.html",
                controller: "../../js/personcener/app/basicinfo.js"
            },
            "defaults": "/basicinfo"
        },
        errorTemplateId: "#error"
    });
})()


