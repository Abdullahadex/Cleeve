'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

export default function Home() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const updateCartCount = useCallback(() => {
    const items = getCartItems();
    setCartCount(items.length);
  }, []);

  const getCartItems = useCallback(() => {
    try {
      return JSON.parse(localStorage.getItem("cartItems") || "[]");
    } catch {
      return [];
    }
  }, []);

  const setCartItems = useCallback((items: CartItem[]) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, []);

  const addToCart = useCallback((item: CartItem) => {
    const items = getCartItems();
    items.push(item);
    setCartItems(items);
    updateCartCount();
  }, [getCartItems, setCartItems, updateCartCount]);

  const handleQuickView = useCallback((name: string, price: number) => {
    alert(`${name}\nPrice: $${price.toFixed(2)}`);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const toggleMobileNav = useCallback(() => {
    setIsMobileNavOpen(prev => !prev);
  }, []);

  useEffect(() => {
    // Initialize cart count on page load
    updateCartCount();
    
    let timeoutHandle: NodeJS.Timeout;
    const showSlides = () => {
      const slides = document.getElementsByClassName("slides") as HTMLCollectionOf<HTMLElement>;
      const dots = document.getElementsByClassName("dot") as HTMLCollectionOf<HTMLElement>;

      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
        dots[i].classList.remove("active-dot");
      }

      const currentIndex = slideIndex;
      if (slides[currentIndex]) {
        slides[currentIndex].style.display = "block";
        if (dots[currentIndex]) {
          dots[currentIndex].classList.add("active-dot");
        }
      }

      timeoutHandle = setTimeout(() => {
        setSlideIndex(prev => (prev + 1) % slides.length);
      }, 4000);
    };

    showSlides();

    return () => {
      clearTimeout(timeoutHandle);
    };
  }, [slideIndex, updateCartCount]);

  useEffect(() => {
    // Add click handlers for dots
    const dots = document.getElementsByClassName("dot");
    for (let i = 0; i < dots.length; i++) {
      const dot = dots[i];
      const clickHandler = () => {
        setSlideIndex(i);
      };
      dot.addEventListener("click", clickHandler);
      
      return () => {
        dot.removeEventListener("click", clickHandler);
      };
    }
  }, []);

  return (
    <>
      <header className="header">
        {/* Desktop Navigation */}
        <nav className="nav desktop-only">
          <Link href="/" className="logo" aria-label="Cleeve home">
            <Image src="/logo.jpeg" alt="Cleeve logo" className="logo-image" width={80} height={80} />
          </Link>
          <div className="nav-links">
            <a href="#kids">Kids</a>
            <a href="#teens">Teens</a>
            <a href="#adults">Young Adults</a>
          </div>
          <input type="text" placeholder="Search..." className="search-bar" />
          <div className="cart-icon">
            <Link href="/cart">🛒 <span id="item-count">{cartCount}</span></Link>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <nav className="mobile-nav mobile-only">
          <Link href="/" className="mobile-logo" aria-label="Cleeve home">
            <Image src="/logo.jpeg" alt="Cleeve logo" className="mobile-logo-image" width={50} height={50} />
          </Link>
          
          <div className="mobile-center">
            {/* Hamburger Menu for Navigation Links */}
            <button 
              className="mobile-hamburger" 
              onClick={toggleMobileNav}
              aria-label="Toggle navigation menu"
            >
              <span className={`hamburger-bar ${isMobileNavOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-bar ${isMobileNavOpen ? 'open' : ''}`}></span>
              <span className={`hamburger-bar ${isMobileNavOpen ? 'open' : ''}`}></span>
            </button>
          </div>
          
          <div className="mobile-actions">
            <button className="mobile-search-toggle" onClick={toggleMobileMenu}>
              🔍
            </button>
            <Link href="/cart" className="mobile-cart">
              🛒 <span className="mobile-cart-count">{cartCount}</span>
            </Link>
          </div>
        </nav>

        {/* Mobile Navigation Dropdown */}
        <div className={`mobile-nav-dropdown ${isMobileNavOpen ? 'open' : ''}`}>
          <div className="mobile-nav-menu">
            <a href="#kids" onClick={toggleMobileNav}>Kids</a>
            <a href="#teens" onClick={toggleMobileNav}>Teens</a>
            <a href="#adults" onClick={toggleMobileNav}>Young Adults</a>
          </div>
        </div>

        {/* Mobile Search Bar (toggleable) */}
        <div className={`mobile-search-container ${isMobileMenuOpen ? 'open' : ''}`}>
          <input type="text" placeholder="Search..." className="mobile-search-input" />
        </div>

        <div className="slideshow-container">
          <div className="slides fade">
            <Image
              src="https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Fashion Slide 1"
              fill
              style={{ objectFit: 'cover' }}
            />
            <div className="slide-text">Discover Your Style</div>
          </div>
          <div className="slides fade">
        <Image
              src="https://images.pexels.com/photos/5709665/pexels-photo-5709665.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Fashion Slide 2"
              fill
              style={{ objectFit: 'cover' }}
            />
            <div className="slide-text">Express Yourself</div>
          </div>
          <div className="slides fade">
            <Image
              src="https://images.pexels.com/photos/5709664/pexels-photo-5709664.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Fashion Slide 3"
              fill
              style={{ objectFit: 'cover' }}
            />
            <div className="slide-text">Be Unique</div>
          </div>
          <div className="slideshow-dots">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
      </header>

      <main className="main-content">
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">New Drops</h1>
            <p className="hero-sub">Clean silhouettes. Everyday essentials. Made for now.</p>
            <a href="#teens" className="btn-primary">Shop Now</a>
          </div>
        </section>
        
        <div className="filters">
          <button className="filter-button">Size</button>
          <button className="filter-button">Color</button>
          <button className="filter-button">Price Range</button>
          <button className="filter-button">Sort By</button>
        </div>

        <section id="featured">
          <h2 className="category-title">Featured Essentials</h2>
          <div className="product-grid">
            <div className="product-card">
              <Image
                src="https://images.pexels.com/photos/5559986/pexels-photo-5559986.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Summer Dress"
                className="product-image"
                width={300}
                height={300}
              />
              <div className="product-info">
                <h3 className="product-name">Floral Summer Dress</h3>
                <p className="product-price">$29.99</p>
                <button 
                  className="add-to-cart"
                  onClick={() => addToCart({ name: "Floral Summer Dress", price: 29.99, quantity: 1 })}
                >
                  Add to Cart
                </button>
                <button 
                  className="quick-view"
                  onClick={() => handleQuickView("Floral Summer Dress", 29.99)}
                >
                  Quick View
                </button>
              </div>
            </div>

            <div className="product-card">
              <Image
                src="https://images.pexels.com/photos/5868738/pexels-photo-5868738.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Casual Set"
                className="product-image"
                width={300}
                height={300}
              />
              <div className="product-info">
                <h3 className="product-name">Denim Overall Set</h3>
                <p className="product-price">$34.99</p>
                <button 
                  className="add-to-cart"
                  onClick={() => addToCart({ name: "Denim Overall Set", price: 34.99, quantity: 1 })}
                >
                  Add to Cart
                </button>
                <button 
                  className="quick-view"
                  onClick={() => handleQuickView("Denim Overall Set", 34.99)}
                >
                  Quick View
                </button>
              </div>
            </div>

            <div className="product-card">
              <Image
                src="https://images.pexels.com/photos/5559991/pexels-photo-5559991.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Party Dress"
                className="product-image"
                width={300}
                height={300}
              />
              <div className="product-info">
                <h3 className="product-name">Princess Party Dress</h3>
                <p className="product-price">$39.99</p>
                <button 
                  className="add-to-cart"
                  onClick={() => addToCart({ name: "Princess Party Dress", price: 39.99, quantity: 1 })}
                >
                  Add to Cart
                </button>
                <button 
                  className="quick-view"
                  onClick={() => handleQuickView("Princess Party Dress", 39.99)}
                >
                  Quick View
                </button>
              </div>
            </div>

            <div className="product-card">
              <Image
                src="https://images.pexels.com/photos/5559998/pexels-photo-5559998.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="School Set"
                className="product-image"
                width={300}
                height={300}
              />
              <div className="product-info">
                <h3 className="product-name">Casual School Set</h3>
                <p className="product-price">$45.99</p>
                <button 
                  className="add-to-cart"
                  onClick={() => addToCart({ name: "Casual School Set", price: 45.99, quantity: 1 })}
                >
                  Add to Cart
                </button>
                <button 
                  className="quick-view"
                  onClick={() => handleQuickView("Casual School Set", 45.99)}
                >
                  Quick View
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="teens">
          <h2 className="category-title">Teen Collection</h2>
          <div className="product-grid">
            <div className="product-card">
              <Image
                src="https://images.pexels.com/photos/2705752/pexels-photo-2705752.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Street Style"
                className="product-image"
                width={300}
                height={300}
              />
              <div className="product-info">
                <h3 className="product-name">Urban Street Style</h3>
                <p className="product-price">$49.99</p>
                <button 
                  className="add-to-cart"
                  onClick={() => addToCart({ name: "Urban Street Style", price: 49.99, quantity: 1 })}
                >
                  Add to Cart
                </button>
                <button 
                  className="quick-view"
                  onClick={() => handleQuickView("Urban Street Style", 49.99)}
                >
                  Quick View
                </button>
              </div>
            </div>

            <div className="product-card">
              <Image
                src="https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Summer Set"
                className="product-image"
                width={300}
                height={300}
              />
              <div className="product-info">
                <h3 className="product-name">Summer Vibes Set</h3>
                <p className="product-price">$44.99</p>
                <button 
                  className="add-to-cart"
                  onClick={() => addToCart({ name: "Summer Vibes Set", price: 44.99, quantity: 1 })}
                >
                  Add to Cart
                </button>
                <button 
                  className="quick-view"
                  onClick={() => handleQuickView("Summer Vibes Set", 44.99)}
                >
                  Quick View
                </button>
              </div>
            </div>

            <div className="product-card">
              <Image
                src="https://images.pexels.com/photos/2850487/pexels-photo-2850487.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Sport Set"
                className="product-image"
                width={300}
                height={300}
              />
              <div className="product-info">
                <h3 className="product-name">Active Sports Set</h3>
                <p className="product-price">$54.99</p>
                <button 
                  className="add-to-cart"
                  onClick={() => addToCart({ name: "Active Sports Set", price: 54.99, quantity: 1 })}
                >
                  Add to Cart
                </button>
                <button 
                  className="quick-view"
                  onClick={() => handleQuickView("Active Sports Set", 54.99)}
                >
                  Quick View
                </button>
              </div>
            </div>

            <div className="product-card">
              <Image
                src="https://images.pexels.com/photos/2755611/pexels-photo-2755611.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Party Wear"
                className="product-image"
                width={300}
                height={300}
              />
              <div className="product-info">
                <h3 className="product-name">Evening Collection</h3>
                <p className="product-price">$59.99</p>
                <button 
                  className="add-to-cart"
                  onClick={() => addToCart({ name: "Evening Collection", price: 59.99, quantity: 1 })}
                >
                  Add to Cart
                </button>
                <button 
                  className="quick-view"
                  onClick={() => handleQuickView("Evening Collection", 59.99)}
                >
                  Quick View
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="adults">
          <h2 className="category-title">Young Adults Collection</h2>
          <div className="product-grid">
            <div className="product-card">
              <Image
                src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Professional"
                className="product-image"
                width={300}
                height={300}
              />
              <div className="product-info">
                <h3 className="product-name">Classic Blazer Set</h3>
                <p className="product-price">$79.99</p>
                <button 
                  className="add-to-cart"
                  onClick={() => addToCart({ name: "Classic Blazer Set", price: 79.99, quantity: 1 })}
                >
                  Add to Cart
                </button>
                <button 
                  className="quick-view"
                  onClick={() => handleQuickView("Classic Blazer Set", 79.99)}
                >
                  Quick View
                </button>
              </div>
            </div>

            <div className="product-card">
          <Image
                src="https://images.pexels.com/photos/2584269/pexels-photo-2584269.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Casual"
                className="product-image"
                width={300}
                height={300}
              />
              <div className="product-info">
                <h3 className="product-name">Weekend Casual</h3>
                <p className="product-price">$64.99</p>
                <button 
                  className="add-to-cart"
                  onClick={() => addToCart({ name: "Weekend Casual", price: 64.99, quantity: 1 })}
                >
                  Add to Cart
                </button>
                <button 
                  className="quick-view"
                  onClick={() => handleQuickView("Weekend Casual", 64.99)}
                >
                  Quick View
                </button>
              </div>
            </div>

            <div className="product-card">
          <Image
                src="https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Evening"
                className="product-image"
                width={300}
                height={300}
              />
              <div className="product-info">
                <h3 className="product-name">Evening Elegance</h3>
                <p className="product-price">$89.99</p>
                <button 
                  className="add-to-cart"
                  onClick={() => addToCart({ name: "Evening Elegance", price: 89.99, quantity: 1 })}
                >
                  Add to Cart
                </button>
                <button 
                  className="quick-view"
                  onClick={() => handleQuickView("Evening Elegance", 89.99)}
                >
                  Quick View
                </button>
              </div>
            </div>

            <div className="product-card">
          <Image
                src="https://images.pexels.com/photos/2681751/pexels-photo-2681751.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Business"
                className="product-image"
                width={300}
                height={300}
              />
              <div className="product-info">
                <h3 className="product-name">Business Casual</h3>
                <p className="product-price">$74.99</p>
                <button 
                  className="add-to-cart"
                  onClick={() => addToCart({ name: "Business Casual", price: 74.99, quantity: 1 })}
                >
                  Add to Cart
                </button>
                <button 
                  className="quick-view"
                  onClick={() => handleQuickView("Business Casual", 74.99)}
                >
                  Quick View
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-doodles">
          <i className="fas fa-star doodle"></i>
          <i className="fas fa-heart doodle"></i>
          <i className="fas fa-flower doodle"></i>
          <i className="fas fa-circle doodle"></i>
        </div>
        <p>© 2025 Cleeve. All rights reserved.</p>
        <div className="footer-doodles">
          <i className="fas fa-wave-square doodle"></i>
          <i className="fas fa-circle doodle"></i>
          <i className="fas fa-leaf doodle"></i>
          <i className="fas fa-sparkles doodle"></i>
        </div>
      </footer>
    </>
  );
}
