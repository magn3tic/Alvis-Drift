(function ($) {

    jQuery(document).ready(function($) {
        $(".mobile-menu-wrap li.drop-menu > span").on("click", function() {
            const $submenu = $(this).parent().children("ul");

            if ($submenu.hasClass("open")) {
                $submenu.removeClass("open");
            } 
            else {
                $(".mobile-menu-wrap li.drop-menu ul.open").removeClass("open");
                $submenu.addClass("open");
            }
        });
    });

    jQuery(document).ready(function($) {
        $(".hamburger").on("click", function() {
            $("body").toggleClass("menu-act");
        });
    });

    jQuery(document).ready(function ($) {
        $(".rewards-carousel").slick({
            dots: false,
            arrows: false,
            speed: 5000,
            autoplay: true,
            autoplaySpeed: 0,
            cssEase: 'linear',
            slidesToShow: 5,
            slidesToScroll: 1,
            infinite: true,
            swipeToSlide: true,
            centerMode: true,
            focusOnSelect: true,
            variableWidth: true,
            responsive: [
                {
                    breakpoint: 750,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 2,
                    }
                }
            ]
        });
    });

    $('.ts-slider').slick({
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: $('.ts-slide-nav-prev'),
    nextArrow: $('.ts-slide-nav-next'),
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 500,    
    responsive: [
        {
        breakpoint: 1024,
        settings: {
            slidesToShow: 2,
            arrows: false,
            dots: true,
        }
        },
        {
        breakpoint: 600,
        settings: {
            slidesToShow: 1,
            arrows: false,
            dots: true,
        }
        },
        {
        breakpoint: 480,
        settings: {
            slidesToShow: 1,
            arrows: false,
            dots: true,
        }
        }
    ]
    });

    $('.sale-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 500,    
        prevArrow: $('.slide-nav-prev'),
        nextArrow: $('.slide-nav-next'),        
    });    

    jQuery(document).ready(function ($) {
    $(".acc-wrap").each(function () {
        if (!$(this).hasClass("act")) {
        $(this).find(".acc-content").hide();
        } else {
        $(this).find(".acc-content").show();
        }
    });

    $(".acc-head").on("click", function () {
        var $thisWrap = $(this).closest(".acc-wrap");

        if ($thisWrap.hasClass("act")) {
        $thisWrap.removeClass("act").find(".acc-content").slideUp(300);
        } else {
        $(".acc-wrap").removeClass("act").find(".acc-content").slideUp(300);
        $thisWrap.addClass("act").find(".acc-content").slideDown(300);
        }
    });
    });

})(jQuery);

document.addEventListener('DOMContentLoaded', function() {
    const tabLinks = document.querySelectorAll('.wr-filter a');
    const tabContents = document.querySelectorAll('.wr-tabs');

    if (tabLinks.length > 0) {
        tabLinks[0].classList.add('active');
        const firstId = tabLinks[0].getAttribute('href');
        document.querySelector(firstId)?.classList.add('active');
    }

    function activateTab(targetId) {
        tabLinks.forEach(l => l.classList.remove('active'));
        tabContents.forEach(tab => tab.classList.remove('active'));

        const targetLink = document.querySelector(`.wr-filter a[href="${targetId}"]`);
        targetLink?.classList.add('active');

        document.querySelector(targetId)?.classList.add('active');
    }

    tabLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            activateTab(targetId);
        });
    });

    const tabImages = document.querySelectorAll('.tab-img img[data-target]');
    tabImages.forEach(img => {
        img.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            if (targetId) {
                activateTab(targetId);
            }
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('.stabs button');
  const tabContents = document.querySelectorAll('.stabs-content > div[data-tab]');

  if (tabButtons.length === 0 || tabContents.length === 0) return;

  // Reset all tabs and contents
  function resetTabs() {
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
  }

  // Activate a specific tab
  function activateTab(tabId) {
    resetTabs();
    const button = document.querySelector(`.stabs button[data-tab="${tabId}"]`);
    const content = document.querySelector(`.stabs-content > div[data-tab="${tabId}"]`);
    if (button && content) {
      button.classList.add('active');
      content.classList.add('active');
    }
  }

  // Bind click events
  tabButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      activateTab(tabId);
    });
  });

  // Make the first tab active by default
  const firstTab = tabButtons[0];
  if (firstTab) {
    const firstTabId = firstTab.getAttribute('data-tab');
    activateTab(firstTabId);
  }
});