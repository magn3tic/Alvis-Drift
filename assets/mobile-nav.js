document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth <= 767) {
    var mobileNav = document.querySelector(".mobile-nav");

    if (!mobileNav) {
      var nav = document.createElement("nav");
      nav.className = "mobile-nav";

      if (window.mobileNavLinks) {
        window.mobileNavLinks.forEach(function (link) {
          var a = document.createElement("a");
          a.href = link.url;
          a.textContent = link.title;
          nav.appendChild(a);
        });

        document.body.prepend(nav); // Append to the body
      }
    }
  }
});
