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
  // Home - hero section Heading animatation
  //itemAnimate($('.parallax-h .hero-title h2 span'), '0.15');
  // home-aboutus paragraph animatation
  //itemAnimate($('.home-aboutus .container > p'), '0.25');
  
  
  /* Homepage - Parallax Section animation */
  (function(){
      $(document).ready(function(){
          /*
          var $window = $(window);
          var scrollTime = 1;
          var scrollDistance = 10;        
     
          var iPadAgent = navigator.userAgent.match(/iPad/i) != null;
          var iPodAgent = navigator.userAgent.match(/iPhone/i) != null;
          var AndroidAgent = navigator.userAgent.match(/Android/i) != null;
          var webOSAgent = navigator.userAgent.match(/webOS/i) != null;
          
          if(iPadAgent || iPodAgent || AndroidAgent || webOSAgent){
              var controller = new ScrollMagic({container: "#scroll_wrapper"});
              $('#scroll_wrapper').height($(window).height());
              $('#scroll_wrapper').width($(window).width()); 
          }
          else{           
              $window.on("mousewheel DOMMouseScroll", function(event){                
                  event.preventDefault();	
                            
                  var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
                  var scrollTop = $window.scrollTop();
                  var finalScroll = scrollTop - parseInt(delta*scrollDistance);
                  
                  TweenMax.to($window, scrollTime, {
                      scrollTo : { y: finalScroll, autoKill:true },
                          ease: Power1.easeOut,
                          overwrite: 5							
                      });
              });
              
               var controller = new ScrollMagic();             
          }
          */
      });
  });
  
  
  $(function() {
      var controller = new ScrollMagic.Controller();	
  
      /* [IMPORTANT]: .parallax-h is must added to homepage body to apply parrallax effect */
  
      // home-aboutus h2
      var containerScene1 = new ScrollMagic.Scene({
          triggerElement: '.parallax-h .home-aboutus',
          offset: -150 
      })
      .setClassToggle('.parallax-h .home-aboutus h2', 'textAnimate')
      .reverse(false)
      .addTo(controller);
  
      // home-aboutus paragraph
      var containerScene2 = new ScrollMagic.Scene({
          triggerElement: '.parallax-h .home-aboutus',
          offset: -150
      })
      .setClassToggle('.parallax-h .home-aboutus p', 'textAnimate')	
      .reverse(false)
      .addTo(controller);
  
    /*
      // .dare-to-be-true small image - before
      var containerScene3 = new ScrollMagic.Scene({
          triggerElement: '.parallax-h .dare-to-be-true',
          offset: -50
      })
      .setClassToggle('.parallax-h .dare-to-be-true-bx', 'dare-to-animate-before')
      .addTo(controller);
  
      // .dare-to-be-true small image - after
      var containerScene4 = new ScrollMagic.Scene({
          triggerElement: '.parallax-h .dare-to-be-true',
          offset: 500
      })
      .setClassToggle('.parallax-h .dare-to-be-true-bx', 'dare-to-animate-after')
      .addTo(controller);
  */
      // .home-product-items 
      var containerScene5 = new ScrollMagic.Scene({
          triggerElement: '.parallax-h .home-product-items',
          offset: -100
      })
      .setClassToggle('.parallax-h .home-product-items', 'home-product-animate')
      .reverse(false)
      .addTo(controller);	
  
      // .our-story
      var containerScene6 = new ScrollMagic.Scene({
          triggerElement: '.parallax-h .our-story',
          offset: -100
      })
      .setClassToggle('.parallax-h .our-story', 'our-story-animate')
      .reverse(false)
      .addTo(controller);
  
      // .our-vineyards before
      var containerScene7 = new ScrollMagic.Scene({
          triggerElement: '.parallax-h .our-vineyards',
          offset: 0
      })
      .setClassToggle('.parallax-h .our-vineyards', 'our-vineyards-animate-before')
      .addTo(controller);
  
      // .our-vineyards after
      var containerScene8 = new ScrollMagic.Scene({
          triggerElement: '.parallax-h .our-vineyards',
          offset: 820
      })
      .setClassToggle('.parallax-h .our-vineyards', 'our-vineyards-animate-after')
      .addTo(controller);
  
      // .our-cellars before
      var containerScene9 = new ScrollMagic.Scene({
          triggerElement: '.parallax-h .our-cellars',
          offset: -50
      })
      .setClassToggle('.parallax-h .our-cellars', 'our-cellars-animate-before')
      .addTo(controller);
  
      // .our-cellars after
      var containerScene10 = new ScrollMagic.Scene({
          triggerElement: '.parallax-h .our-cellars',
          offset: 820
      })
      .setClassToggle('.parallax-h .our-cellars', 'our-cellars-animate-after')
      .addTo(controller);	
  
      // .our-rewards before
      var containerScene11 = new ScrollMagic.Scene({
          triggerElement: '.parallax-h .our-rewards',
          offset: 0
      })
      .setClassToggle('.parallax-h .our-rewards', 'our-rewards-animate-before')
      .addTo(controller);
  
      // .our-rewards after
      var containerScene12 = new ScrollMagic.Scene({
          triggerElement: '.parallax-h .our-rewards',
          offset: 820
      })
      .setClassToggle('.parallax-h .our-rewards', 'our-rewards-animate-after')
      .addTo(controller);
  
      // .our-social-impact before
      var containerScene13 = new ScrollMagic.Scene({
          triggerElement: '.parallax-h .our-social-impact',
          offset: 0
      })
      .setClassToggle('.parallax-h .our-social-impact', 'our-social-impact-animate-before')
      .addTo(controller);
  
      // .our-social-impact after
      var containerScene14 = new ScrollMagic.Scene({
          triggerElement: '.parallax-h .our-social-impact',
          offset: 820
      })
      .setClassToggle('.parallax-h .our-social-impact', 'our-social-impact-animate-after')
      .addTo(controller);
  
      // .newsletter-sec
      var containerScene20 = new ScrollMagic.Scene({
          triggerElement: '.parallax-h .newsletter-sec',
          offset: -100
      })
      .setClassToggle('.parallax-h .newsletter-sec', 'newsletter-sec-animate')
      .reverse(false)
      .addTo(controller);
    
    
      // our-family-page-parallex
      var containerScene7 = new ScrollMagic.Scene({
          triggerElement: '.parallax-h .our-vineyards.our_family_parallex',
          offset: 0
      })
      .setClassToggle('.parallax-h .our-vineyards.our_family_parallex', 'our-family-animate-before')
      .addTo(controller);
  
      // our-family-page-parallex
      var containerScene8 = new ScrollMagic.Scene({
          triggerElement: '.parallax-h .our-vineyards.our_family_parallex',
          offset: 820
      })
      .setClassToggle('.parallax-h .our-vineyards.our_family_parallex', 'our-family-animate-after')
      .addTo(controller);
    
      
  });
  
      /*
  $(document).ready(function(){
        $('.hero-section-inner .hero-title h2 span p').addClass('animate-reveal');
        $('.hero-section-inner .hero-title h2').addClass('animate-reveal');
  });
  */
  
  
  window.addEventListener('scroll',function(){
    scrollValue = window.scrollY;
    var pic = document.querySelector('.background');
    if(pic != null){  
      pic.style.transform = 'translateY('+(-scrollValue/4 + 500)+'px)';
    }
  });
  
  
  window.addEventListener('scroll',function(){
    scrollValue = window.scrollY;
    var pic = document.querySelector('.about_background');
    if(pic != null){  
      pic.style.transform = 'translateY('+(-scrollValue/4 + 1100)+'px)';
    }
  });
  
  
  
  
  window.addEventListener('scroll',function(){
    scrollValue = window.scrollY;
     width = $(window).width();
    console.log("width_size==>",width);
    console.log((-scrollValue/4 + 1400));
    var family_pge = document.querySelector('.template-page-our-family .parallex_div');
    var farm_pge = document.querySelector('.template-page-our-farm .parallex_div');
    var vineyards_pge = document.querySelector('.template-page-our-vineyards .parallex_div');
    var cellar = document.querySelector('.template-page-our-cellar .parallex_div');
    if(farm_pge != null){
      var pic = document.querySelector('.parallex_div');
      $('.parallex_div').eq(0).css("transform",'translateY('+(-scrollValue/4 + 400)+'px)');
      $('.parallex_div').eq(1).css("transform",'translateY('+(-scrollValue/4 + 1100)+'px)');
    }else if(vineyards_pge != null){
      if(width < 1200){
        $('.parallex_div').eq(0).css("transform",'translateY('+(-scrollValue/4 + 600)+'px)');
      }else{
        $('.parallex_div').eq(0).css("transform",'translateY('+(-scrollValue/4 + 500)+'px)');
      }
    }else if(cellar != null){
      if(width < 1200){
        $('.parallex_div').eq(0).css("transform",'translateY('+(-scrollValue/4 + 400)+'px)');
      }else{
        $('.parallex_div').eq(0).css("transform",'translateY('+(-scrollValue/4 + 400)+'px)');
      }
    }else if(family_pge != null){
      $('.parallex_div').eq(0).css("transform",'translateY('+(-scrollValue/5 + 400)+'px)');
      $('.parallex_div').eq(1).css("transform",'translateY('+(-scrollValue/4 + 1200)+'px)');
      $('.parallex_div').eq(2).css("transform",'translateY('+(-scrollValue/4 + 2000)+'px)');
    }else{
      var pic = document.querySelector('.parallex_div');
      $('.parallex_div').eq(2).css("transform",'translateY('+(-scrollValue/4 + 1400)+'px)');
    }
  });
  window.addEventListener('scroll',function(){
    scrollValue = window.scrollY;
    var pic = document.querySelector('.parallex_div2');
    var cellar = document.querySelector('.template-page-our-cellar .parallex_div2');
    var farm_pge = document.querySelector('.template-page-our-farm .parallex_div2');
    var family_pge = document.querySelector('.template-page-our-family .parallex_div2');
    var wine_pge = document.querySelector('.template-page-wine-awards .parallex_div2');
  
    if(farm_pge != null){
      var pic = document.querySelector('.parallex_div2');
      pic.style.transform = 'translateY('+(-scrollValue/4 + 800)+'px)';
    }else if(family_pge != null){
      $('.template-page-our-family .parallex_div2').css("transform",'translateY('+(-scrollValue/6 + 800)+'px)');
    }else if(cellar != null){
      pic.style.transform = 'translateY('+(-scrollValue/4 + 800)+'px)';
    }else if(family_pge != null){
      pic.style.transform = 'translateY('+(-scrollValue/4 + 1300)+'px)';
    }else if(wine_pge != null){
      pic.style.transform = 'translateY('+(-scrollValue/2 + 800)+'px)';
    }else{
      var pic = document.querySelector('.parallex_div2');
      $('.parallex_div2').eq(2).css("transform",'translateY('+(-scrollValue/4 + 1400)+'px)');
    }
  });
  window.addEventListener('scroll',function(){
    scrollValue = window.scrollY;
    var pic = document.querySelector('.parallex_div3');
    if(pic != null){
      pic.style.transform = 'translateY('+(-scrollValue/4 + 2100)+'px)';
    }
  });
  window.addEventListener('scroll',function(){
    scrollValue = window.scrollY;
    var pic = document.querySelector('.parallex_div4');
    if(pic != null){
      pic.style.transform = 'translateY('+(-scrollValue/4 + 2700)+'px)';
    }
  });
  
  
  // MENU HOVER CODE
  
  $('.main-link-shop summary.header__menu-item, .main-link-wines summary.header__menu-item, .main-link-about summary.header__menu-item, .main-link-contact summary.header__menu-item').mouseenter(function(){
      $('details').removeAttr('open');
      $(this).trigger('click');
  });
  
  $('.main-link-contact summary.header__menu-item').mouseenter(function(){
      $('details').removeAttr('open');
      $(this).trigger('click');
  });
  
  $('.header__submenu').mouseleave(function(){
      $('details').removeAttr('open');
  });
  
  $('.main-link-home').mouseenter(function(){
      $('details').removeAttr('open');
  });
    });

