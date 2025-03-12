document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth <= 767) {
    var nav = document.createElement("nav");
    nav.className = "mobile-nav";

    // Fetch menu links from a global Shopify variable (you need to define it in Liquid)
    if (window.mobileNavLinks) {
      window.mobileNavLinks.forEach(function (link) {
        var a = document.createElement("a");
        a.href = link.url;
        a.textContent = link.title;
        nav.appendChild(a);
      });

      document.body.prepend(nav); // Insert at the top of the body
    }
  }
});
