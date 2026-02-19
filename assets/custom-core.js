/* custom-core.js — sitewide UI that needs jQuery; no jQuery effects; mobile drawer fixed */
(function () {
  'use strict';

  // --- Dependency guard ---
  var $ = window.jQuery;
  if (!$) { console.error('[custom-core] jQuery not found. Load it before custom-core.js'); return; }

  // --- utils fallback (if window.utils not present) ---
  var U = (function () {
    if (window.utils) return window.utils;

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
    function onIdle(fn, timeout){ if ('requestIdleCallback' in window) requestIdleCallback(fn, {timeout: timeout||2000}); else setTimeout(fn,1); }
    return { debounce: debounce, iOS: iOS, onIdle: onIdle };
  })();

  // =========================================================
  // NAVBAR: open/close the side drawer (#sideNavbar)
  // =========================================================
  $(document).on('click', '.top-left-navbar', function () {
    $('#sideNavbar').fadeIn(100).addClass('open');
  });
  $(document).on('click', '.navbar-close', function () {
    $('#sideNavbar').fadeOut(100).removeClass('open');
  });

  // =========================================================
  // SIDENAV ACCORDION (your drawer markup)
  // .dropdown-link followed by .navbar-dropdown  → click to toggle
  // Works on all devices; scoped ONLY inside #sideNavbar
  // =========================================================
  (function sideNavAccordion(){
    function panelFor($link){
      // prefer next .navbar-dropdown / .dropdown-panel sibling
      var $p = $link.siblings('.navbar-dropdown, .dropdown-panel');
      if ($p.length) return $p;
      // fallback: immediate sibling
      $p = $link.next();
      return $p;
    }

    // Toggle submenu on click
    $(document).on('click', '#sideNavbar .dropdown-link', function(e){
      var $link = $(this);
      var $panel = panelFor($link);
      if (!$panel.length) return; // no submenu → let it navigate

      e.preventDefault(); // has submenu → toggle
      var open = $panel.hasClass('is-open');

      // close other open ones
      $('#sideNavbar .navbar-dropdown.is-open, #sideNavbar .dropdown-panel.is-open').not($panel).removeClass('is-open');
      $('#sideNavbar .dropdown-link.active').not($link).removeClass('active').removeAttr('aria-expanded');

      // toggle this one
      $panel.toggleClass('is-open', !open);
      $link.toggleClass('active', !open).attr('aria-expanded', String(!open));
    });

    // Click outside submenus closes all (but stays inside drawer)
    $(document).on('click', function(e){
      if ($(e.target).closest('#sideNavbar .main_parent').length) return;
      $('#sideNavbar .navbar-dropdown.is-open, #sideNavbar .dropdown-panel.is-open').removeClass('is-open');
      $('#sideNavbar .dropdown-link.active').removeClass('active').removeAttr('aria-expanded');
    });
  })();

  // =========================================================
  // HEADER MENU (desktop): hover opens (details/summary friendly)
  // Keeps previous UX but without jQuery slide*.
  // =========================================================
  (function headerHoverMenus(){
    var supportsHover = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!supportsHover) return; // keep tap behavior on touch

    // For Dawn-like headers that use <details><summary>
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

    // If your header uses .dropdown-link + .dropdown-panel (not details),
    // support that too (scoped to header only).
    function panelFor($link){
      var $p = $link.next('.dropdown-panel');
      if ($p.length) return $p;
      $p = $link.next();
      if ($p.length) $p.addClass('dropdown-panel');
      return $p;
    }
    $(document).on('mouseenter', 'header .dropdown-link', function(e){
      e.preventDefault();
      var $link = $(this);
      $('header .dropdown-link').removeClass('active');
      $('header .dropdown-panel').removeClass('is-open');
      $link.addClass('active');
      panelFor($link).addClass('is-open');
    });
    $(document).on('mouseleave', 'header .dropdown-panel, header .header__submenu', function(){
      $('header .dropdown-link').removeClass('active');
      $('header .dropdown-panel').removeClass('is-open');
    });
  })();

  // Touch fix for header links (first tap opens submenu, second navigates)
  if ('ontouchstart' in window && !U.iOS()) {
    var lastHref = '';
    $(document).on('click', 'header .dropdown-link', function (e) {
      var href = this.getAttribute('href');
      // if it has a panel, control via tap
      var $panel = $(this).next('.dropdown-panel');
      if (!$panel.length) $panel = $(this).next('.navbar-dropdown');
      if (!$panel.length) return; // no submenu → let it navigate

      if (lastHref !== href) {
        e.preventDefault();
        lastHref = href;
        $('header .dropdown-link').removeClass('active');
        $('header .dropdown-panel, header .navbar-dropdown').removeClass('is-open');
        $(this).addClass('active');
        $panel.addClass('is-open');
      }
      // second tap navigates naturally
    });
  }

  // =========================================================
  // MINI-CART toggle (CSS should use transform drawer; no jQuery animate)
  // =========================================================
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

  // =========================================================
  // Tabs & Gallery
  // =========================================================
  $(document).on('click', '.product-tabs ul li', function () {
    var tab_id = $(this).attr('data-tab');
    $('.product-tabs ul li, .tabs-content .product-items-wrap').removeClass('current');
    $(this).addClass('current');
    $('#' + tab_id).addClass('current');
  });
  $(document).on('click', '.gallery-thumbanil', function () {
    var tab_id = $(this).attr('data-tab');
    $('.gallery-imgs-wrap .gallery-img').removeClass('current');
    $(this).addClass('current');
    $('#' + tab_id).addClass('current');
  });

  // =========================================================
  // INIT STATE on first load & on section re-render
  // =========================================================
  function initStaticState(root) {
    var $root = root ? $(root) : $(document);

    // Body flag for iOS
    if (!document.body.classList.contains('ios-device') && !document.body.classList.contains('not-ios-device')) {
      document.body.classList.add(U.iOS() ? 'ios-device' : 'not-ios-device');
    }

    // Account redirect (one-time bind)
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

    // Default first tab & gallery image
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

    // Stagger navbar links (visual only)
    var i = 1;
    $root.find('.navbar-sec > ul > li').each(function () {
      this.style.animationDelay = (i * 0.125) + 's';
      i++;
    });
  }

  document.addEventListener('DOMContentLoaded', function(){ initStaticState(document); });
  document.addEventListener('shopify:section:load', function(e){ initStaticState(e.target); });

})();
