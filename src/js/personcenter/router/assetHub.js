(function() {
    vipspa.start({
        view: "#ui-view",
        router: {
            "/mysum": {
                templateUrl: "mysum/mysum.html",
                constroller: ""
            },
            "/yhq": {
                templateUrl: "yhq/yhq.html",
                controller: ""
            },
            "/vip": {
                templateUrl: "vip/vip.html",
                controller: ""
            },
            "/mysum/jyxx": {
                templateUrl: "mysum/jyxx.html",
                controller: ""
            },
            "/mysum/dbjl": {
                templateUrl: "mysum/jyxx.html",
                controller: ""
            },
            "/mysum/wdjp": {
                templateUrl: "mysum/jyxx.html",
                controller: ""
            },
            "defaults": "/mysum"
        }
    });
})();