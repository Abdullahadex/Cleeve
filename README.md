# Cleeve - Fashion for Everyone

A modern, responsive e-commerce website built with HTML, CSS, JavaScript, and Node.js/Express.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Product Catalog**: Browse through Kids, Teens, and Young Adults collections
- **Shopping Cart**: Add items to cart with real-time count updates
- **Modern UI**: Clean, minimalist design with smooth animations
- **Node.js Backend**: Express server with compression and static file serving
- **Interactive Elements**: Slideshow, product cards, and dynamic cart functionality

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Styling**: Custom CSS with responsive grid layouts
- **Icons**: Font Awesome
- **Fonts**: Patrick Hand, Architects Daughter (Google Fonts)

## Project Structure

```
Cleeve-main/
├── index.html          # Home page with product catalog
├── cart.html           # Shopping cart page
├── cleeve.css          # Main stylesheet
├── cart.css            # Cart-specific styles
├── cleeve.js           # Main JavaScript functionality
├── cart.js             # Cart-specific JavaScript
├── server.js           # Express server
├── package.json        # Node.js dependencies
├── logo.jpeg           # Site logo
└── README.md           # This file
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd Cleeve-main
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with auto-reload
- `npm run build` - Build script (no-op for static assets)

## Features in Detail

### Home Page (`index.html`)

- Hero section with call-to-action
- Product grid organized by age categories
- Interactive slideshow
- Search functionality
- Shopping cart with live count

### Cart Page (`cart.html`)

- Display cart items with remove functionality
- Real-time total calculation
- Checkout button
- Responsive layout

### Navigation

- Sticky header with logo
- Category navigation
- Search bar
- Cart icon with item count

### Product Cards

- Product images with hover effects
- Add to cart functionality
- Quick view option
- Price display

## Customization

### Adding Products

Edit `index.html` to add new product cards in the appropriate section:

```html
<div class="product-card">
  <img src="product-image.jpg" alt="Product Name" class="product-image" />
  <div class="product-info">
    <h3 class="product-name">Product Name</h3>
    <p class="product-price">$XX.XX</p>
    <button class="add-to-cart">Add to Cart</button>
    <button class="quick-view">Quick View</button>
  </div>
</div>
```

### Styling

- Main styles: `cleeve.css`
- Cart-specific styles: `cart.css`
- Responsive breakpoints included
- Custom CSS variables for easy theming

### Logo

Replace `logo.jpeg` with your own logo file (recommended size: 80px height)

## Deployment

### Local Development

```bash
npm run dev
```

### Production

```bash
npm start
```

### Environment Variables (Optional)

For Instagram integration (currently disabled):

- `IG_TOKEN`: Instagram Graph API token
- `IG_USER_ID`: Instagram user ID

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please open an issue on GitHub.

---

**Cleeve** - Fashion for Everyone
