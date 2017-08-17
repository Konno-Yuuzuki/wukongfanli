(function () {
    "use strict"
    vipspa.start({
        view: "#goods",
        router: {
            "/all": {
                templateUrl: "./view/1ydb_all.html",
                controller: ""
            },
            "/goods": {
                templateUrl: "./view/1ydb_detail.html",
                controller: "../js/1ydb/db_detail.js"
            },
            "zxjx": {
                templateUrl: "./view/1ydb_zxjx.html",
                controller: ""
            },
            "defaults": "/all"
        }
    })
})()