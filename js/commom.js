$(function () {

    // ================================
    // HEADER
    // ================================

    const $header = $('header');
    const $mobileHeader = $('.mobile_header');

    const $sc1 = $('.sc1');
    const $sc3 = $('.sc3');
    const $sc4 = $('.sc4');

    let lastScrollTop = 0;


    $(window).on('scroll', function () {

        const scrollTop = $(window).scrollTop();

        // --------------------------------
        // 스크롤 방향에 따른 헤더 표시
        // --------------------------------

        if (scrollTop > lastScrollTop && scrollTop > 100) {

            // 아래로 스크롤 → 헤더 숨김
            $header.addClass('hide');
            $mobileHeader.addClass('hide');

        } else {

            // 위로 스크롤 → 헤더 표시
            $header.removeClass('hide');
            $mobileHeader.removeClass('hide');

        }


        // --------------------------------
        // SC1을 벗어나면 헤더 숨김 유지
        // --------------------------------

        const sc1Bottom =
            $sc1.offset().top + $sc1.outerHeight();

        if (scrollTop >= sc1Bottom) {

            $header.addClass('hide');
            $mobileHeader.addClass('hide');

        }


        // --------------------------------
        // PC → SC3 진입 시 헤더 변경
        // --------------------------------

        if ($(window).width() > 968) {

            const sc3Top = $sc3[0].offsetTop;

            if (scrollTop >= sc3Top) {

                $header.addClass('on');

            } else {

                $header.removeClass('on');

            }

        }


        // --------------------------------
        // 모바일 → SC4 진입 시 헤더 변경
        // --------------------------------

        if ($(window).width() <= 968) {

            const sc4Top =
                $sc4[0].getBoundingClientRect().top + scrollTop;

            if (scrollTop >= sc4Top) {

                $mobileHeader.addClass('on');

            } else {

                $mobileHeader.removeClass('on');

            }

        }


        lastScrollTop = scrollTop;

    });


    // ================================
    // GOTOP
    // ================================

    const $goTop = $('.gotop_wrap');
    const $footer = $('footer');


    $(window).on('scroll', function () {

        const scrollTop = $(window).scrollTop();

        let changePoint;


        if ($(window).width() <= 968) {

            // 모바일 → SC4보다 550px 먼저 파란색

            const sc4Top =
                $sc4[0].getBoundingClientRect().top + scrollTop;

            changePoint = sc4Top - 550;

        } else {

            // PC → SC3보다 800px 먼저 파란색

            const sc3Top = $sc3[0].offsetTop;

            changePoint = sc3Top - 800;

        }


        // --------------------------------
        // SC3 / SC4 진입 → 파란색
        // --------------------------------

        if (scrollTop >= changePoint) {

            $goTop.addClass('on');

        } else {

            $goTop.removeClass('on');

        }


        // --------------------------------
        // FOOTER 진입 → 다시 흰색
        // --------------------------------

        const footerTop =
            $footer[0].getBoundingClientRect().top;

        if (footerTop <= $(window).height() - 150) {

            $goTop.removeClass('on');

        }

    });


    // ================================
    // MOBILE MENU
    // ================================

    // 햄버거 클릭

    $('.mobile_menu_btn').on('click', function () {

        $('.mobile_menu').addClass('active');
        $(this).addClass('active');

        $('.gotop_wrap').hide();

    });


    // X 버튼 클릭

    $('.mobile_close').on('click', function () {

        $('.mobile_menu').removeClass('active');
        $('.mobile_menu_btn').removeClass('active');

        $('.gotop_wrap').show();

    });


    // 메뉴 클릭

    $('.mobile_menu nav a').on('click', function () {

        $('.mobile_menu').removeClass('active');
        $('.mobile_menu_btn').removeClass('active');

        $('.gotop_wrap').show();

    });

});