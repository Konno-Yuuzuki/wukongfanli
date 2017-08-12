(function () {
    "use strict"
    /*ajax数据请求*/
    var $ajax = function (url, callback) {
        $.ajax({
            url: url,
            type: "POST",
            dataType: "json",
            success: callback,
        })
    }
})();