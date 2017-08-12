(function() {
    "use strict"
    vipspa.start({
        view: "#ui-view",
        router: {
            "/xtxx": {
                templateUrl: "xtxx/syscenter.html",
                controller: "./app/basicinfo.js"
            },
            "defaults": "/xtxx"
        }
    })
})();