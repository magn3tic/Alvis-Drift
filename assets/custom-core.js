/* custom-core.js — sitewide UI that needs jQuery; safe if utils.js is missing */
(function () {
  'use strict';

  // --- Dependency guards ---
  var $ = window.jQuery;
  if (!$) { console.error('[custom-core] jQuery not found. Load it before custom-core.js'); return; }

  // utils fallbacks (if utils.js did not load)
  var U = (function () {
    if (window.utils) return window.utils;

    function onIdle(fn, timeout) {
      if ('requestIdleCallback' in window) requestIdleCallback(fn, { timeout: timeout || 2000 });
      else setTimeout(fn, 1);
    }
    function loadScript(src) {
      var s = document.createElement('script'); s.src = src; s.defer = true; document.body.appendChild(s); return s;
    }
    function debounce(fn, wait, immediate) {
      var t; wait = wait || 300;
      return function () {
        var ctx = this, args = arguments, callNow = immediate && !t;
        clearTimeout(t);
        t = setTimeout(function () { t = null; if (!immediate) fn.apply(ctx, args); }, wait);
        if (callNow) fn.apply(ctx, args);
      };
    }
    function iOS() {
      return ['iPad Simulator','iPhone Simulator','iPod Simulator','iPad','iPhone','iPod'].includes(navigator.platform)
        || (navigator.userAgent.indexOf('Mac') > -1 && 'ontouchend' in document);
    }
    return { onIdle: onIdle, loadScript: loadScript, debounce: debounce, iOS: iOS };
  })();

  // --- One-time delegated event bindings (attach once, work for future DOM) ---
  // Navbar open/close
  $(document).on('click', '.top-left-navbar', function () {
    $('#sideNavbar').fadeIn(100).addClass('open');
  });
  $(document).on('click', '.navbar-close', function () {
    $('#sideNavbar').fadeOut(100).removeClass('open');
  });

  // ==========================
  // Dropdown (hover) — CSS transitions (no jQuery slide*, avoids forced reflow)
  // ==========================
  (function dropdownHover(){
    // desktop only; preserve click behavior on touch
    var supportsHover = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (supportsHover) {
      function panelFor($link){
        var $p = $link.next('.dropdown-panel');
        if ($p.length) return $p;
        $p = $link.next();          // fallback: immediate sibling
        if ($p.length) $p.addClass('dropdown-panel');
        return $p;
      }

      // open hovered link's panel
      $(document).on('mouseenter', '.dropdown-link', function(e){
        e.preventDefault();
        var $link = $(this);
        $('.dropdown-link').removeClass('active');
        $('.dropdown-panel').removeClass('is-open');
        $link.addClass('active');
        panelFor($link).addClass('is-open');
      });

      // close when leaving the panel/submenu
      $(document).on('mouseleave', '.dropdown-panel, header .header__submenu', function(){
        $('.dropdown-link').removeClass('active');
        $('.dropdown-panel').removeClass('is-open');
      });

      // hovering "home" closes all
      $(document).on('mouseenter', '.main-link-home', function(){
        $('.dropdown-link').removeClass('active');
        $('.dropdown-panel').removeClass('is-open');
      });
    }
  })();

  // Touch fix for non-iOS (first tap opens, second navigates)
  if (window.ontouchstart !== undefined && !U.iOS()) {
    var lastHref = '';
    $(document).on('click', '.dropdown-link', function (e) {
      var href = this.getAttribute('href');
      if (!href) return;
      if (lastHref !== href) {
        e.preventDefault();
        lastHref = href;
        // open its panel like desktop hover
        $('.dropdown-link').removeClass('active');
        $('.dropdown-panel').removeClass('is-open');
        var $link = $(this);
        $link.addClass('active');
        var $p = $link.next('.dropdown-panel');
        if (!$p.length) $p = $link.next().addClass('dropdown-panel');
        $p.addClass('is-open');
      }
      // second tap navigates naturally
    });
  }

  // Mini-cart toggle
  $(document).on('click', '.mini-cart-btn', function (e) {
    e.preventDefault();
    $('.cart-mini').toggleClass('open');
    $(this).toggleClass('active');
  });
  $(document).on('click', '.mini-cart-close, .close-cart-button', function (e) {
    e.preventDefault();
    $('.cart-mini').removeClass('open');
    $('.mini-cart-btn').removeClass('active');
  });

  // Tabs
  $(document).on('click', '.product-tabs ul li', function () {
    var tab_id = $(this).attr('data-tab');
    $('.product-tabs ul li, .tabs-content .product-items-wrap').removeClass('current');
    $(this).addClass('current');
    $('#' + tab_id).addClass('current');
  });

  // Gallery thumbnails
  $(document).on('click', '.gallery-thumbanil', function () {
    var tab_id = $(this).attr('data-tab');
    $('.gallery-imgs-wrap .gallery-img').removeClass('current');
    $(this).addClass('current');
    $('#' + tab_id).addClass('current');
  });

  // Menu hover — details/summary friendly (desktop only)
  (function menuHover() {
    var supportsHover = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!supportsHover) return; // keep click behavior on touch

    var topSummarySel =
      'header .header__inline-menu details.header__menu-item > summary.header__menu-item,' +
      'header .main-link-shop summary.header__menu-item,' +
      'header .main-link-wines summary.header__menu-item,' +
      'header .main-link-about summary.header__menu-item,' +
      'header .main-link-contact summary.header__menu-item';

    $(document).on('mouseenter', topSummarySel, function () {
      var $details = $(this).parent('details');
      $('header details[open]').not($details).removeAttr('open');
      $details.attr('open', '');
    });
    $(document).on('mouseleave', 'header .header__submenu', function () {
      $(this).closest('details').removeAttr('open');
    });
    $(document).on('mouseenter', 'header .main-link-home, header', function (e) {
      if ($(e.target).closest('.header__submenu').length) return;
      $('header details[open]').removeAttr('open');
    });
  })();

  // --- Functions that must run when DOM is (re)rendered ---
  function initStaticState(root) {
    var $root = root ? $(root) : $(document);

    // iOS / not-iOS body flag (once)
    if (!document.body.classList.contains('ios-device') && !document.body.classList.contains('not-ios-device')) {
      document.body.classList.add(U.iOS() ? 'ios-device' : 'not-ios-device');
    }

    // Account redirect binding (id is unique so safe)
    var catchClick = document.getElementById('catchClick');
    if (catchClick && !catchClick.__accBound) {
      catchClick.addEventListener('mouseup', function () {
        localStorage.setItem('accUrl', this.dataset.dest);
      });
      catchClick.__accBound = true;
    }
    if (localStorage.getItem('accUrl')) {
      var url = localStorage.getItem('accUrl');
      localStorage.removeItem('accUrl');
      window.location.href = url;
    }

    // Safety defaults for first tab / first gallery image inside root
    var $tabs = $root.find('.product-tabs ul li');
    if ($tabs.length && $root.find('.product-tabs ul li.current').length === 0) {
      $tabs.first().addClass('current');
      $root.find('.tabs-content .product-items-wrap').first().addClass('current');
    }
    var $thumbs = $root.find('.gallery-thumbanil');
    if ($thumbs.length && $root.find('.gallery-thumbanil.current').length === 0) {
      $thumbs.first().addClass('current');
      $root.find('.gallery-imgs-wrap .gallery-img').first().addClass('current');
    }

    // Lazy background images within root
    var lazyBgs = (root || document).querySelectorAll('.bg-overlay-bg[data-bg]');
    if (lazyBgs.length) {
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries, obs) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var el = entry.target;
            var url = el.getAttribute('data-bg');
            if (url) el.style.backgroundImage = "url('" + url + "')";
            el.classList.add('bg-loaded');
            obs.unobserve(el);
          });
        }, { rootMargin: '200px' });
        lazyBgs.forEach(function (el) { io.observe(el); });
      } else {
        lazyBgs.forEach(function (el) {
          var url = el.getAttribute('data-bg');
          if (url) el.style.backgroundImage = "url('" + url + "')";
          el.classList.add('bg-loaded');
        });
      }
    }

    // Stagger navbar links (once per render)
    var i = 1;
    $root.find('.navbar-sec > ul > li').each(function () {
      this.style.animationDelay = (i * 0.125) + 's';
      i++;
    });
  }

  // Run on initial DOM ready
  document.addEventListener('DOMContentLoaded', function () { initStaticState(document); });

  // Run again when Shopify re-renders a section
  document.addEventListener('shopify:section:load', function (evt) { initStaticState(evt.target); });

})();
