/* custom-parallax.js — ScrollMagic scenes + batched parallax */
(function () {
  'use strict';

  // Never run on collection pages (prevents moving product grids)
  if (document.body.classList.contains('template-collection')) return;

  window.addEventListener('load', function () {
    // Only if any target exists
    var hasTargets = document.querySelector('.parallax-h, .background, .about_background, .parallex_div, .parallex_div2, .parallex_div3, .parallex_div4');
    if (!hasTargets) return;

    // Respect reduced motion
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // ------------------------------
    // ScrollMagic scenes (if library present)
    // ------------------------------
    if (window.ScrollMagic && document.querySelector('.parallax-h')) {
      var controller = new ScrollMagic.Controller();

      // home-aboutus h2
      new ScrollMagic.Scene({ triggerElement: '.parallax-h .home-aboutus', offset: -150 })
        .setClassToggle('.parallax-h .home-aboutus h2', 'textAnimate')
        .reverse(false).addTo(controller);

      // home-aboutus paragraph
      new ScrollMagic.Scene({ triggerElement: '.parallax-h .home-aboutus', offset: -150 })
        .setClassToggle('.parallax-h .home-aboutus p', 'textAnimate')
        .reverse(false).addTo(controller);

      // home product items
      new ScrollMagic.Scene({ triggerElement: '.parallax-h .home-product-items', offset: -100 })
        .setClassToggle('.parallax-h .home-product-items', 'home-product-animate')
        .reverse(false).addTo(controller);

      // our-story
      new ScrollMagic.Scene({ triggerElement: '.parallax-h .our-story', offset: -100 })
        .setClassToggle('.parallax-h .our-story', 'our-story-animate')
        .reverse(false).addTo(controller);

      // our-vineyards before/after
      new ScrollMagic.Scene({ triggerElement: '.parallax-h .our-vineyards', offset: 0 })
        .setClassToggle('.parallax-h .our-vineyards', 'our-vineyards-animate-before')
        .addTo(controller);
      new ScrollMagic.Scene({ triggerElement: '.parallax-h .our-vineyards', offset: 820 })
        .setClassToggle('.parallax-h .our-vineyards', 'our-vineyards-animate-after')
        .addTo(controller);

      // our-cellars before/after
      new ScrollMagic.Scene({ triggerElement: '.parallax-h .our-cellars', offset: -50 })
        .setClassToggle('.parallax-h .our-cellars', 'our-cellars-animate-before')
        .addTo(controller);
      new ScrollMagic.Scene({ triggerElement: '.parallax-h .our-cellars', offset: 820 })
        .setClassToggle('.parallax-h .our-cellars', 'our-cellars-animate-after')
        .addTo(controller);

      // our-rewards before/after
      new ScrollMagic.Scene({ triggerElement: '.parallax-h .our-rewards', offset: 0 })
        .setClassToggle('.parallax-h .our-rewards', 'our-rewards-animate-before')
        .addTo(controller);
      new ScrollMagic.Scene({ triggerElement: '.parallax-h .our-rewards', offset: 820 })
        .setClassToggle('.parallax-h .our-rewards', 'our-rewards-animate-after')
        .addTo(controller);

      // our-social-impact before/after
      new ScrollMagic.Scene({ triggerElement: '.parallax-h .our-social-impact', offset: 0 })
        .setClassToggle('.parallax-h .our-social-impact', 'our-social-impact-animate-before')
        .addTo(controller);
      new ScrollMagic.Scene({ triggerElement: '.parallax-h .our-social-impact', offset: 820 })
        .setClassToggle('.parallax-h .our-social-impact', 'our-social-impact-animate-after')
        .addTo(controller);

      // newsletter
      new ScrollMagic.Scene({ triggerElement: '.parallax-h .newsletter-sec', offset: -100 })
        .setClassToggle('.parallax-h .newsletter-sec', 'newsletter-sec-animate')
        .reverse(false).addTo(controller);

      // our-family page parallax
      new ScrollMagic.Scene({ triggerElement: '.parallax-h .our-vineyards.our_family_parallex', offset: 0 })
        .setClassToggle('.parallax-h .our-vineyards.our_family_parallex', 'our-family-animate-before')
        .addTo(controller);
      new ScrollMagic.Scene({ triggerElement: '.parallax-h .our-vineyards.our_family_parallex', offset: 820 })
        .setClassToggle('.parallax-h .our-vineyards.our_family_parallex', 'our-family-animate-after')
        .addTo(controller);
    }

    // ------------------------------
    // Batched parallax transforms (one scroll handler)
    // ------------------------------
    var bg        = document.querySelector('.background');
    var aboutBg   = document.querySelector('.about_background');

    var isFarm       = !!document.querySelector('.template-page-our-farm .parallex_div');
    var isVineyards  = !!document.querySelector('.template-page-our-vineyards .parallex_div');
    var isCellar     = !!document.querySelector('.template-page-our-cellar .parallex_div');
    var isFamily     = !!document.querySelector('.template-page-our-family .parallex_div');
    var isWineAwards = !!document.querySelector('.template-page-wine-awards .parallex_div2');

    var d1 = Array.from(document.querySelectorAll('.parallex_div'));
    var d2 = Array.from(document.querySelectorAll('.parallex_div2'));
    var d3 = document.querySelector('.parallex_div3');
    var d4 = document.querySelector('.parallex_div4');

    var rafId = null;

    function update() {
      rafId = null;

      var y  = window.scrollY || window.pageYOffset || 0;
      var vw = window.innerWidth || 0;

      if (bg)      bg.style.transform      = 'translateY(' + (-y / 4 + 500)  + 'px)';
      if (aboutBg) aboutBg.style.transform = 'translateY(' + (-y / 4 + 1100) + 'px)';

      if (isFarm) {
        if (d1[0]) d1[0].style.transform = 'translateY(' + (-y/4 + 400)  + 'px)';
        if (d1[1]) d1[1].style.transform = 'translateY(' + (-y/4 + 1100) + 'px)';
      } else if (isVineyards) {
        if (d1[0]) d1[0].style.transform = 'translateY(' + (-y/4 + (vw < 1200 ? 600 : 500)) + 'px)';
      } else if (isCellar) {
        if (d1[0]) d1[0].style.transform = 'translateY(' + (-y/4 + 400) + 'px)';
      } else if (isFamily) {
        if (d1[0]) d1[0].style.transform = 'translateY(' + (-y/5 + 400)  + 'px)';
        if (d1[1]) d1[1].style.transform = 'translateY(' + (-y/4 + 1200) + 'px)';
        if (d1[2]) d1[2].style.transform = 'translateY(' + (-y/4 + 2000) + 'px)';
      }
      if (d2.length) {
        var first = d2[0];
        if (isFarm && first) first.style.transform = 'translateY(' + (-y/4 + 800) + 'px)';
        else if (isFamily) {
          var t = document.querySelector('.template-page-our-family .parallex_div2');
          if (t) t.style.transform = 'translateY(' + (-y/6 + 800) + 'px)';
        } else if (isCellar && first) {
          first.style.transform = 'translateY(' + (-y/4 + 800) + 'px)';
        } else if (isWineAwards && first) {
          first.style.transform = 'translateY(' + (-y/2 + 800) + 'px)';
        }
      }
      if (d3) d3.style.transform = 'translateY(' + (-y/4 + 2100) + 'px)';
      if (d4) d4.style.transform = 'translateY(' + (-y/4 + 2700) + 'px)';
    }

    function onScroll() {
      if (rafId != null) return;
      rafId = requestAnimationFrame(update);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    update();
  }, { passive: true });
})();
