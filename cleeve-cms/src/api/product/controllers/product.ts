/**
 * product controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::product.product', ({ strapi }) => ({
  // Custom method to get featured products
  async findFeatured(ctx) {
    const products = await strapi.entityService.findMany('api::product.product', {
      filters: {
        featured: true,
        isActive: true,
        publishedAt: { $notNull: true }
      },
      populate: ['images', 'category'],
      sort: { createdAt: 'desc' }
    });

    return { data: products };
  },

  // Custom method to get products by category
  async findByCategory(ctx) {
    const { categoryId } = ctx.params;
    
    const products = await strapi.entityService.findMany('api::product.product', {
      filters: {
        category: categoryId,
        isActive: true,
        publishedAt: { $notNull: true }
      },
      populate: ['images', 'category'],
      sort: { createdAt: 'desc' }
    });

    return { data: products };
  },

  // Custom method to search products
  async search(ctx) {
    const { query } = ctx.query;
    
    const products = await strapi.entityService.findMany('api::product.product', {
      filters: {
        $or: [
          { name: { $containsi: query as string } },
          { description: { $containsi: query as string } }
        ],
        isActive: true,
        publishedAt: { $notNull: true }
      },
      populate: ['images', 'category'],
      sort: { createdAt: 'desc' }
    });

    return { data: products };
  }
}));