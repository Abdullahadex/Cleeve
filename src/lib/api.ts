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
    const response = await fetch(`${STRAPI_URL}/api/products?populate=*`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

// Fetch featured products
export async function getFeaturedProducts(): Promise<Product[]> {
  try {
    console.log('🔍 Fetching featured products from:', `${STRAPI_URL}/api/products?populate=*`);
    const response = await fetch(`${STRAPI_URL}/api/products?populate=*`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('📦 API Response:', data);
    const products = data.data || [];
    console.log('📦 Products array:', products);
    
    // Filter featured products on the client side
    const featuredProducts = products.filter((product: Product) => 
      product.attributes.featured === true
    );
    console.log('⭐ Featured products:', featuredProducts);
    
    // If no products from API, return static products
    if (featuredProducts.length === 0) {
      console.log('📦 Using static products as fallback');
      return getStaticProducts();
    }
    
    return featuredProducts;
  } catch (error) {
    console.error('❌ Error fetching featured products:', error);
    console.log('📦 Using static products as fallback');
    return getStaticProducts();
  }
}

// Static products as fallback
function getStaticProducts(): Product[] {
  return [
    {
      id: 1,
      attributes: {
        name: "Air Jordan 1",
        description: "Premium Air Jordan sneakers for style and comfort",
        price: 30.00,
        compareAtPrice: 45.00,
        sku: "AJ1-001",
        inventory: 50,
        isActive: true,
        featured: true,
        tags: ["sneakers", "jordan", "premium"],
        weight: 0.5,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
        images: {
          data: [
            {
              id: 1,
              attributes: {
                url: "/cleeve photos/cl(1).jpeg",
                name: "cl(1).jpeg",
                alternativeText: "Air Jordan 1",
                width: 300,
                height: 300
              }
            }
          ]
        }
      }
    },
    {
      id: 2,
      attributes: {
        name: "Cleeve Essential T-Shirt",
        description: "Premium cotton essential t-shirt with clean silhouettes",
        price: 44.99,
        compareAtPrice: 59.99,
        sku: "CLEEVE-TS-001",
        inventory: 30,
        isActive: true,
        featured: true,
        tags: ["essential", "cotton", "comfortable"],
        weight: 0.2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
        images: {
          data: [
            {
              id: 2,
              attributes: {
                url: "/cleeve photos/cl1 (2).jpeg",
                name: "cl1 (2).jpeg",
                alternativeText: "Cleeve Essential T-Shirt",
                width: 300,
                height: 300
              }
            }
          ]
        }
      }
    },
    {
      id: 3,
      attributes: {
        name: "Cleeve Sport Set",
        description: "Active sports set designed for performance and style",
        price: 54.99,
        compareAtPrice: 69.99,
        sku: "CLEEVE-SS-002",
        inventory: 25,
        isActive: true,
        featured: true,
        tags: ["sport", "active", "performance"],
        weight: 0.3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
        images: {
          data: [
            {
              id: 3,
              attributes: {
                url: "/cleeve photos/cl1 (3).jpeg",
                name: "cl1 (3).jpeg",
                alternativeText: "Cleeve Sport Set",
                width: 300,
                height: 300
              }
            }
          ]
        }
      }
    }
  ];
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

// Helper function to get image URL from Strapi
export function getStrapiImageUrl(image: { url?: string } | null): string {
  if (!image) return '';
  
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  
  if (image.url) {
    if (image.url.startsWith('http')) {
      return image.url;
    }
    return `${baseUrl}${image.url}`;
  }
  
  return '';
}

// Helper function to get the first image URL from a product
export function getProductImageUrl(product: Product): string {
  if (!product?.attributes?.images?.data || product.attributes.images.data.length === 0) {
    return '/cleeve photos/cl(1).jpeg'; // fallback image
  }
  
  const firstImage = product.attributes.images.data[0];
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
  
  if (firstImage.attributes?.url) {
    if (firstImage.attributes.url.startsWith('http')) {
      return firstImage.attributes.url;
    }
    return `${baseUrl}${firstImage.attributes.url}`;
  }
  
  return '/cleeve photos/cl(1).jpeg'; // fallback image
}