document.addEventListener("DOMContentLoaded", function() {
// iOS detection
  function iOS() {
    return [
      "iPad Simulator","iPhone Simulator","iPod Simulator","iPad","iPhone","iPod",
    ].includes(navigator.platform) || 
      (navigator.userAgent.includes("Mac") && "ontouchend" in document);
  }
  document.body.classList.add(iOS() ? "ios-device" : "not-ios-device");
  
   // Account redirect
  if (localStorage.getItem("accUrl")) {
    var url = localStorage.getItem("accUrl");
    localStorage.removeItem("accUrl");
    window.location.href = url;
  }

  // Account create click
  const catchClick = document.getElementById("catchClick");
  if (catchClick) {
    catchClick.addEventListener("mouseup", function () {
      localStorage.setItem("accUrl", this.dataset.dest);
    });
  }

  // Navbar open/close
  $(".top-left-navbar").click(function () {
    $("#sideNavbar").fadeIn(100).addClass("open");
  });
  $(".navbar-close").click(function () {
    $("#sideNavbar").fadeOut(100).removeClass("open");
  });
  
 // Dropdown
  $(".dropdown-link").hover(function (e) {
    e.preventDefault();
    var $this = $(this);
    $(".dropdown-link").removeClass("active").next().removeClass("show").slideUp(800);
    $this.addClass("active").next().toggleClass("show").slideToggle(800);
  });

  // Touch fix
  if (window.ontouchstart !== undefined && !iOS()) {
    let clickedlinks = "";
    $(".dropdown-link").click(function (e) {
      e.preventDefault();
      const linkHref = $(this).attr("href");
      if (linkHref && clickedlinks !== linkHref) {
        clickedlinks = linkHref;
      } else {
        window.location = linkHref;
      }
    });
  }
  
// Mini-cart
  $(".mini-cart-btn").on("click", function (e) {
    e.preventDefault();
    $(".cart-mini").toggleClass("open");
    $(this).toggleClass("active");
  });
  $(".mini-cart-close, .close-cart-button").on("click", function (e) {
    e.preventDefault();
    $(".cart-mini").removeClass("open");
    $(".mini-cart-btn").removeClass("active");
  });


	
 // Tabs → ensure products are visible
  $(".product-tabs ul li").click(function () {
    var tab_id = $(this).attr("data-tab");
    $(".product-tabs ul li, .tabs-content .product-items-wrap").removeClass("current");
    $(this).addClass("current");
    $("#" + tab_id).addClass("current");
  });
  
    // Gallery thumbnails → ensure first image loads
  $(".gallery-thumbanil").click(function () {
    var tab_id = $(this).attr("data-tab");
    $(".gallery-imgs-wrap .gallery-img").removeClass("current");
    $(this).addClass("current");
    $("#" + tab_id).addClass("current");
  });

// Safety: if no tab is active, show the first by default
  if ($(".product-tabs ul li.current").length === 0) {
    $(".product-tabs ul li:first").addClass("current");
    $(".tabs-content .product-items-wrap:first").addClass("current");
  }
  if ($(".gallery-thumbanil.current").length === 0) {
    $(".gallery-thumbanil:first").addClass("current");
    $(".gallery-imgs-wrap .gallery-img:first").addClass("current");
  }

  // Lazy-load background images
  const lazyBackgrounds = document.querySelectorAll(".bg-overlay-bg");
  if ("IntersectionObserver" in window) {
    let observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.backgroundImage = `url('${entry.target.dataset.bg}')`;
          observer.unobserve(entry.target);
        }
      });
    });
    lazyBackgrounds.forEach(el => observer.observe(el));
  } else {
    lazyBackgrounds.forEach(el => {
      el.style.backgroundImage = `url('${el.dataset.bg}')`;
    });
  }
});












