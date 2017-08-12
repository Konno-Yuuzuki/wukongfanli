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
                templateUrl: "./view/db_detail.html",
                controller: "../js/1ydb/db_detail.js"
            },
            "defaults": "/all"
        }
    })
})()