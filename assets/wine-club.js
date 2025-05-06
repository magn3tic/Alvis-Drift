/* This file is part of the Alvis Drift Shopify theme.
   //Logic to fetch and display customer points from BOLD Loyalty program.
   */
const shopDomain = 'alvis-drift.myshopify.com';

function getCustomerIdAndFetchPoints() {
  const customerId = window.BOLD ?. common ?. Shopify ?. customer ?. id;

  if (customerId) {
    const url = `/apps/loyalties-widget/v2/${shopDomain}/frontend/customer-tiers-list?shopifyCustomerId=${customerId}`;
    fetch(url).then(res => res.json()).then(data => {
      const points = data.customerFormatted ?. balance;
      document.getElementById("points-container").innerText = `${points}`;
    }).catch(err => {
      document.getElementById("points-container").innerText = "Error loading points.";
      console.error("❌ Error fetching points:", err);
    });
  } else {
    console.warn("🕒 Waiting for BOLD to load or customer to be authenticated...");
    setTimeout(getCustomerIdAndFetchPoints, 500);
  }
}

getCustomerIdAndFetchPoints();

/* end of BOLD Loyalty program logic */

/* Events section logic */
// This script fetches and displays events from a JSON object embedded in the HTML.
document.addEventListener('DOMContentLoaded', function () {
  const container = document.getElementById('awc-events-rendered');
  const rawData = document.getElementById('awc-events-data').dataset.events;

  let events = JSON.parse(rawData);

  events.sort((a, b) => new Date(a.date) - new Date(b.date));

  events.forEach(event => {
    const html = `
      <div class="awc-event">
        <div class="awc-event-image">
          <img src="${event.image}" alt="${event.title}" width="133" height="399">
        </div>
        <div class="awc-event-content-container">
          <div class="awc-content awc-content-title">
            <h5 style="color:white">${event.title}</h5>
          </div>
          ${event.date ? `<div class="awc-content awc-content-date"><p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</p></div>` : ''}
          ${event.description ? `<div class="awc-content awc-content-description"><p>${event.description}</p></div>` : ''}
          ${event.host ? `<div class="awc-content awc-content-host"><p><strong>Host:</strong> ${event.host}</p></div>` : ''}
          ${event.location ? `<div class="awc-content awc-content-location"><p><strong>Location:</strong> ${event.location}</p></div>` : ''}
          ${event.wines ? `<div class="awc-content awc-content-wines"><p><strong>Wines:</strong> ${event.wines}</p></div>` : ''}
          ${event.members.length ? `<div class="awc-content awc-content-members"><p><strong>Exclusive for:</strong> ${event.members.join(', ')}</p></div>` : ''}
          ${event.linkUrl ? `<div class="awc-content awc-content-CTA awc-promo--btn"><a class="btn" target="_blank" href="${event.linkUrl}">${event.linkText}</a></div>` : ''}
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', html);
  });
});

/* end of events section logic */

/* This script handles the countdown timer for the wine club membership. */

document.addEventListener("DOMContentLoaded", function() {
  const counter = document.querySelector(".awc-counter");
  if (counter) {
    let number = parseInt(counter.dataset.start);
    const span = counter.querySelector("#counter-number");

    const interval = setInterval(() => {
      span.classList.add("animate");
      const randomNumber = Math.floor(Math.random() * 10) + 1;

      // Wait before updating the number to sync with the animation
      setTimeout(() => {
        number= number - randomNumber;
        span.textContent = number;
        span.classList.remove("animate");

        if (number <= 0) {
          clearInterval(interval);
          span.textContent = "0";
          span.classList.remove("animate");
        }
      }, 150);
    }, 3000);
  }
});

/* end of countdown timer logic */