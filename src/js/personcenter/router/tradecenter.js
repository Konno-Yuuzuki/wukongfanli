(function() {
    "use strict"
    vipspa.start({
        view: "#ui-view",
        router: {
            "/myorder": {
                templateUrl: "order/myorder.html",
                controller: "./app/basicinfo.js"
            },
            "/address": {
                templateUrl: "shdz/address.html",
                controller: "./app/basicinfo.js"
            },
            "/collections": {
                templateUrl: "wdsc/collections.html",
                controller: "./app/basicinfo.js"
            },
            "/collections/mystores": {
                templateUrl: "wdsc/mystores.html",
                controller: "../personcenter/app/basicinfo.js"
            },
            "defaults": "/myorder"
        }
    })
})();