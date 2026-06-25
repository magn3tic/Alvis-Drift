/* main.js — Alvis Drift
   Optimisations vs original:
   - 5 separate jQuery.ready() merged into 1
   - slideUp/slideDown replaced with CSS max-height transition (no layout thrashing)
   - 2 DOMContentLoaded tab handlers moved to requestIdleCallback (below fold)
   - Slick inits scoped with .length check (skips on pages without carousels)
   - Arrow selectors scoped to wrapper (prevents wrong element on multi-slider pages)
   - Add-to-cart feedback uses event delegation (1 listener vs many)
*/

(function ($) {

  /* Single jQuery.ready — was 5 separate calls */
  $(function () {

    /* ── Mobile nav ─────────────────────────────────────── */
    $(".mobile-menu-wrap li.drop-menu > span").on("click", function () {
      var $sub = $(this).parent().children("ul");
      if ($sub.hasClass("open")) {
        $sub.removeClass("open");
      } else {
        $(".mobile-menu-wrap li.drop-menu ul.open").removeClass("open");
        $sub.addClass("open");
      }
    });

    $(".hamburger").on("click", function () {
      $("body").toggleClass("menu-act");
    });

    $(".hamburger-2").on("click", function () {
      $(".mobile-menu-wrap").toggleClass("menu-act-fixed");
    });

    /* ── Rewards carousel ───────────────────────────────── */
    if ($(".rewards-carousel").length) {
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
          { breakpoint: 750, settings: { slidesToShow: 3 } },
          { breakpoint: 480, settings: { slidesToShow: 2 } }
        ]
      });
    }

    /* ── Testimonial slider ─────────────────────────────── */
    if ($('.ts-slider').length) {
      var $tsWrap = $('.ts-slider').closest('.ts-slider-wrap');
      $('.ts-slider').slick({
        dots: false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: $tsWrap.find('.ts-slide-nav-prev').length > 0,
        prevArrow: $tsWrap.find('.ts-slide-nav-prev'),
        nextArrow: $tsWrap.find('.ts-slide-nav-next'),
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 500,
        responsive: [
          { breakpoint: 1024, settings: { slidesToShow: 2, arrows: false, dots: true } },
          { breakpoint: 600,  settings: { slidesToShow: 1, arrows: false, dots: true } },
          { breakpoint: 480,  settings: { slidesToShow: 1, arrows: false, dots: true } }
        ]
      });
    }

    /* ── Sale slider ────────────────────────────────────── */
    if ($('.sale-slider').length) {
      var $saleWrap = $('.sale-slider').closest('.ald-sale-slider');
      $('.sale-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 500,
        prevArrow: $saleWrap.find('.slide-nav-prev'),
        nextArrow: $saleWrap.find('.slide-nav-next')
      });
    }

    /* ── Accordion ──────────────────────────────────────── 
       CSS max-height transition replaces slideUp/slideDown.
       slideUp/Down reads offsetHeight every frame = forced
       reflow each animation tick = main thread jank.        */
    if ($('.acc-wrap').length) {
      $('.acc-wrap').each(function () {
        var $content = $(this).find('.acc-content');
        if (!$(this).hasClass('act')) {
          $content.css({ maxHeight: '0', overflow: 'hidden',
            transition: 'max-height 0.3s ease' });
        } else {
          $content.css({ maxHeight: $content[0].scrollHeight + 'px',
            overflow: 'hidden', transition: 'max-height 0.3s ease' });
        }
      });

      $('.acc-head').on('click', function () {
        var $wrap = $(this).closest('.acc-wrap');
        var isOpen = $wrap.hasClass('act');

        // Close all
        $('.acc-wrap').removeClass('act')
          .find('.acc-content').css('max-height', '0');

        // Open clicked if it was closed
        if (!isOpen) {
          var $c = $wrap.find('.acc-content');
          $wrap.addClass('act');
          $c.css('max-height', $c[0].scrollHeight + 'px');
        }
      });
    }

  }); // end single $.ready

})(jQuery);

/* ── Tab inits — idle deferred (below fold on all pages) ── */
(function () {
  function initWrTabs() {
    var tabLinks    = document.querySelectorAll('.wr-filter a');
    var tabContents = document.querySelectorAll('.wr-tabs');
    if (!tabLinks.length) return;

    tabLinks[0].classList.add('active');
    var firstId = tabLinks[0].getAttribute('href');
    if (firstId) { var el = document.querySelector(firstId); if (el) el.classList.add('active'); }

    function activateTab(id) {
      tabLinks.forEach(function(l) { l.classList.remove('active'); });
      tabContents.forEach(function(t) { t.classList.remove('active'); });
      var link = document.querySelector('.wr-filter a[href="' + id + '"]');
      var content = document.querySelector(id);
      if (link) link.classList.add('active');
      if (content) content.classList.add('active');
    }

    tabLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        activateTab(this.getAttribute('href'));
      });
    });

    document.querySelectorAll('.tab-img img[data-target]').forEach(function (img) {
      img.addEventListener('click', function () {
        var t = this.getAttribute('data-target');
        if (t) activateTab(t);
      });
    });
  }

  function initStabs() {
    var tabButtons  = document.querySelectorAll('.stabs button');
    var tabContents = document.querySelectorAll('.stabs-content > div[data-tab]');
    if (!tabButtons.length || !tabContents.length) return;

    function activateTab(id) {
      tabButtons.forEach(function(b) { b.classList.remove('active'); });
      tabContents.forEach(function(c) { c.classList.remove('active'); });
      var btn = document.querySelector('.stabs button[data-tab="' + id + '"]');
      var content = document.querySelector('.stabs-content > div[data-tab="' + id + '"]');
      if (btn) btn.classList.add('active');
      if (content) content.classList.add('active');
    }

    tabButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        activateTab(this.getAttribute('data-tab'));
      });
    });

    if (tabButtons[0]) activateTab(tabButtons[0].getAttribute('data-tab'));
  }

  function initTabs() {
    initWrTabs();
    initStabs();
  }

  if ('requestIdleCallback' in window) {
    requestIdleCallback(initTabs, { timeout: 2000 });
  } else {
    document.addEventListener('DOMContentLoaded', initTabs);
  }
})();

/* ── Add-to-cart feedback — single delegated listener ───── */
document.addEventListener('click', function (e) {
  var btn  = e.target.closest('.product-add-to-cart');
  var span = btn && btn.querySelector(':scope > span');
  if (span) {
    setTimeout(function () { span.textContent = 'Added to Cart'; }, 2000);
  }
});
