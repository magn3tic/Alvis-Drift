<script>
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

</script>
