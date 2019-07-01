/* Menu ScrollTop */
$(document).ready(function () {
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll < 150) {
            $('.fixed-top').css("background", "transparent");
        }
        else {
            $('.fixed-top').css("background", "rgba(38,52,91,1)");
        }
    });



    var scrollTop = $(".scrollTop");
    $(window).scroll(function () {
        var toppos = $(this).scrollTop();
        if (toppos > 200) {
            $(scrollTop).css("opacity", "1");
        }
        else {
            $(scrollTop).css("opacity", "0");
        }
    });
    $(".scrollTop a").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 800);
    });
    /* Search List */
    $(".search-mandory-list li.monthlist").on("click", function (event) {
        $(".dropdown-toggle1").toggleClass('searchtoggleactive');
        event.stopPropagation();
        $(".dropdown-list-search").toggle();

    });
    $(".dropdown-list-search").on("click", function (event) {
        event.stopPropagation();
    });
    // $(".search-mandory-list li ul li").on("click", function (event) {
    //     var text = $(this).find("a").text();
    //     $(this).parents(".monthlist").find("a.dropdown-toggle1").text(text);
    //     $(".dropdown-list-search").hide();
    // });
    $('.carousel').carousel();

    $(".search-mandory-list li.ethbtclist").on("click", function (event) {
        $(".dropdown-toggle2").toggleClass('searchtoggleactive');
        event.stopPropagation();
        $(".dropdown-list-search2").toggle();

    });
    $(".dropdown-list-search2").on("click", function (event) {
        event.stopPropagation();
    });

    $('.fastbuy').click(function () {
        $('.fastbuy').addClass('active');
        $('#fastbuyview').show();
        $('.fastsell').removeClass('active');
        $('#fastsellview').hide();
    });
    $('.fastsell').click(function () {
        $('.fastsell').addClass('active');
        $('#fastsellview').show();
        $('.fastbuy').removeClass('active');
        $('#fastbuyview').hide();
    });

    $('.list-cop').on("click", "a", function () {
        $('.list-cop-dropdown').toggle();
    });
    $('.list-cop1').on("click", "a", function () {
        $('.list-cop-dropdown').toggle();
    });

    $('.select-group-pay').on("click", "a", function () {
        $('.payment-method').toggle();
    });
    $('.droplist-fastbuy1').on("click", "a", function () {
        $('.pay-methd-1').toggle();
    });

    $('.select-payment-method').on("click", "a", function () {
        $('.list-type-method').toggle();
    });

    $('.notify-icon').click(function () {
        $('.notification-view').slideToggle();
    });

    $('.bitoicnlink').click(function () {
        $('.coin-list-view').toggle();
    });
    $('.bitoicnlink1').click(function () {
        $('.coin-list-view1').toggle();
    });

    $("#boxscroll").niceScroll({ cursorborder: "", cursorcolor: "#26325d" });
    $("#boxscroll1").niceScroll({ cursorborder: "", cursorcolor: "#26325d" });
    $("#activyscroll").niceScroll({ cursorborder: "", cursorcolor: "#abb3d0", cursorwidth: '6px', background: "#e5e7ef", autohidemode: false });
    $("#activyscroll1").niceScroll({ cursorborder: "", cursorcolor: "#abb3d0", cursorwidth: '6px', background: "#e5e7ef", autohidemode: false });
    $('.walletlist-slider').owlCarousel({ animateOut: 'fadeOut', items: 1, loop: true, nav: true, margin: 0, smartSpeed: 450, autoplay: true, autoplayTimeout: 2000, themeClass: 'owl-theme3' });
    $("#activyscroll").niceScroll({ cursorborder: "", cursorcolor: "#abb3d0", cursorwidth: '6px', background: "#e5e7ef", autohidemode: false });
    $("#transferscroll").niceScroll({ cursorborder: "", cursorcolor: "#abb3d0", cursorwidth: '6px', background: "#e5e7ef", autohidemode: false });
    $('.walletlist-slider').owlCarousel({ animateOut: 'fadeOut', items: 1, loop: true, nav: true, margin: 0, smartSpeed: 450, autoplay: true, autoplayTimeout: 2000, themeClass: 'owl-theme3' });
    $('.fadeOut').owlCarousel({ animateOut: 'fadeOut', items: 1, loop: true, nav: true, margin: 0, smartSpeed: 450, autoplay: true, autoplayTimeout: 2000, themeClass: 'owl-theme' });

});
$(document).on("click", function () {
    $(".dropdown-list-search").hide();
});
$(document).on("click", function () {
    $(".dropdown-list-search2").hide();
});

$(document).ready(function () {
    $('.collapse').on('shown.bs.collapse', function () {
        $(this).parent().addClass('active');
    });

    $('.collapse').on('hidden.bs.collapse', function () {
        $(this).parent().removeClass('active');
    });
});

