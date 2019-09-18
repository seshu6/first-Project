/* Menu ScrollTop */
$(document).ready(function () {
    $(window).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll < 100) {
            $('.fixed-top').css("background", "transparent");
        }
        else {
            $('.fixed-top').css("background", "rgba(38,52,91,1)");
            if (scroll > 400) {
                $(".scrollTop").css("opacity", "1");
            }
            else {
                $(".scrollTop").css("opacity", "0");
            }
        }
    });

    $(".scrollTop a").click(function () {
        $("html, body").animate({ scrollTop: 0 }, 800);
    });

    $('.carousel').carousel();

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

    // $('.list-cop').on("click", "a", function () {
    //     $('.list-cop-dropdown').toggle();
    // });
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
    
    $('.walletlist-slider').owlCarousel({ animateOut: 'fadeOut', items: 1, loop: true, nav: true, margin: 0, smartSpeed: 450, autoplay: true, autoplayTimeout: 2000, themeClass: 'owl-theme3' });
    $('.walletlist-slider').owlCarousel({ animateOut: 'fadeOut', items: 1, loop: true, nav: true, margin: 0, smartSpeed: 450, autoplay: true, autoplayTimeout: 2000, themeClass: 'owl-theme3' });
    $('.fadeOut').owlCarousel({ animateOut: 'fadeOut', items: 1, loop: true, nav: true, margin: 0, smartSpeed: 450, autoplay: true, autoplayTimeout: 2000, themeClass: 'owl-theme' });

    $('.collapse').on('shown.bs.collapse', function () {
        $(this).parent().addClass('active');
    });

    $('.collapse').on('hidden.bs.collapse', function () {
        $(this).parent().removeClass('active');
    });

    $(this).on("click", function () {
        // $(".dropdown-list-search").hide();
        // $(".dropdown-list-search2").hide();
    });

});

