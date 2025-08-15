'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const getCartItems = useCallback(() => {
    try {
      return JSON.parse(localStorage.getItem("cartItems") || "[]");
    } catch {
      return [];
    }
  }, []);

  const updateCartItems = useCallback((items: CartItem[]) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, []);

  const removeFromCart = useCallback((index: number) => {
    const items = getCartItems();
    items.splice(index, 1);
    updateCartItems(items);
    displayCartItems();
  }, [getCartItems, updateCartItems]);

  const displayCartItems = useCallback(() => {
    const items = getCartItems();
    setCartItems(items);
    
    let total = 0;
    items.forEach((item: CartItem) => {
      total += (item.price || 0) * (item.quantity || 1);
    });
    setTotalPrice(total);
  }, [getCartItems]);

  useEffect(() => {
    displayCartItems();
  }, [displayCartItems]);

  return (
    <>
      <header className="cart-header">
        <nav className="cart-nav">
          <Link href="/" className="brand" aria-label="Cleeve home">
            <Image src="/logo.jpeg" alt="Cleeve logo" className="logo-image" width={80} height={80} />
          </Link>
          <Link href="/" className="home-button">Home</Link>
        </nav>
      </header>
      
      <main className="cart-container">
        <h1 className="page-title">Your Cart</h1>
        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <div>
                    <h3>{item.name || "Item"}</h3>
                    <p>${(item.price || 0).toFixed(2)}</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(index)}
                    className="remove-item"
                  >
                    Remove
                  </button>
                </div>
              ))
            )}
          </div>
          <aside className="cart-summary">
            <h2>Summary</h2>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
            <button id="checkout-button">Proceed to Checkout</button>
          </aside>
        </div>
      </main>
      
      <footer>
        <div className="footer-icons">
          <span className="icon">🛒</span>
        </div>
      </footer>
    </>
  );
}
