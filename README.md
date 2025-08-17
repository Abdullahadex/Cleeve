# Cleeve - Modern E-commerce Website

A modern, responsive e-commerce website built with Next.js and Strapi CMS, featuring a beautiful design, shopping cart functionality, and comprehensive product management.

## Features

- 🛍️ **Product Catalog**: Browse and search products with dynamic data from CMS
- 🛒 **Shopping Cart**: Add, remove, and manage cart items with localStorage
- 📱 **Responsive Design**: Works perfectly on all devices
- ⚡ **Fast Performance**: Built with Next.js for optimal speed
- 🎨 **Modern UI**: Clean and intuitive user interface
- 🖼️ **Dynamic Images**: Product images served from Strapi CMS
- 🔍 **Product Search**: Search functionality across product names and descriptions
- 📂 **Category Management**: Hierarchical product categories
- ⭐ **Featured Products**: Highlight special products on the homepage

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Strapi CMS v5.22.0
- **Database**: SQLite (configurable for MySQL/PostgreSQL)
- **Image Handling**: Next.js Image optimization with Strapi integration
- **Deployment**: Vercel (Frontend), Railway/Render (Backend)

## Project Structure

```
├── src/
│   ├── app/                 # Next.js app router
│   │   ├── page.tsx        # Main homepage with product display
│   │   ├── cart/           # Shopping cart pages
│   │   └── globals.css     # Global styles
│   ├── lib/
│   │   └── api.ts          # Strapi API integration
│   └── components/         # React components
├── cleeve-cms/             # Strapi CMS backend
│   ├── src/
│   │   ├── api/            # Content types (Product, Category)
│   │   ├── admin/          # Custom admin interface
│   │   └── components/     # Strapi components
│   ├── config/             # Strapi configuration
│   └── database/           # Database migrations
├── public/                 # Static assets
│   └── cleeve photos/      # Product images
└── next.config.ts          # Next.js configuration
```

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Frontend Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Set environment variables (optional):
   ```bash
   NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
   ```
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

### Backend Setup (Strapi CMS)
1. Navigate to the CMS directory: `cd cleeve-cms`
2. Install dependencies: `npm install`
3. Start the development server: `npm run develop`
4. Access admin panel: [http://localhost:1337/admin](http://localhost:1337/admin)
5. Create an admin account and add products

## Content Management

### Adding Products
1. Go to Strapi admin panel: `http://localhost:1337/admin`
2. Navigate to Content Manager → Product
3. Click "Create new entry"
4. Fill in product details:
   - **Name**: Product name
   - **Price**: Product price (decimal)
   - **Description**: Rich text description
   - **Images**: Upload product images
   - **Category**: Select product category
   - **Featured**: Check to highlight on homepage
   - **Inventory**: Stock quantity
5. Save and publish

### Product Schema
- **Name**: String (required, unique)
- **Description**: Rich text
- **Price**: Decimal (required, min: 0)
- **Compare At Price**: Decimal (optional)
- **Images**: Multiple media files
- **Category**: Relation to category
- **SKU**: String (unique)
- **Inventory**: Integer (default: 0)
- **Featured**: Boolean (default: false)
- **Tags**: JSON array
- **Weight**: Decimal
- **Dimensions**: Component
- **Variants**: Repeatable component

## API Integration

### Product Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/products?populate=*` - Get products with relations
- `GET /api/products?filters[featured][$eq]=true` - Get featured products

### Category Endpoints
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `GET /api/categories?populate=*` - Get categories with relations

## Recent Updates

### Image Handling Improvements
- ✅ Fixed Strapi image URL construction
- ✅ Added proper CORS configuration for images
- ✅ Enhanced error handling with fallback images
- ✅ Added comprehensive debugging tools

### API Enhancements
- ✅ Updated to handle Strapi v5 data structure
- ✅ Added proper TypeScript interfaces
- ✅ Enhanced error handling and logging
- ✅ Added helper functions for image processing

### Frontend Updates
- ✅ Dynamic product rendering from CMS
- ✅ Real-time product data updates
- ✅ Enhanced debugging information
- ✅ Improved image loading with error handling

## Troubleshooting

### Images Not Displaying
1. Check if Strapi CMS is running on port 1337
2. Verify products have images uploaded
3. Check browser console for CORS errors
4. Use the debug section on the homepage
5. Verify image URLs in browser dev tools

### API Connection Issues
1. Ensure Strapi is running: `cd cleeve-cms && npm run develop`
2. Check API endpoints: `curl http://localhost:1337/api/products`
3. Verify CORS configuration in `cleeve-cms/config/middlewares.ts`
4. Check environment variables

### Common Issues
- **403 Forbidden**: Check if API routes are public
- **CORS Errors**: Verify CORS configuration
- **Image Loading**: Check Next.js image domains configuration
- **Empty Products**: Add products through Strapi admin panel

## Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Set environment variables:
   - `NEXT_PUBLIC_STRAPI_URL`: Your Strapi production URL
3. Deploy automatically on push to main branch

### Backend (Strapi)
1. Deploy to Railway, Render, or your preferred platform
2. Set production environment variables
3. Configure database (PostgreSQL recommended for production)
4. Update frontend environment variables

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

---

Built with ❤️ for modern e-commerce
