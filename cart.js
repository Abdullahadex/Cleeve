// Function to add item to cart
function addToCart(item) {
    console.log("Adding to cart:", item); // Log the item being added
    // Get existing cart items from local storage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push(item); // Add the item to the cart
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Save to local storage
    displayCartItems(); // Update the cart display
    updateCartCount(); // Update the cart count on the index page immediately
}

// Function to display cart items
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear previous items

    // Retrieve items from local storage
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let totalPrice = 0;

    // Check if cartItems is empty
    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty. There are no items in your cart.</p>'; // Display message if cart is empty
    } else {
        const cartIcon = document.createElement('div');
        cartIcon.className = 'cart-icon';
        cartIcon.innerHTML = `
            <h3>Cart Icon</h3>
            <p>Total Price: $${totalPrice.toFixed(2)}</p>
            <button onclick="viewCart()">View Cart</button>
        `;
        cartItemsContainer.appendChild(cartIcon);
        
        cartItems.forEach((item, index) => {
            totalPrice += item.price; // Calculate total price
        });
    }

    // Update total price display
    document.getElementById('total-price').innerText = `Total Price: $${totalPrice.toFixed(2)}`;
}

// Function to remove item from cart
function removeFromCart(index) {
    // Get existing cart items from local storage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    // Remove the item at the specified index
    cartItems.splice(index, 1);
    // Update local storage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    // Refresh the displayed cart items
    displayCartItems();
    updateCartCount(); // Update the cart count on the index page
}

// Function to update the cart count on the index page
function updateCartCount() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const itemCount = cartItems.length;
    const itemCountElement = document.getElementById('item-count');
    if (itemCountElement) {
        itemCountElement.innerText = itemCount; // Update the count displayed in the cart icon
    }
}

// Call displayCartItems on page load to show items
document.addEventListener('DOMContentLoaded', function() {
    displayCartItems();
    updateCartCount(); // Update the count on page load
});

// Example usage: Add items to cart

// Function to view cart items (new function)
function viewCart() {
    // Logic to display cart items in a modal or new page
    displayCartItems(); // For example, you can call displayCartItems to show items
}
