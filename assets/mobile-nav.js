document.addEventListener("DOMContentLoaded", function () {
  // Check if it's a mobile device
  if (window.innerWidth <= 767) {
    // Ensure we only append the nav if it doesn't already exist
    var existingNav = document.querySelector('.mobile-nav');
    if (!existingNav) {
      var nav = document.createElement('nav');
      nav.className = 'mobile-nav'; // Assign the class for styling

      // Add mobile navigation links dynamically
      if (window.mobileNavLinks && window.mobileNavLinks.length > 0) {
        window.mobileNavLinks.forEach(function(link) {
          var a = document.createElement('a');
          a.href = link.url;
          a.textContent = link.title;
          nav.appendChild(a);
        });

        // Prepend the new navigation to the body
        document.body.prepend(nav);
      }
    }
  }
});
