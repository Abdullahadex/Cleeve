'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { getProducts, getFeaturedProducts, Product, getProductImageUrl } from "@/lib/api";

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

interface QuickViewProduct {
  name: string;
  price: number;
  image: string;
  description: string;
}

export default function Home() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<QuickViewProduct | null>(null);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const getCartItems = useCallback(() => {
    try {
      return JSON.parse(localStorage.getItem("cartItems") || "[]");
    } catch {
      return [];
    }
  }, []);

  const updateCartCount = useCallback(() => {
    const items = getCartItems();
    setCartCount(items.length);
  }, [getCartItems]);

  const setCartItems = useCallback((items: CartItem[]) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
  }, []);

  const addToCart = useCallback((item: CartItem) => {
    const items = getCartItems();
    items.push(item);
    setCartItems(items);
    updateCartCount();
  }, [getCartItems, setCartItems, updateCartCount]);

  const handleQuickView = useCallback((name: string, price: number, image: string) => {
    setQuickViewProduct({
      name,
      price,
      image,
      description: "Clean silhouettes. Everyday essentials. Made for now. Experience comfort and style with our signature Cleeve Essential collection."
    });
  }, []);

  const closeQuickView = useCallback(() => {
    setQuickViewProduct(null);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const toggleMobileNav = useCallback(() => {
    setIsMobileNavOpen(prev => !prev);
  }, []);



  // Fetch products only once on component mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        console.log('🚀 Starting to fetch products...');
        setLoading(true);
        
        const featured = await getFeaturedProducts();
        console.log('🎯 Featured products received:', featured);
        
        setFeaturedProducts(featured);
        console.log('✅ Featured products state updated');
      } catch (error) {
        console.error('❌ Error fetching products:', error);
      } finally {
        setLoading(false);
        console.log('🏁 Loading finished');
      }
    };

    loadProducts();
  }, []); // Empty dependency array - only run once

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
            <Image src="/logo.jpeg" alt="Cleeve logo" className="mobile-logo-image" width={65} height={65} />
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
              src="/cleeve photos/cl(1).jpeg"
              alt="Cleeve Fashion Collection 1"
              fill
              style={{ objectFit: 'cover' }}
            />
            <div className="slide-text">Discover Your Style</div>
          </div>
          <div className="slides fade">
            <Image
              src="/cleeve photos/cl1 (2).jpeg"
              alt="Cleeve Fashion Collection 2"
              fill
              style={{ objectFit: 'cover' }}
            />
            <div className="slide-text">Express Yourself</div>
          </div>
          <div className="slides fade">
            <Image
              src="/cleeve photos/cl1 (3).jpeg"
              alt="Cleeve Fashion Collection 3"
              fill
              style={{ objectFit: 'cover' }}
            />
            <div className="slide-text">Be Unique</div>
          </div>
          <div className="slides fade">
            <Image
              src="/cleeve photos/cl1 (4).jpeg"
              alt="Cleeve Fashion Collection 4"
              fill
              style={{ objectFit: 'cover' }}
            />
            <div className="slide-text">Fashion for Everyone</div>
          </div>
          <div className="slideshow-dots">
            <span className="dot"></span>
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
          <div style={{ padding: '1rem', background: '#f0f0f0', margin: '1rem 0', fontSize: '14px' }}>
            <p><strong>Debug Info:</strong></p>
            <p>Loading: {loading ? 'Yes' : 'No'}</p>
            <p>Featured Products Count: {featuredProducts.length}</p>
            <p>API URL: {process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}</p>
            <p>First Product: {featuredProducts[0] ? featuredProducts[0].attributes.name : 'No products'}</p>
          </div>
          {loading ? (
            <div className="loading">Loading products...</div>
          ) : featuredProducts.length > 0 ? (
            <div className="product-grid">
              {featuredProducts.map((product) => {
  // Use the helper function to get image URL
  const imageUrl = getProductImageUrl(product);
  
  return (
    <div key={product.id} className="product-card">
      <Image
        src={imageUrl}
        alt={product.attributes.name}
        className="product-image"
        width={300}
        height={300}
        onError={(e) => {
          console.error('Image failed to load:', imageUrl);
          // Fallback to default image on error
          const target = e.target as HTMLImageElement;
          target.src = "/cleeve photos/cl(1).jpeg";
        }}
      />
                    <div className="product-info">
                      <h3 className="product-name">{product.attributes.name}</h3>
                      <p className="product-price">${product.attributes.price.toFixed(2)}</p>
                      <button 
                        className="add-to-cart"
                        onClick={() => addToCart({ 
                          name: product.attributes.name, 
                          price: product.attributes.price, 
                          quantity: 1 
                        })}
                      >
                        Add to Cart
                      </button>
                      <button 
                        className="quick-view"
                        onClick={() => handleQuickView(
                          product.attributes.name, 
                          product.attributes.price, 
                          imageUrl
                        )}
                      >
                        Quick View
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="no-products">No featured products available. Add some products in your CMS!</div>
          )}
        </section>

        <section id="teens">
          <h2 className="category-title">Teen Collection</h2>
          <div className="product-grid">
            <div className="product-card">
              <Image
                src="/cleeve photos/cl(1).jpeg"
                alt="Cleeve Street Style"
                className="product-image"
                width={300}
                height={300}
              />
              <div className="product-info">
                <h3 className="product-name">Cleeve Essential</h3>
                <p className="product-price">$49.99</p>
                <button 
                  className="add-to-cart"
                  onClick={() => addToCart({ name: "Urban Street Style", price: 49.99, quantity: 1 })}
                >
                  Add to Cart
                </button>
                <button 
                  className="quick-view"
                  onClick={() => handleQuickView("Cleeve Essential", 49.99, "/cleeve photos/cl(1).jpeg")}
                >
                  Quick View
                </button>
              </div>
            </div>

            <div className="product-card">
              <Image
                src="/cleeve photos/cl1 (2).jpeg"
                alt="Cleeve Summer Set"
                className="product-image"
                width={300}
                height={300}
              />
              <div className="product-info">
                <h3 className="product-name">Cleeve Essential</h3>
                <p className="product-price">$44.99</p>
                <button 
                  className="add-to-cart"
                  onClick={() => addToCart({ name: "Summer Vibes Set", price: 44.99, quantity: 1 })}
                >
                  Add to Cart
                </button>
                <button 
                  className="quick-view"
                  onClick={() => handleQuickView("Cleeve Essential", 44.99, "/cleeve photos/cl1 (2).jpeg")}
                >
                  Quick View
                </button>
              </div>
            </div>

            <div className="product-card">
              <Image
                src="/cleeve photos/cl1 (3).jpeg"
                alt="Cleeve Sport Set"
                className="product-image"
                width={300}
                height={300}
              />
              <div className="product-info">
                <h3 className="product-name">Cleeve Essential</h3>
                <p className="product-price">$54.99</p>
                <button 
                  className="add-to-cart"
                  onClick={() => addToCart({ name: "Active Sports Set", price: 54.99, quantity: 1 })}
                >
                  Add to Cart
                </button>
                <button 
                  className="quick-view"
                  onClick={() => handleQuickView("Cleeve Essential", 54.99, "/cleeve photos/cl1 (3).jpeg")}
                >
                  Quick View
                </button>
              </div>
            </div>

            <div className="product-card">
              <Image
                src="/cleeve photos/cl1 (4).jpeg"
                alt="Cleeve Party Wear"
                className="product-image"
                width={300}
                height={300}
              />
              <div className="product-info">
                <h3 className="product-name">Cleeve Essential</h3>
                <p className="product-price">$59.99</p>
                <button 
                  className="add-to-cart"
                  onClick={() => addToCart({ name: "Evening Collection", price: 59.99, quantity: 1 })}
                >
                  Add to Cart
                </button>
                <button 
                  className="quick-view"
                  onClick={() => handleQuickView("Cleeve Essential", 59.99, "/cleeve photos/cl1 (4).jpeg")}
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
                src="/cleeve photos/cl(1).jpeg"
                alt="Cleeve Professional"
                className="product-image"
                width={300}
                height={300}
              />
              <div className="product-info">
                <h3 className="product-name">Cleeve Essential</h3>
                <p className="product-price">$79.99</p>
                <button 
                  className="add-to-cart"
                  onClick={() => addToCart({ name: "Classic Blazer Set", price: 79.99, quantity: 1 })}
                >
                  Add to Cart
                </button>
                <button 
                  className="quick-view"
                  onClick={() => handleQuickView("Cleeve Essential", 79.99, "/cleeve photos/cl(1).jpeg")}
                >
                  Quick View
                </button>
              </div>
            </div>

            <div className="product-card">
              <Image
                src="/cleeve photos/cl1 (2).jpeg"
                alt="Cleeve Casual"
                className="product-image"
                width={300}
                height={300}
              />
              <div className="product-info">
                <h3 className="product-name">Cleeve Essential</h3>
                <p className="product-price">$64.99</p>
                <button 
                  className="add-to-cart"
                  onClick={() => addToCart({ name: "Weekend Casual", price: 64.99, quantity: 1 })}
                >
                  Add to Cart
                </button>
                <button 
                  className="quick-view"
                  onClick={() => handleQuickView("Cleeve Essential", 64.99, "/cleeve photos/cl1 (2).jpeg")}
                >
                  Quick View
                </button>
              </div>
            </div>

            <div className="product-card">
              <Image
                src="/cleeve photos/cl1 (3).jpeg"
                alt="Cleeve Evening"
                className="product-image"
                width={300}
                height={300}
              />
              <div className="product-info">
                <h3 className="product-name">Cleeve Essential</h3>
                <p className="product-price">$89.99</p>
                <button 
                  className="add-to-cart"
                  onClick={() => addToCart({ name: "Evening Elegance", price: 89.99, quantity: 1 })}
                >
                  Add to Cart
                </button>
                <button 
                  className="quick-view"
                  onClick={() => handleQuickView("Cleeve Essential", 89.99, "/cleeve photos/cl1 (3).jpeg")}
                >
                  Quick View
                </button>
              </div>
            </div>

            <div className="product-card">
              <Image
                src="/cleeve photos/cl1 (4).jpeg"
                alt="Cleeve Business"
                className="product-image"
                width={300}
                height={300}
              />
              <div className="product-info">
                <h3 className="product-name">Cleeve Essential</h3>
                <p className="product-price">$74.99</p>
                <button 
                  className="add-to-cart"
                  onClick={() => addToCart({ name: "Business Casual", price: 74.99, quantity: 1 })}
                >
                  Add to Cart
                </button>
                <button 
                  className="quick-view"
                  onClick={() => handleQuickView("Cleeve Essential", 74.99, "/cleeve photos/cl1 (4).jpeg")}
                >
                  Quick View
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="quick-view-overlay" onClick={closeQuickView}>
          <div className="quick-view-modal" onClick={(e) => e.stopPropagation()}>
            <button className="quick-view-close" onClick={closeQuickView}>
              ✕
            </button>
            <div className="quick-view-content">
              <div className="quick-view-image">
                <Image
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  width={400}
                  height={400}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="quick-view-info">
                <h2>{quickViewProduct.name}</h2>
                <p className="quick-view-price">${quickViewProduct.price.toFixed(2)}</p>
                <p className="quick-view-description">{quickViewProduct.description}</p>
                <div className="quick-view-actions">
                  <button 
                    className="quick-view-add-cart"
                    onClick={() => {
                      addToCart({ 
                        name: quickViewProduct.name, 
                        price: quickViewProduct.price, 
                        quantity: 1 
                      });
                      closeQuickView();
                    }}
                  >
                    Add to Cart
                  </button>
                  <button className="quick-view-continue" onClick={closeQuickView}>
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
