$(function(){
  gsap.registerPlugin(ScrollTrigger);
  const mm = gsap.matchMedia();

  ScrollTrigger.config({
    ignoreMobileResize: true
});


  // 2. 모바일 브라우저 주소창 높이 변화를 무시하고 뷰포트 고정
  // ScrollTrigger.normalizeScroll(true);
  

  // 내부 컨테이너의 별도 스크롤(가로 스크롤) 허용
//   ScrollTrigger.normalizeScroll({
//   allowNestedScroll: true 
// });



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


  // 스와이퍼
  var swiper1 = new Swiper('.intro_swiper', {
        simulateTouch: true,
        autoplay: {
          delay: 8000,
        },
        loopedSlides: 3,
        loop: true,
        // spaceBetween: 30,
        effect: 'fade',
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
  

 mm.add("(min-width: 426px)", () => {

  // ========== why ==========
  const whytl = gsap.timeline({
    scrollTrigger: {
      trigger: '.why',
      start: 'top 60%',         
      toggleActions: 'play none none reverse', 
    }
  });

  whytl
    .from('.why .txt_box h2', {
      y: 70,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    })
    .from('.why .txt_box p:nth-child(2)', {
      y: 70,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    })
    .from('.why .txt_box p:nth-child(3)', {
      y: 70,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    })
    .from('.why .txt_box p:nth-child(4)', {
      y: 70,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    })
    .from('.why .txt_box .btn', {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    }, "<0.5");

  // ========== circle ==========
  const circletl = gsap.timeline({
    scrollTrigger: {
      trigger: '.circle',
      start: 'top 80%',         
      toggleActions: 'play none none reverse', 
    }
  });

  circletl
    .from('.circle h2', {
      y: 70,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    })
    .from('.circle .circle_slide', {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    }, "<0.5");

});


  let currentIndex = 0;
  const totalCount = $('.tab_circle .txtbox').length; // 총 슬라이드 개수 (4개)
  const duration = 3000; // 전환 간격 (3.5초 = 3500ms)
  let autoSlideTimer = null;

  // 1. 공통 슬라이드 전환 함수
  function showSlide(index) {
    // 텍스트 박스 및 숫자 버튼 활성화 (.on 부여)
    $('.tab_circle .txtbox').removeClass('on');
    $('.tab_circle .txtbox').eq(index).addClass('on');

    // 도넛 모양 이미지 페이드 전환
    $('.circlelitem_rwap .circle_img')
      .stop(true, true)
      .fadeOut(500)
      .removeClass('on');

    $('.circlelitem_rwap .circle_img')
      .eq(index)
      .stop(true, true)
      .fadeIn(500)
      .addClass('on');

    // 현재 인덱스 업데이트
    currentIndex = index;
  }

  // 2. 다음 슬라이드로 넘어가는 함수 (1 -> 2 -> 3 -> 4 -> 1 순환)
  function nextSlide() {
    let nextIndex = (currentIndex + 1) % totalCount;
    showSlide(nextIndex);
  }

  // 3. 자동 롤링 시작 함수
  function startAutoSlide() {
    if (autoSlideTimer !== null) clearInterval(autoSlideTimer);
    autoSlideTimer = setInterval(nextSlide, duration);
  }

  // 4. 숫자 버튼(span) 클릭 이벤트
  $('.tab_circle .txtbox span').on('click', function () {
    const $thisBox = $(this).closest('.txtbox');
    const idx = $('.tab_circle .txtbox').index($thisBox);

    // 이미 보고 있는 번호면 무시
    if (idx === currentIndex) return;

    // 해당 번호 슬라이드로 즉시 전환
    showSlide(idx);

    // 사용자가 직접 눌렀으므로 타이머를 새로 리셋하여 3.5초 카운트 재시작
    startAutoSlide();
  });

  // 페이지 진입 시 자동 재생 시작
  startAutoSlide();



  // ========== together ==========
   const togethertl = gsap.timeline({
    scrollTrigger: {
    trigger: '.together',
    start: 'top 80%',         
    toggleActions: 'play none none reverse', 
    // markers: true
   }
  });
  togethertl.from('.together h2', {
        y: 70,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    })
  .from('.together .cardbox .card:nth-child(1)', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    })
  .from('.together .cardbox .card:nth-child(2)', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    },"<0.3")
  .from('.together .cardbox .card:nth-child(3)', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    },"<0.3")



 // ========== gift ==========
 $('.gift').click(function() {
    // 클릭 시 지정한 html 파일로 이동
    window.location.href = 'sub_2.html';
  });

mm.add("(min-width: 769px)", () => {
  const gifttl = gsap.timeline({
    scrollTrigger: {
      trigger: '.gift',
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    }
  });

  gifttl
    .from('.gift h2', {
      y: 70,
      opacity: 0,
      duration: 1,
      ease: 'power2.out'
    })
    .from('.gift .giftlist', {
      y: 70,
      opacity: 0,
      delay: 0.1,
      duration: 1,
      ease: 'power2.out'
    });
});

// 2. 모바일/태블릿 화면 (768px 이하): 세로 카드 각각 스크롤 도달 시 개별 노출
mm.add("(max-width: 768px)", () => {
  // 제목 애니메이션
  gsap.from('.gift h2', {
    scrollTrigger: {
      trigger: '.gift h2',
      start: 'top 85%',
      toggleActions: 'play none none reverse',
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    ease: 'power2.out'
  });

  // 각 카드(.giftlist)마다 개별 ScrollTrigger를 걸어 차례대로 등장
  gsap.utils.toArray('.gift .giftlist').forEach((card) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%', // 화면 아래에서 카드가 15% 정도 올라왔을 때 등장
        toggleActions: 'play none none reverse',
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out'
    });
  });
});


  // ========== change ==========
  const changetl = gsap.timeline({
    scrollTrigger: {
    trigger: '.change',
    start: 'top 80%',         
    toggleActions: 'play none none reverse', 
    // markers: true
   }
  });
  changetl.from('.change h2', {
        y: 70,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    })

  .from('.change .btn', {
        y: 70,
        opacity: 0,
        delay: 0.1,
        duration: 1,
        ease: 'power2.out'
    },"<0.3")
    

  var swiper2 = new Swiper('.change_swiper', {
        simulateTouch: true,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 3000,
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      });

      ScrollTrigger.refresh();
});