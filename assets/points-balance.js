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