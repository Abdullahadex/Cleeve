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
  const cartItems = getCartItems();
  cartItems.push(item);
  setCartItems(cartItems);
  displayCartItems();
  updateCartCount();
}

// Function to display cart items
function displayCartItems() {
  const container = document.getElementById("cart-items");
  if (!container) {
    updateCartCount();
    return;
  }
  container.innerHTML = "";

  const items = getCartItems();
  let totalPrice = 0;

  if (items.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    items.forEach((item, index) => {
      totalPrice += (item.price || 0) * (item.quantity || 1);
      const row = document.createElement("div");
      row.className = "cart-item";
      row.innerHTML = `
                <div>
                    <h3>${item.name || "Item"}</h3>
                    <p>$${(item.price || 0).toFixed(2)}</p>
                </div>
                <button data-index="${index}" class="remove-item">Remove</button>
            `;
      container.appendChild(row);
    });
  }

  const totalEl = document.getElementById("total-price");
  if (totalEl) totalEl.innerText = `Total Price: $${totalPrice.toFixed(2)}`;

  // Hook remove buttons
  container.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idx = parseInt(e.currentTarget.getAttribute("data-index"), 10);
      removeFromCart(idx);
    });
  });
}

// Function to remove item from cart
function removeFromCart(index) {
  const items = getCartItems();
  items.splice(index, 1);
  setCartItems(items);
  displayCartItems();
  updateCartCount();
}

// Function to update the cart count on the index page
function updateCartCount() {
  const itemCount = getCartItems().length;
  const el = document.getElementById("item-count");
  if (el) el.innerText = itemCount;
}

// Call displayCartItems on page load to show items
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("cart-items");
  if (container) {
    displayCartItems();
  }
  updateCartCount();
});

// Example usage: Add items to cart

// Quick view could be a modal; keeping minimal here
