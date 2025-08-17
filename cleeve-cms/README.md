# Cleeve CMS - Strapi Backend

A Strapi CMS backend for managing products, categories, and content for the Cleeve store.

## Features

- **Product Management**: Complete product catalog with variants, inventory tracking, and media management
- **Category System**: Hierarchical category organization with parent-child relationships
- **Media Management**: Image uploads and management for products and categories
- **API Endpoints**: RESTful API with custom endpoints for advanced queries
- **Content Types**: Products, Categories, and reusable components

## Content Types

### Product
- **Name**: Product name (required, unique)
- **Description**: Rich text description
- **Price**: Decimal price (required)
- **Compare At Price**: Original price for discounts
- **Images**: Multiple image uploads
- **Category**: Relationship to category
- **SKU**: Stock keeping unit (unique)
- **Inventory**: Stock quantity
- **Is Active**: Product visibility toggle
- **Featured**: Featured product flag
- **Tags**: JSON array of tags
- **Weight**: Product weight
- **Dimensions**: Component with length, width, height
- **Variants**: Repeatable component for size, color, etc.

### Category
- **Name**: Category name (required, unique)
- **Description**: Category description
- **Slug**: URL-friendly identifier
- **Image**: Category image
- **Products**: Relationship to products
- **Parent**: Parent category (for hierarchy)
- **Children**: Child categories
- **Is Active**: Category visibility toggle

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `GET /api/products/featured` - Get featured products
- `GET /api/products/category/:categoryId` - Get products by category
- `GET /api/products/search?query=searchterm` - Search products

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category
- `PUT /api/categories/:id` - Update category
- `DELETE /api/categories/:id` - Delete category
- `GET /api/categories/with-count` - Get categories with product count
- `GET /api/categories/tree` - Get category hierarchy

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run develop
```

3. Open your browser and navigate to `http://localhost:1337/admin`

4. Create your first admin user account

### Environment Variables

Create a `.env` file in the root directory:

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=your-app-keys
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
JWT_SECRET=your-jwt-secret
```

## Usage

### Adding Products

1. Go to Content Manager > Product
2. Click "Create new entry"
3. Fill in the required fields:
   - Name
   - Price
   - Description
4. Upload product images
5. Select a category
6. Add variants if needed
7. Set inventory quantity
8. Publish the product

### Managing Categories

1. Go to Content Manager > Category
2. Create parent categories first
3. Create child categories and link them to parents
4. Add category images
5. Publish categories

### API Integration

The CMS provides RESTful APIs that can be consumed by your frontend:

```javascript
// Example: Fetch featured products
const response = await fetch('http://localhost:1337/api/products/featured');
const products = await response.json();

// Example: Search products
const searchResponse = await fetch('http://localhost:1337/api/products/search?query=shirt');
const searchResults = await searchResponse.json();
```

## Customization

### Adding New Fields

To add new fields to products or categories:

1. Go to Content Manager
2. Select the content type
3. Click "Edit" on the schema
4. Add new fields using the UI
5. Save and restart the server

### Custom API Endpoints

Custom endpoints are defined in the controller files:
- `src/api/product/controllers/product.ts`
- `src/api/category/controllers/category.ts`

### Styling the Admin Panel

Customize the admin panel by editing:
- `src/admin/app.tsx` - Main admin app
- `src/admin/vite.config.ts` - Build configuration

## Deployment

### Production Build

```bash
npm run build
npm run start
```

### Environment Configuration

For production, update the database configuration in `config/database.ts` and set appropriate environment variables.

## Support

For issues and questions:
1. Check the Strapi documentation
2. Review the API documentation at `http://localhost:1337/documentation`
3. Check the logs in the console

## License

This project is part of the Cleeve store application.
