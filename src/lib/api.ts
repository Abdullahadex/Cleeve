const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';

// For now, we'll use a simple approach without authentication
// In production, you should use proper API tokens

export interface Product {
  id: number;
  attributes: {
    name: string;
    description?: string;
    price: number;
    compareAtPrice?: number;
    sku?: string;
    inventory: number;
    isActive: boolean;
    featured: boolean;
    tags?: string[];
    weight?: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    images?: {
      data: Array<{
        id: number;
        attributes: {
          url: string;
          name: string;
          alternativeText?: string;
          width?: number;
          height?: number;
          formats?: {
            thumbnail?: {
              url: string;
              width: number;
              height: number;
            };
          };
        };
      }>;
    };
    category?: {
      data: {
        id: number;
        attributes: {
          name: string;
          slug: string;
        };
      };
    };
  };
}

export interface Category {
  id: number;
  attributes: {
    name: string;
    description?: string;
    slug: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    image?: {
      data: {
        id: number;
        attributes: {
          url: string;
          name: string;
        };
      };
    };
  };
}

// Fetch all products
export async function getProducts(): Promise<Product[]> {
  try {
    console.log('Fetching products from:', `${STRAPI_URL}/api/products?populate=*`);
    const response = await fetch(`${STRAPI_URL}/api/products?populate=*`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Products API response:', data);
    return data.data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Fetch featured products
export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    console.log('Fetching featured products from:', `${STRAPI_URL}/api/products?populate=*`);
    const response = await fetch(`${STRAPI_URL}/api/products?populate=*`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Featured products API response:', data);
    const products = data.data || [];
    
    // Filter featured products on the client side
    const featuredProducts = products.filter((product: Product) => 
      product.attributes.featured === true
    );
    
    console.log('All products:', products);
    console.log('Featured products:', featuredProducts);
    
    return featuredProducts;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return [];
  }
}

// Fetch products by category
export async function getProductsByCategory(categoryId: number): Promise<Product[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/products?filters[category][id][$eq]=${categoryId}&populate=*`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
}

// Fetch single product
export async function getProduct(id: number): Promise<Product | null> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/products/${id}?populate=*`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Fetch all categories
export async function getCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/categories?populate=*`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

// Search products
export async function searchProducts(query: string): Promise<Product[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/products?filters[$or][0][name][$containsi]=${query}&filters[$or][1][description][$containsi]=${query}&populate=*`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error searching products:', error);
    return [];
  }
}