/* custom-marketing.js — rewards marquee + others (robust) */
(function () {
  'use strict';
  var $ = window.jQuery;
  if (!$) { console.error('[marketing] jQuery missing'); return; }

  // ---------- helpers ----------
  function imagesReady($ctx, cb) {
    var $imgs = $ctx.find('img');
    if (!$imgs.length) return cb();
    var left = $imgs.length;
    $imgs.each(function () {
      var img = this;
      if (img.complete) { if (--left === 0) cb(); }
      else $(img).one('load error', function () { if (--left === 0) cb(); });
    });
  }

  function getContentWidth($el) {
    var w = 0;
    // measure immediate children; fallback to scrollWidth
    $el.children().each(function () { w += $(this).outerWidth(true) || 0; });
    return w || ($el.get(0) ? $el.get(0).scrollWidth : 0);
  }

  function initOne($el, opts) {
    if (!$el.length || !$el.is(':visible')) return;
    if ($el.data('marquee-initialized')) return;
    if (!$.fn.marquee) { console.warn('[marketing] jquery.marquee not loaded'); return; }

    imagesReady($el, function () {
      // constant speed (px/s) → duration from content width
      var SPEED = opts.speedPxPerSec || 80;
      var contentW = getContentWidth($el);
      var boxW = $el.innerWidth();
      var duration = Math.max(6000, Math.round((contentW + boxW) / SPEED * 1000));

      $el.marquee({
        duration: duration,
        gap: opts.gap || 20,
        direction: opts.direction || 'left',
        delayBeforeStart: 0,
        duplicated: true,
        startVisible: true,      // keeps first frame visible
        pauseOnHover: true
      });

      $el.data('marquee-initialized', true);
    });
  }

  function initAll(root) {
    var $root = root ? $(root) : $(document);

    // REWARDS
    $root.find('.rewards-marquee').each(function () {
      initOne($(this), { speedPxPerSec: 80, gap: 20 });
    });

    // Existing strips (if present)
    $root.find('.marquee-imgs').each(function () {
      initOne($(this), { speedPxPerSec: 110, gap: 30 });
    });
    $root.find('.hm-marquee').each(function () {
      initOne($(this), { speedPxPerSec: 70, gap: 30 });
    });
  }

  // Lazy-init when near viewport (if present)
  function initWhenVisible(root) {
    var sel = '.rewards-marquee, .marquee-imgs, .hm-marquee';
    var els = (root || document).querySelectorAll(sel);
    if (!els.length) return;

    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          initAll(entry.target.parentNode || document);
          obs.unobserve(entry.target);
        });
      }, { rootMargin: '200px' });
      els.forEach(function (el) { io.observe(el); });
    } else {
      initAll(root);
    }

    // failsafe: force init after a moment even if IO didn't fire
    setTimeout(function(){ initAll(root); }, 1500);
  }

  // Venobox + Modals (unchanged)
  $(document).on('click', '.hero-video-btn-link', function () {
    if ($.fn.venobox) $(this).venobox();
  });
  $(document).on('click', '.modal-link', function () {
    var id = '#' + $(this).attr('data-modal');
    if ($(id).length) $(id).fadeIn(200).addClass('modal-active');
  });
  $(document).on('click', '.modal-wrap .modal-bg, .modal-wrap .modal-close', function () {
    $('.modal-wrap').fadeOut(200).removeClass('modal-active');
  });
  $(document).on('click', '.our-story .modal-link', function () {
    $('.our-story').addClass('animateModal');
  });
  $(document).on('click', '.our-story .modal-wrap .modal-close', function () {
    $('.our-story').removeClass('animateModal');
  });

  // Kickoff + reinit on section load / resize
  window.addEventListener('load', function(){ initWhenVisible(document); }, { passive:true });

  document.addEventListener('shopify:section:load', function (e) {
    initWhenVisible(e.target);
  });

// Debounce resize-driven work (recompute marquee durations after layout changes)
var debounce = (window.utils && window.utils.debounce) || function (fn, wait) {
  var t; wait = wait || 250;
  return function () { clearTimeout(t); t = setTimeout(fn, wait); };
};

$(window).on('resize', debounce(function () {
  if (!$.fn.marquee) return; // plugin not loaded — nothing to do

  // Destroy existing marquees so we can re-init with new widths
  $('.rewards-marquee, .marquee-imgs, .hm-marquee').each(function () {
    var $el = $(this);
    if ($el.data('marquee-initialized')) {
      try { $el.marquee('destroy'); } catch (e) {}
      $el.removeData('marquee-initialized');
    }
  });

  // Re-initialize with fresh measurements
  // (initAll must be in scope in this file)
  initAll(document);
}, 250));
