/* utils.js — tiny shared helpers */
(function () {
  'use strict';

  function onIdle(fn, timeout = 2000) {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(fn, { timeout });
    } else {
      setTimeout(fn, 1);
    }
  }

  function loadScript(src) {
    var s = document.createElement('script');
    s.src = src;
    s.defer = true;
    document.body.appendChild(s);
    return s;
  }

  function debounce(fn, wait = 300, immediate = false) {
    let t;
    return function (...args) {
      const ctx = this;
      const callNow = immediate && !t;
      clearTimeout(t);
      t = setTimeout(function () {
        t = null;
        if (!immediate) fn.apply(ctx, args);
      }, wait);
      if (callNow) fn.apply(ctx, args);
    };
  }

  function iOS() {
    return [
      'iPad Simulator', 'iPhone Simulator', 'iPod Simulator',
      'iPad', 'iPhone', 'iPod',
    ].includes(navigator.platform) || (navigator.userAgent.indexOf('Mac') > -1 && 'ontouchend' in document);
  }

  window.utils = { onIdle, loadScript, debounce, iOS };
})();
