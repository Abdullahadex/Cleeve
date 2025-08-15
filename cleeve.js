document.addEventListener("DOMContentLoaded", function () {
  // Initialize cart count on page load
  updateCartCount();

  let slideIndex = 0;
  let timeoutHandle;
  showSlides();

  // Add click handlers for dots
  const dots = document.getElementsByClassName("dot");
  for (let i = 0; i < dots.length; i++) {
    dots[i].addEventListener("click", () => {
      clearTimeout(timeoutHandle);
      slideIndex = i;
      showSlides();
    });
  }

  function showSlides() {
    let slides = document.getElementsByClassName("slides");
    let dots = document.getElementsByClassName("dot");

    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
      dots[i].classList.remove("active-dot");
    }

    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].classList.add("active-dot");

    timeoutHandle = setTimeout(showSlides, 4000);
  }

  // Attach handlers to product cards
  const productCards = document.querySelectorAll(".product-card");
  productCards.forEach((card) => {
    const name =
      card.querySelector(".product-name")?.textContent?.trim() || "Item";
    const priceText = card.querySelector(".product-price")?.textContent || "$0";
    const price = parseFloat(priceText.replace(/[^0-9.]/g, "")) || 0;

    const addBtn = card.querySelector(".add-to-cart");
    if (addBtn) {
      addBtn.addEventListener("click", () => {
        addToCart({ name, price, quantity: 1 });
      });
    }

    const quickViewBtn = card.querySelector(".quick-view");
    if (quickViewBtn) {
      quickViewBtn.addEventListener("click", () => {
        alert(`${name}\nPrice: $${price.toFixed(2)}`);
      });
    }

    const wishlistBtn = card.querySelector(".wishlist");
    if (wishlistBtn) {
      wishlistBtn.addEventListener("click", () => {
        addToWishlist({ name, price });
      });
    }
  });

  // Instagram removed by request: no feed or embeds
});

// Simple cart utilities shared across pages
function getCartItems() {
  try {
    return JSON.parse(localStorage.getItem("cartItems")) || [];
  } catch (_) {
    return [];
  }
}

function setCartItems(items) {
  localStorage.setItem("cartItems", JSON.stringify(items));
}

function addToCart(item) {
  const items = getCartItems();
  items.push(item);
  setCartItems(items);
  updateCartCount();
}

function addToWishlist(item) {
  const list = JSON.parse(localStorage.getItem("wishlistItems")) || [];
  list.push(item);
  localStorage.setItem("wishlistItems", JSON.stringify(list));
  alert("Added to wishlist");
}

function updateCartCount() {
  const items = getCartItems();
  const countEl = document.getElementById("item-count");
  if (countEl) countEl.textContent = String(items.length);
}
