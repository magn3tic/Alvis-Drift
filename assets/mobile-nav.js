document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth <= 767) {
    var nav = document.createElement("nav");
    nav.className = "mobile-nav";

    // Define links (You need to set this variable in Liquid)
    if (window.mobileNavLinks) {
      window.mobileNavLinks.forEach(function (link) {
        var a = document.createElement("a");
        a.href = link.url;
        a.textContent = link.title;
        nav.appendChild(a);
      });

      // Append the navigation to the body or a specific container
      document.body.prepend(nav);
    }
  }
});
