/**
 * product controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::product.product', ({ strapi }) => ({
  // Custom method to get featured products
  async findFeatured(ctx) {
    const { data, meta } = await strapi.entityService.findMany('api::product.product', {
      filters: {
        featured: true,
        isActive: true,
        publishedAt: { $notNull: true }
      },
      populate: ['images', 'category'],
      sort: { createdAt: 'desc' }
    });

    return { data, meta };
  },

  // Custom method to get products by category
  async findByCategory(ctx) {
    const { categoryId } = ctx.params;
    
    const { data, meta } = await strapi.entityService.findMany('api::product.product', {
      filters: {
        category: categoryId,
        isActive: true,
        publishedAt: { $notNull: true }
      },
      populate: ['images', 'category'],
      sort: { createdAt: 'desc' }
    });

    return { data, meta };
  },

  // Custom method to search products
  async search(ctx) {
    const { query } = ctx.query;
    
    const { data, meta } = await strapi.entityService.findMany('api::product.product', {
      filters: {
        $or: [
          { name: { $containsi: query } },
          { description: { $containsi: query } }
        ],
        isActive: true,
        publishedAt: { $notNull: true }
      },
      populate: ['images', 'category'],
      sort: { createdAt: 'desc' }
    });

    return { data, meta };
  }
}));