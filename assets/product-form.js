customElements.get("product-form") ||
  customElements.define(
    "product-form",
    class t extends HTMLElement {
      constructor() {
        super();
        this.form = this.querySelector("form");
        this.form.querySelector("[name=id]").disabled = !1;
        this.form.addEventListener("submit", this.onSubmitHandler.bind(this));
        this.cartNotification = document.querySelector("cart-notification");
      }

      onSubmitHandler(t) {
        t.preventDefault();
        let e = this.querySelector('[type="submit"]');
        if (e.classList.contains("loading")) return;
        this.handleErrorMessage();
        this.cartNotification.setActiveElement(document.activeElement);
        e.setAttribute("aria-disabled", !0);
        e.classList.add("loading");
        this.querySelector(".loading-overlay__spinner").classList.remove("hidden");
        let r = fetchConfig("javascript");
        r.headers["X-Requested-With"] = "XMLHttpRequest";
        r.body = JSON.stringify({
          ...JSON.parse(serializeForm(this.form)),
          sections: this.cartNotification.getSectionsToRender().map((t) => t.id),
          sections_url: window.location.pathname,
        });
        fetch(`${routes.cart_add_url}`, r)
          .then((t) => t.json())
          .then((t) => {
            if (t.status) {
              this.handleErrorMessage(t.description);
              return;
            }
            $(e).find("span").text("Added");
            $("#mini-cart_popup").load(location.href + " #mini-cart_popup_load");
            $(".cart-mini").addClass("open");
            this.cartNotification.renderContents(t);
            setTimeout(updateCartPriceBubble, 300);
          })
          .catch((t) => {
            console.error(t);
          })
          .finally(() => {
            e.classList.remove("loading");
            e.removeAttribute("aria-disabled");
            this.querySelector(".loading-overlay__spinner").classList.add("hidden");
          });
      }

      handleErrorMessage(t = !1) {
        this.errorMessageWrapper =
          this.errorMessageWrapper ||
          this.querySelector(".product-form__error-message-wrapper");
        this.errorMessage =
          this.errorMessage ||
          this.errorMessageWrapper.querySelector(".product-form__error-message");
        this.errorMessageWrapper.toggleAttribute("hidden", !t);
        t && (this.errorMessage.textContent = t);
      }
    }
  );

// ✅ Prevent cart icon from ever navigating to /cart after re-render
$(document).on("click", ".mini-cart-btn", function (t) {
  t.preventDefault();
  $(".cart-mini").addClass("open");
});

function updateCartPriceBubble() {
  fetch("/cart.js")
    .then((res) => res.json())
    .then((cart) => {
      const formatted = Shopify.formatMoney(cart.total_price, theme.moneyFormat);
      if ($(".cart-price-bubble").length === 0) {
        $("#cart-icon-bubble").append('<div class="cart-price-bubble"><span></span></div>');
      }
      $(".cart-price-bubble span").text(formatted);
    })
    .catch((err) => console.error("Cart fetch error:", err));
}

updateCartPriceBubble();

$(document).on("click", ".remove_item", function (t) {
  t.preventDefault();
  var e = $(this).find("a").attr("href");
  $.get(e, function (t, e) {
    if (e === "success") {
      $("#mini-cart_popup").load(location.href + " #mini-cart_popup_load", function () {
        updateCartPriceBubble();
      });
    }
  });
});

var timeoutHandle = null;

function updateQty(qty, lineId) {
  if (timeoutHandle) {
    clearTimeout(timeoutHandle);
    timeoutHandle = null;
  }
  timeoutHandle = setTimeout(function () {
    $.get(
      "https://alvisdrift.co.za/cart/change?id=" + lineId + "&quantity=" + qty,
      function (t, status) {
        if (status === "success") {
          $("#mini-cart_popup").load(location.href + " #mini-cart_popup_load", function () {
            updateCartPriceBubble();
          });
        }
      }
    );
  }, 500);
}

$(document).on("click", ".change_item_qty", function (t) {
  t.preventDefault();
  var e = $(this).data("index");
  var r = $(this).data("pid");
  updateQty($("#MiniQuantity-" + e).val(), r);
});