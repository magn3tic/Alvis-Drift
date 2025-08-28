
/* -------------------------
   Critical JS
   Runs early (DOMContentLoaded)
------------------------- */
document.addEventListener("DOMContentLoaded", function () {
  // iOS detection
  function iOS() {
    return [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
      (navigator.userAgent.includes("Mac") && "ontouchend" in document);
  }

  var iosDevice = iOS();
  document.body.classList.add(iosDevice ? "ios-device" : "not-ios-device");

  // Account redirect from localStorage
  if (localStorage.getItem("accUrl")) {
    var url = localStorage.getItem("accUrl");
    localStorage.removeItem("accUrl");
    window.location.href = url;
  }

  // Catch create-account button click
  if (document.getElementById("catchClick")) {
    document.getElementById("catchClick").addEventListener("mouseup", function () {
      var accUrl = this.dataset.dest;
      localStorage.setItem("accUrl", accUrl);
    });
  }

  // Navbar open/close
  $(".top-left-navbar").click(function () {
    $("#sideNavbar").fadeIn(100).addClass("open");
  });

  $(".navbar-close").click(function () {
    $("#sideNavbar").fadeOut(100).removeClass("open");
  });

  // Dropdown handling
  $(".dropdown-link").hover(function (e) {
    e.preventDefault();
    var $this = $(this);
    $(".dropdown-link").removeClass("active").next().removeClass("show").slideUp(800);
    $this.addClass("active").next().toggleClass("show").slideToggle(800);
  });

  if (window.ontouchstart !== undefined && !iosDevice) {
    var clickedlinks = "";
    $(".dropdown-link").click(function (e) {
      e.preventDefault();
      var linkHref = $(this).attr("href");
      if (linkHref !== "undefined" && clickedlinks !== linkHref) {
        clickedlinks = linkHref;
      } else {
        window.location = linkHref;
      }
    });
  }

  // Mini-cart open/close
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

  $("section.cart-mini").on("click", ".close-cart-button", function (e) {
    e.preventDefault();
    $(".cart-mini").removeClass("open");
    $(".mini-cart-btn").removeClass("active");
  });

  // Lazy-load background images
  const lazyBackgrounds = document.querySelectorAll(".bg-overlay-bg");
  if ("IntersectionObserver" in window) {
    let observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.style.backgroundImage = `url('${el.dataset.bg}')`;
          observer.unobserve(el);
        }
      });
    });
    lazyBackgrounds.forEach(function (bg) {
      observer.observe(bg);
    });
  } else {
    lazyBackgrounds.forEach(function (el) {
      el.style.backgroundImage = `url('${el.dataset.bg}')`;
    });
  }
});

/* -------------------------
   Deferred JS
   Runs after full page load
   (Sliders, marquees, modals, parallax, ScrollMagic, etc.)
------------------------- */
window.addEventListener("load", function () {
  // ✅ Sliders (if enabled)
  /*
  $(".hero-section-slider").slick({...});
  $(".product-slider").slick({...});
  $(".product-list-slider").slick({...});
  $(".product-list-3d").slick({...});
  */

  // Marquees
  $(".marquee-imgs").marquee({
    direction: "left",
    duration: 8000,
    gap: 30,
    delayBeforeStart: 0,
    duplicated: true,
    startVisible: true,
  });

  $(".hm-marquee").marquee({
    direction: "left",
    duration: 22000,
    gap: 30,
    delayBeforeStart: 0,
    duplicated: true,
    startVisible: true,
  });

  // Venobox (only init when clicked for performance)
  $(document).on("click", ".hero-video-btn-link", function () {
    $(this).venobox();
  });

  // Modal handlers
  $(".modal-link").click(function () {
    var modalContent = "#" + $(this).attr("data-modal");
    $(modalContent).fadeIn(200).addClass("modal-active");
  });

  $(".modal-wrap .modal-bg, .modal-wrap .modal-close").click(function () {
    $(".modal-wrap").fadeOut(200).removeClass("modal-active");
  });

  $(".our-story .modal-link").click(function () {
    $(".our-story").addClass("animateModal");
  });
  $(".our-story .modal-wrap .modal-close").click(function () {
    $(".our-story").removeClass("animateModal");
  });

  // Product tabs
  $(".product-tabs ul li").click(function () {
    var tab_id = $(this).attr("data-tab");
    $(".product-tabs ul li, .tabs-content .product-items-wrap").removeClass("current");
    $(this).addClass("current");
    $("#" + tab_id).addClass("current");
  });

  $(".gallery-thumbanil").click(function () {
    var tab_id = $(this).attr("data-tab");
    $(".gallery-imgs-wrap .gallery-img").removeClass("current");
    $(this).addClass("current");
    $("#" + tab_id).addClass("current");
  });

  // ScrollMagic (only load if parallax elements exist)
  if (document.querySelector(".parallax-h")) {
    var controller = new ScrollMagic.Controller();
    new ScrollMagic.Scene({ triggerElement: ".parallax-h .home-aboutus", offset: -150 })
      .setClassToggle(".parallax-h .home-aboutus h2", "textAnimate")
      .reverse(false)
      .addTo(controller);

    // ... other scenes (keep them but only inside this condition)
  }

  // Parallax scroll effects (throttled)
  let ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        var scrollValue = window.scrollY;
        var pic = document.querySelector(".background");
        if (pic) {
          pic.style.transform = "translateY(" + (-scrollValue / 4 + 500) + "px)";
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  // Menu hover
  $(".main-link-shop summary.header__menu-item, .main-link-wines summary.header__menu-item, .main-link-about summary.header__menu-item, .main-link-contact summary.header__menu-item").mouseenter(function () {
    $("details").removeAttr("open");
    $(this).trigger("click");
  });

  $(".header__submenu").mouseleave(function () {
    $("details").removeAttr("open");
  });

  $(".main-link-home").mouseenter(function () {
    $("details").removeAttr("open");
  });
});

