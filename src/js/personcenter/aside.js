(function () {
    "use strict"
    var addStyle = function () {
        var param = vipspa.parse().url;
        param = param.split("/", 3)[1];
        // console.log(param);
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
})();
