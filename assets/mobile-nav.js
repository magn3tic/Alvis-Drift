document.addEventListener("DOMContentLoaded", function () {
  if (window.innerWidth <= 767) {
    // Ensure we only append the nav if it doesn't already exist
    var existingNav = document.querySelector('.mobile-nav');
    if (!existingNav) {
      var nav = document.createElement('nav');
      nav.className = 'mobile-nav'; // Give the created nav the correct class

      // Log to confirm nav is created
      console.log('Creating mobile nav:', nav);

      // Add the mobile navigation items (links)
      if (window.mobileNavLinks && window.mobileNavLinks.length > 0) {
        window.mobileNavLinks.forEach(function(link) {
          var a = document.createElement('a');
          a.href = link.url;
          a.textContent = link.title;
          nav.appendChild(a);
        });

        // Log to confirm links are added
        console.log('Nav links added:', nav);

        // Append the new navigation to the body or a specific location
        document.body.prepend(nav);
      }
    }
  }
});
