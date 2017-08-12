console.log("1111");

$(document).ready(function () {
    $(".jqzoom").imagezoom();
    $("#thumblist li a").click(function () {
        //增加点击的li的class:tb-selected，去掉其他的tb-selecte
        $(this).parents("li").addClass("tb-selected").siblings().removeClass("tb-selected");
        //赋值属性
        $(".jqzoom").attr('src', $(this).find("img").attr("mid"));
        $(".jqzoom").attr('rel', $(this).find("img").attr("big"));
    });
});