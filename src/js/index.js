(function () {
    "use strict"

    /*slide*/
    function slide() {
        var i = 0;
        var timer = null;
        for (var j = 0; j < $('.img li').length; j++) { //创建圆点
            $('.num').append('<li></li>')
        }
        $('.num li').first().addClass('active'); //给第一个圆点添加样式
        var firstimg = $('.img li').first().clone(); //复制第一张图片
        $('.img').append(firstimg).width($('.img li').length * ($('.img img').width())); //将第一张图片放到最后一张图片后，设置ul的宽度为图片张数*图片宽度
        // 下一个按钮
        $('.next').click(function () {
            i++;
            if (i == $('.img li').length) {
                i = 1; //这里不是i=0
                $('.img').css({
                    left: 0
                }); //保证无缝轮播，设置left值
            }
            $('.img').stop().animate({
                left: -i * 740
            }, 500);
            /*设置小圆点指示*/
            if (i == $('.img li').length - 1) {
                $('.num li').eq(0).addClass('active').siblings().removeClass('active');
            } else {
                $('.num li').eq(i).addClass('active').siblings().removeClass('active');
            }
        });
        // 上一个按钮
        $('.prev').click(function () {
            i--;
            if (i == -1) {
                i = $('.img li').length - 2;
                $('.img').css({
                    left: -($('.img li').length - 1) * 740
                });
            }
            $('.img').stop().animate({
                left: -i * 740
            }, 500);
            $('.num li').eq(i).addClass('active').siblings().removeClass('active');
        })
        //鼠标划入圆点
        $('.num li').click(function () {
            var _index = $(this).index();
            $('.img').stop().animate({
                left: -_index * 740
            }, 500);
            $('.num li').eq(_index).addClass('active').siblings().removeClass('active');
        });
        //定时器自动播放
        timer = setInterval(function () {
            $(".next").click();
        }, 3000);
        //鼠标移入，暂停自动播放，移出，开始自动播放
        $('.slide').hover(function () {
            $("div.btn").show();
            clearInterval(timer);
        }, function () {
            $("div.btn").hide();
            timer = setInterval(function () {
                $(".next").click();
            }, 3000);
        });
    };
    slide();

    /*话费、流量、油卡过度效果*/
    function service() {
        var timer = null;
        $(".services span").click(function () {
            clearTimeout(timer);
            var nextNum = $(this).index();
            var leftWidth = -nextNum * 208 + "px";
            $(".services span").removeClass('active');
            $(this).addClass('active');
            timer = setTimeout(function () {
                $("#ser_detail_slide").animate({
                    "left": leftWidth
                }, "fast");
            });
        });
        $("#ser_detail_slide i").on("click", function () {
            $(this).prev().click();
        })
        /*油卡类选择*/
        $("#yk_tel").on("click", function () {
            var that = $(this);
            $(".oil-list").show().children().on("click", function () {
                console.log($(this).html());
                console.log(that.prev("label").html());
                if ($(this).html() == "中国石油") {
                    that.prev().html("石油");
                } else {
                    that.prev().html("石化");
                }
                $(this).parent().hide();
                that.focus();
            });
        });
        /*面值选择*/
        $("input.cost").on("click", function () {
            var that = $(this);
            var $target = $("." + that.data("target"));
            console.log($target);
            $target.show().children().children().children().click(function () {
                console.log($(this).html());
                that.val($(this).html());
                $(this).parent().parent().parent().hide();
            });
        });
    };
    service();

    /*活动精选*/
    function hdjx() {
        $.ajax({
            url: "../data/specialevents.json",
            type: "GET",
            dataType: "json",
            success: function (_data) {
                var reponse_data = {};
                reponse_data.hdjx = _data;
                var hdjx = template("hdjx", reponse_data);
                $("#hdjx_content").append(hdjx);
            }
        })
    };
    hdjx();

    /*限时秒杀*/
    function xsms() {
        var currentTime = new Date().getHours();
        var $activeTime = $(".sm-time");

        /*隐藏限时秒商品列表*/
        function xsms_reset() {
            for (var i = 0; i < $activeTime.length - 1; i++) {
                $activeTime.eq(i).siblings().hide();
            }
        }

        /*当前限时秒内容*/
        function xsms_current() {
            xsms_reset();
            for (var i = 0; i < $activeTime.length - 1; i++) {
                $activeTime.eq(i).removeClass('active');
                var _activeTimer = Number($activeTime.eq(i).html().slice(0, 2));
                if (currentTime < Number($activeTime.eq(0).html().slice(0, 2))) {
                    $activeTime.eq(0).parent().addClass('active').find('ul').show();
                } else if (currentTime === _activeTimer || currentTime === (_activeTimer + 1)) {
                    $activeTime.eq(i).parent().addClass('active').find('ul').show();
                }
            }
        }

        xsms_current();

        $activeTime.parent().on("mouseover", function (event) {
            var _currentTarget = $(event.currentTarget);
            if (7 != _currentTarget.find("a").data("index")) {
                xsms_reset();
                _currentTarget.find('ul').show();
            }
        });
        $activeTime.parent().on("mouseleave", function (event) {
            xsms_current();
        });
    }


    xsms();

})();