window.addEventListener("load", function () {
  if ($(".marquee-imgs").length) {
    $(".marquee-imgs").marquee({
      direction: "left",
      duration: 8000,
      gap: 30,
      delayBeforeStart: 0,
      duplicated: true,
      startVisible: true,
    });
  }

  
  if ($(".hm-marquee").length) {
    $(".hm-marquee").marquee({
      direction: "left",
      duration: 22000,
      gap: 30,
      delayBeforeStart: 0,
      duplicated: true,
      startVisible: true,
    });
  }

  
// Venobox
  $(document).on("click", ".hero-video-btn-link", function () {
    if ($.fn.venobox) $(this).venobox();
  });

    // Modals
  $(".modal-link").click(function () {
    var modalContent = "#" + $(this).attr("data-modal");
    if ($(modalContent).length) {
      $(modalContent).fadeIn(200).addClass("modal-active");
    }
  });
  $(".modal-wrap .modal-bg, .modal-wrap .modal-close").click(function () {
    $(".modal-wrap").fadeOut(200).removeClass("modal-active");
  });
  
  // adding .animateModal class to animate model 
  $('.our-story .modal-link').click(function(){
      $('.our-story').addClass('animateModal'); 
  });
  // remove .animateModal class to animate model 
  $('.our-story .modal-wrap .modal-close').click(function(){
      $('.our-story').removeClass('animateModal');
  });
  
  
  
  // animate items in sequence 
  function itemAnimate(element, animationDelay){	
      var i = 1;
      $(element).each(function() {
          $(this).css({"animation-delay": (i * animationDelay) + 's'});
          i++;
      });
  }
  
  // navbar link animatation
  itemAnimate($('.navbar-sec > ul > li'), '0.125');
  
  
  /* Homepage - Parallax Section animation */
  (function(){
      $(document).ready(function(){

      });
  });
  $(function() {
  // Only run ScrollMagic if library loaded AND .parallax-h exists
  if (typeof ScrollMagic !== "undefined" && $('.parallax-h').length) {
    var controller = new ScrollMagic.Controller();

    var scenes = [
      { trigger: '.parallax-h .home-aboutus', target: '.parallax-h .home-aboutus h2', class: 'textAnimate', offset: -150 },
      { trigger: '.parallax-h .home-aboutus', target: '.parallax-h .home-aboutus p', class: 'textAnimate', offset: -150 },
      { trigger: '.parallax-h .home-product-items', target: '.parallax-h .home-product-items', class: 'home-product-animate', offset: -100 },
      { trigger: '.parallax-h .our-story', target: '.parallax-h .our-story', class: 'our-story-animate', offset: -100 },
      { trigger: '.parallax-h .our-vineyards', target: '.parallax-h .our-vineyards', class: 'our-vineyards-animate-before', offset: 0 },
      { trigger: '.parallax-h .our-vineyards', target: '.parallax-h .our-vineyards', class: 'our-vineyards-animate-after', offset: 820 }
      // Add other scenes as needed...
    ];

    scenes.forEach(function(scene) {
      if ($(scene.trigger).length) {
        new ScrollMagic.Scene({
          triggerElement: scene.trigger,
          offset: scene.offset
        })
        .setClassToggle(scene.target, scene.class)
        .reverse(false)
        .addTo(controller);
      }
    });
  }

  // Parallax scroll (only if element exists)
  const backgrounds = ['.background', '.about_background', '.parallex_div', '.parallex_div2', '.parallex_div3', '.parallex_div4'];
  backgrounds.forEach(function(sel) {
    if ($(sel).length) {
      let ticking = false;
      window.addEventListener('scroll', function() {
        if (!ticking) {
          window.requestAnimationFrame(function() {
            $(sel).each(function(index, el) {
              $(el).css('transform', 'translateY(' + (-window.scrollY / 4 + 500) + 'px)');
            });
            ticking = false;
          });
          ticking = true;
        }
      });
    }
  });

  // Menu hover: scope only to header nav to avoid breaking product filters
  const header = $('.site-header');
  if (header.length) {
    header.find('.main-link-shop summary.header__menu-item, \
                 .main-link-wines summary.header__menu-item, \
                 .main-link-about summary.header__menu-item, \
                 .main-link-contact summary.header__menu-item').mouseenter(function() {
      header.find('details').removeAttr('open'); // only inside header
      $(this).trigger('click');
    });

    header.find('.header__submenu').mouseleave(function() {
      header.find('details').removeAttr('open');
    });

    header.find('.main-link-home').mouseenter(function() {
      header.find('details').removeAttr('open');
    });
  }
});