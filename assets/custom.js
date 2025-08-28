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
  // Marquees (only if selector exists)
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

  // ScrollMagic (only if library & selector exist)
  if (typeof ScrollMagic !== "undefined" && document.querySelector(".parallax-h")) {
    var controller = new ScrollMagic.Controller();
    new ScrollMagic.Scene({ triggerElement: ".parallax-h .home-aboutus", offset: -150 })
      .setClassToggle(".parallax-h .home-aboutus h2", "textAnimate")
      .reverse(false)
      .addTo(controller);
  }

  // Parallax
  if (document.querySelector(".background")) {
    let ticking = false;
    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          var pic = document.querySelector(".background");
          if (pic) {
            pic.style.transform = "translateY(" + (-window.scrollY / 4 + 500) + "px)";
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  // Menu hover fix (only touch header menus, not Shopify product filters)
  $(".site-header .main-link-shop summary.header__menu-item, \
     .site-header .main-link-wines summary.header__menu-item, \
     .site-header .main-link-about summary.header__menu-item, \
     .site-header .main-link-contact summary.header__menu-item").mouseenter(function () {
    $("details", ".site-header").removeAttr("open");
    $(this).trigger("click");
  });
  $(".site-header .header__submenu").mouseleave(function () {
    $("details", ".site-header").removeAttr("open");
  });
  $(".site-header .main-link-home").mouseenter(function () {
    $("details", ".site-header").removeAttr("open");
  });
});